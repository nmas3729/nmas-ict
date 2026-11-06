import { quoteAcceptedMessage } from '../../../lib/quote-response.ts'

const maximumFileSize = 10 * 1024 * 1024
const maximumRequestSize = maximumFileSize + 128 * 1024
const allowedExtensions = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx'])
const oleSignature = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])
const serviceCategories = new Map([
  ['ict-hardware', 'ICT hardware'],
  ['software-licensing', 'Software licensing'],
  ['procurement-support', 'Procurement support'],
  ['other-requirements', 'Other requirements'],
])

export const runtime = 'nodejs'

function errorResponse(error: string, status: number) {
  return Response.json(
    { error },
    { status, headers: { 'Cache-Control': 'no-store' } },
  )
}

function textField(form: FormData, name: string) {
  const value = form.get(name)
  return typeof value === 'string' ? value.trim() : null
}

function normalizeOrigin(value: string) {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null
    return url.origin
  } catch {
    return null
  }
}

function configuredOrigins() {
  const siteUrl = process.env.SITE_URL?.trim()
  const siteOrigin = siteUrl ? normalizeOrigin(siteUrl) : null
  if (!siteOrigin) return null

  const origins = new Set([siteOrigin])
  const additionalOrigins = process.env.ALLOWED_ORIGINS?.trim()
  if (additionalOrigins) {
    const values = additionalOrigins.split(',').map((value) => value.trim())
    if (values.some((value) => !value)) return null

    for (const value of values) {
      const origin = normalizeOrigin(value)
      if (!origin) return null
      origins.add(origin)
    }
  }

  return origins
}

async function validateBoundedBody(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) return 0

  let totalSize = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    totalSize += value.byteLength
    if (totalSize > maximumRequestSize) {
      await reader.cancel()
      return null
    }
  }

  return totalSize
}

function hasZipEntry(file: Buffer, expectedName: string) {
  const earliestDirectoryEnd = Math.max(0, file.length - 22 - 0xffff)
  let endOfDirectory = -1

  for (let offset = file.length - 22; offset >= earliestDirectoryEnd; offset -= 1) {
    if (file.readUInt32LE(offset) === 0x06054b50) {
      endOfDirectory = offset
      break
    }
  }

  if (endOfDirectory < 0) return false

  const entryCount = file.readUInt16LE(endOfDirectory + 10)
  let offset = file.readUInt32LE(endOfDirectory + 16)

  for (let entry = 0; entry < entryCount; entry += 1) {
    if (offset + 46 > file.length || file.readUInt32LE(offset) !== 0x02014b50) return false

    const nameLength = file.readUInt16LE(offset + 28)
    const extraLength = file.readUInt16LE(offset + 30)
    const commentLength = file.readUInt16LE(offset + 32)
    const nameStart = offset + 46
    const nextEntry = nameStart + nameLength + extraLength + commentLength

    if (nextEntry > file.length) return false
    if (file.toString('utf8', nameStart, nameStart + nameLength) === expectedName) return true

    offset = nextEntry
  }

  return false
}

function matchesFileSignature(extension: string, file: Buffer) {
  if (extension === 'pdf') {
    return file.length >= 5
      && file.subarray(0, 5).toString('ascii') === '%PDF-'
      && file.toString('latin1', Math.max(0, file.length - 1024)).includes('%%EOF')
  }
  if (extension === 'doc' || extension === 'xls') {
    return file.length >= 512
      && file.subarray(0, 8).equals(oleSignature)
      && file.readUInt16LE(28) === 0xfffe
      && [9, 12].includes(file.readUInt16LE(30))
      && file.readUInt16LE(32) === 6
  }
  if (extension === 'docx') {
    return file.length >= 4
      && file.readUInt32LE(0) === 0x04034b50
      && hasZipEntry(file, 'word/document.xml')
  }
  if (extension === 'xlsx') {
    return file.length >= 4
      && file.readUInt32LE(0) === 0x04034b50
      && hasZipEntry(file, 'xl/workbook.xml')
  }
  return false
}

