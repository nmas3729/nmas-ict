import assert from 'node:assert/strict'
import { test } from 'node:test'
import { POST } from './route.ts'

const defaultEnvironment = {
  SITE_URL: 'https://www.nmas.co.za',
  ALLOWED_ORIGINS: undefined,
  RESEND_API_KEY: 'test-api-key',
  QUOTE_TO_EMAIL: 'quotes@example.test',
  QUOTE_FROM_EMAIL: 'website@example.test',
}

type TestEnvironment = Partial<Record<keyof typeof defaultEnvironment, string | undefined>>

async function withEnvironment(
  overrides: TestEnvironment,
  fetchMock: typeof fetch,
  run: () => Promise<void>,
) {
  const keys = Object.keys(defaultEnvironment) as (keyof typeof defaultEnvironment)[]
  const previousEnvironment = new Map(keys.map((key) => [key, process.env[key]]))
  const originalFetch = globalThis.fetch

  for (const key of keys) {
    const value = Object.hasOwn(overrides, key) ? overrides[key] : defaultEnvironment[key]
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  globalThis.fetch = fetchMock

  try {
    await run()
  } finally {
    for (const [key, value] of previousEnvironment) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    globalThis.fetch = originalFetch
  }
}

function quoteRequest(origin?: string, overrides: Record<string, string> = {}) {
  const form = new FormData()
  const values: Record<string, string> = {
    website: '',
    fullName: 'Test Buyer',
    buyerType: 'individual',
    serviceCategory: 'ict-hardware',
    email: 'buyer@example.test',
    phone: '+27123456789',
    message: 'Requesting a quotation for equipment.',
    consent: 'yes',
    ...overrides,
  }
  for (const [name, value] of Object.entries(values)) form.set(name, value)

  return new Request('http://quote-app.internal:3000/api/quote', {
    method: 'POST',
    headers: origin === undefined ? {} : { origin },
    body: form,
  })
}

const successfulDelivery: typeof fetch = async () => Response.json({ id: 'mock-email-id' })

test('accepts the configured production origin behind an internal proxy URL', async () => {
  let deliveryCalls = 0
  const mockDelivery: typeof fetch = async () => {
    deliveryCalls += 1
    return Response.json({ id: 'mock-email-id' })
  }

  await withEnvironment(
    { SITE_URL: 'https://www.nmas.co.za:443/contact' },
    mockDelivery,
    async () => {
      const response = await POST(quoteRequest('https://www.nmas.co.za'))
      assert.equal(response.status, 200)
      assert.equal(deliveryCalls, 1)
    },
  )
})

test('accepts only additional origins explicitly listed in ALLOWED_ORIGINS', async () => {
  await withEnvironment(
    { ALLOWED_ORIGINS: 'https://preview.nmas.co.za/contact' },
    successfulDelivery,
    async () => {
      const response = await POST(quoteRequest('https://preview.nmas.co.za'))
      assert.equal(response.status, 200)
    },
  )
})

test('rejects untrusted, missing, and malformed request origins without sending email', async () => {
  let deliveryCalls = 0
  const mockDelivery: typeof fetch = async () => {
    deliveryCalls += 1
    return Response.json({ id: 'mock-email-id' })
  }

  await withEnvironment({}, mockDelivery, async () => {
    for (const origin of ['https://untrusted.example', undefined, 'https://[invalid']) {
      const response = await POST(quoteRequest(origin))
      assert.equal(response.status, 403)
      assert.match((await response.json()).error, /could not be verified/)
    }
    assert.equal(deliveryCalls, 0)
  })
})

test('fails clearly when SITE_URL or ALLOWED_ORIGINS configuration is missing or invalid', async () => {
  let deliveryCalls = 0
  const mockDelivery: typeof fetch = async () => {
    deliveryCalls += 1
    return Response.json({ id: 'mock-email-id' })
  }

  for (const config of [
    { SITE_URL: undefined },
    { SITE_URL: 'not-a-url' },
    { ALLOWED_ORIGINS: 'https://preview.nmas.co.za,,https://other.nmas.co.za' },
  ]) {
    await withEnvironment(config, mockDelivery, async () => {
      const response = await POST(quoteRequest('https://www.nmas.co.za'))
      const result = await response.json()
      assert.equal(response.status, 503)
      assert.match(result.error, /origin configuration/)
      assert.doesNotMatch(result.error, /could not be verified/)
    })
  }
  assert.equal(deliveryCalls, 0)
})

test('reports invalid form data as validation errors, not origin errors', async () => {
  let deliveryCalls = 0
  const mockDelivery: typeof fetch = async () => {
    deliveryCalls += 1
    return Response.json({ id: 'mock-email-id' })
  }

  await withEnvironment({}, mockDelivery, async () => {
    const response = await POST(quoteRequest('https://www.nmas.co.za', { buyerType: 'unknown' }))
    const result = await response.json()
    assert.equal(response.status, 400)
    assert.match(result.error, /required fields are valid/)
    assert.doesNotMatch(result.error, /could not be verified/)
    assert.equal(deliveryCalls, 0)
  })
})

test('reports Resend failures as delivery errors, not origin errors', async () => {
  await withEnvironment(
    {},
    async () => Response.json({ error: 'mock provider failure' }, { status: 500 }),
    async () => {
      const response = await POST(quoteRequest('https://www.nmas.co.za'))
      const result = await response.json()
      assert.equal(response.status, 502)
      assert.match(result.error, /could not send your quote request/)
      assert.doesNotMatch(result.error, /could not be verified/)
    },
  )
})

test('reports missing Resend configuration as an email configuration error', async () => {
  await withEnvironment(
    { RESEND_API_KEY: undefined },
    successfulDelivery,
    async () => {
      const response = await POST(quoteRequest('https://www.nmas.co.za'))
      const result = await response.json()
      assert.equal(response.status, 503)
      assert.match(result.error, /email delivery is not configured/)
      assert.doesNotMatch(result.error, /could not be verified/)
    },
  )
})