export async function POST(request: Request) {
  const origins = configuredOrigins()
  if (!origins) {
    return errorResponse('Quote submissions are temporarily unavailable because origin configuration is missing or invalid. Please contact NMAS directly.', 503)
  }

  const origin = request.headers.get('origin')
  const normalizedOrigin = origin ? normalizeOrigin(origin) : null
  if (!normalizedOrigin || !origins.has(normalizedOrigin)) {
    return errorResponse('This quote request could not be verified. Please refresh the page and try again.', 403)
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''
  if (!contentType.startsWith('multipart/form-data;')) {
    return errorResponse('Submit the quote request using the form on this page.', 415)
  }

  const contentLength = request.headers.get('content-length')
  if (contentLength && !/^\d+$/.test(contentLength)) {
    return errorResponse('The upload size could not be verified. Please try again.', 400)
  }
  if (contentLength && Number(contentLength) > maximumRequestSize) {
    return errorResponse('The request is too large. Attach a file no larger than 10 MB.', 413)
  }

  let bodySize: number | null
  try {
    bodySize = await validateBoundedBody(request.clone())
  } catch {
    return errorResponse('The uploaded data could not be read. Please try again.', 400)
  }
  if (bodySize === null) return errorResponse('The request is too large. Attach a file no larger than 10 MB.', 413)

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return errorResponse('The submitted form could not be read. Please check the fields and try again.', 400)
  }

  const honeypot = textField(form, 'website')
  if (honeypot === null || honeypot.length > 0) {
    return errorResponse('The quote request could not be verified. Please review the form and try again.', 400)
  }

  const fullName = textField(form, 'fullName')
  const buyerType = textField(form, 'buyerType')
  const organisationField = form.get('organisation')
  const organisation = typeof organisationField === 'string' ? organisationField.trim() : ''
  const serviceCategory = textField(form, 'serviceCategory')
  const email = textField(form, 'email')
  const phone = textField(form, 'phone')
  const message = textField(form, 'message')
  const consent = textField(form, 'consent')
  const validBuyerType = buyerType === 'organisation' || buyerType === 'individual'
  const validServiceCategory = serviceCategories.has(serviceCategory ?? '')
  const organisationFieldIsInvalid = organisationField !== null && typeof organisationField !== 'string'

  if (
    !fullName || fullName.length > 120
    || !validBuyerType
    || !validServiceCategory
    || organisationFieldIsInvalid
    || (buyerType === 'organisation' && !organisation)
    || organisation.length > 160
    || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !phone || phone.length > 40 || !/^\+?\d[\d\s().-]{5,39}$/.test(phone)
    || !message || message.length < 10 || message.length > 6000
    || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(`${fullName}${organisation}${email}${phone}${message}`)
    || consent !== 'yes'
  ) {
    return errorResponse('Check that all required fields are valid and that you have agreed to be contacted.', 400)
  }

  const uploads = form.getAll('rfq')
  if (uploads.length > 1) {
    return errorResponse('Attach no more than one RFQ / BOQ document.', 400)
  }

  const upload = uploads[0]
  let attachment: { filename: string; content: string } | undefined

  if (upload && typeof upload !== 'string' && (upload.name || upload.size > 0)) {
    if (upload.size > maximumFileSize) {
      return errorResponse('The selected file is larger than 10 MB.', 413)
    }

    const extension = upload.name.split('.').pop()?.toLowerCase() ?? ''
    if (!allowedExtensions.has(extension)) {
      return errorResponse('Attach a PDF, Word, or Excel document.', 400)
    }

    const content = Buffer.from(await upload.arrayBuffer())
    if (content.length === 0 || !matchesFileSignature(extension, content)) {
      return errorResponse('The selected file does not match a supported PDF, Word, or Excel format.', 400)
    }

    const safeFilename = upload.name
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .split(/[\\/]/)
      .pop()
      ?.replace(/[^\p{L}\p{N}._ -]/gu, '_')
      .slice(0, 180)

    if (!safeFilename) return errorResponse('The attached file name is invalid.', 400)

    attachment = { filename: safeFilename, content: content.toString('base64') }
  } else if (upload && typeof upload === 'string') {
    return errorResponse('The uploaded RFQ / BOQ could not be read. Please select a document and try again.', 400)
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.QUOTE_TO_EMAIL?.trim()
  const from = process.env.QUOTE_FROM_EMAIL?.trim()

  if (!apiKey || !to || !from) {
    return errorResponse('Quote submissions are temporarily unavailable because email delivery is not configured. Please email hello@nmas.co.za or call 067 487 7278.', 503)
  }

  const emailText = [
    'A new ICT quote request was submitted through the NMAS Innovations website.',
    '',
    `Full Name: ${fullName}`,
    `Enquiring as: ${buyerType === 'organisation' ? 'Organisation' : 'Individual'}`,
    ...(buyerType === 'organisation' ? [`Organisation: ${organisation}`] : []),
    `Enquiry Category: ${serviceCategories.get(serviceCategory ?? '')}`,
    `Email: ${email}`,
    `Contact Number: ${phone}`,
    '',
    'Product Requirements:',
    message,
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: 'New ICT quote request',
        text: emailText,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Quote email delivery failed with HTTP status', response.status)
      return errorResponse('We could not send your quote request right now. Please email hello@nmas.co.za or call 067 487 7278.', 502)
    }
  } catch {
    console.error('Quote email delivery failed because the provider could not be reached.')
    return errorResponse('We could not send your quote request right now. Please email hello@nmas.co.za or call 067 487 7278.', 502)
  }

  return Response.json(
    { message: quoteAcceptedMessage },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
