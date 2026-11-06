'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { trackEvent } from '@/components/google-analytics'

const maximumFileSize = 10 * 1024 * 1024
const acceptedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx']
const acceptedFileTypes = '.pdf,.doc,.docx,.xls,.xlsx'

type SubmissionStatus =
  | { kind: 'idle' }
  | { kind: 'loading'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

export function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>({ kind: 'idle' })
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const [buyerType, setBuyerType] = useState('')
  const formStarted = useRef(false)

  function handleFormFocus() {
    if (formStarted.current) return
    formStarted.current = true
    trackEvent('rfq_form_start')
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    setFileError('')
    setFileName('')
    setStatus({ kind: 'idle' })
    if (!file) return

    if (file.size > maximumFileSize) {
      setFileError('The selected file is larger than 10 MB. Choose a smaller file.')
      event.currentTarget.value = ''
      return
    }

    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !acceptedExtensions.includes(extension)) {
      setFileError('Choose a PDF, Word, or Excel document.')
      event.currentTarget.value = ''
      return
    }

    setFileName(file.name)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    setStatus({ kind: 'loading', message: 'Sending your quote request…' })
    trackEvent('rfq_form_submit')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        body: new FormData(formElement),
      })
      const result: { error?: string } = await response.json()

      if (!response.ok) {
        setStatus({
          kind: 'error',
          message: result.error ?? 'We could not submit your request. Please try again or contact NMAS directly.',
        })
        return
      }

      formElement.reset()
      setFileName('')
      setFileError('')
      setBuyerType('')
      setStatus({
        kind: 'success',
        message: 'Your quote request has been accepted for delivery. NMAS will follow up using the details provided.',
      })
      trackEvent('rfq_form_success')
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not reach the quote service. Please try again or email hello@nmas.co.za.',
      })
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/[0.07] bg-[#050c18] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Contact NMAS</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Request an ICT supplier quote
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-400">
            Individuals and organisations can enquire about genuine ICT equipment, software licensing, or procurement support.
          </p>

          <address className="mt-8 space-y-5 not-italic">
            <div className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
              <div>
                <p className="text-sm font-semibold text-white">Phone</p>
                <a href="tel:+27674877278" onClick={() => trackEvent('phone_link_click', { location: 'contact' })} className="mt-1 inline-block text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-cyan-300">
                  067 487 7278
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <a href="mailto:hello@nmas.co.za" onClick={() => trackEvent('email_link_click', { location: 'contact' })} className="mt-1 inline-block text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-cyan-300">
                  hello@nmas.co.za
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
              <div>
                <p className="text-sm font-semibold text-white">Location</p>
                <p className="mt-1 text-slate-300">Benoni, Gauteng, South Africa</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Company registration</p>
                <p className="mt-1 text-slate-300">Company Registration No. 2023/727067/07</p>
              </div>
            </div>
          </address>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-[#0a1424] p-5 shadow-xl shadow-black/15 sm:p-8">
          <form onSubmit={handleSubmit} onFocusCapture={handleFormFocus} className="space-y-5" aria-busy={status.kind === 'loading'}>
            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="fullName" name="fullName" label="Full Name" autoComplete="name" required maxLength={120} />
              <div>
                <label htmlFor="buyerType" className="block text-sm font-semibold text-slate-100">
                  Enquiring as <span className="text-rose-300" aria-hidden="true">*</span>
                </label>
                <select
                  id="buyerType"
                  name="buyerType"
                  value={buyerType}
                  onChange={(event) => setBuyerType(event.currentTarget.value)}
                  required
                  className="mt-2 block min-h-11 w-full rounded-md border border-slate-700 bg-[#071321] px-3 py-2.5 text-white focus-visible:outline-primary"
                >
                  <option value="" disabled>Select Organisation or Individual</option>
                  <option value="organisation">Organisation</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
              <div>
                <label htmlFor="serviceCategory" className="block text-sm font-semibold text-slate-100">
                  Enquiry Category <span className="text-rose-300" aria-hidden="true">*</span>
                </label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  required
                  defaultValue=""
                  className="mt-2 block min-h-11 w-full rounded-md border border-slate-700 bg-[#071321] px-3 py-2.5 text-white focus-visible:outline-primary"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="ict-hardware">ICT hardware</option>
                  <option value="software-licensing">Software licensing</option>
                  <option value="procurement-support">Procurement support</option>
                  <option value="other-requirements">Other requirements</option>
                </select>
              </div>
              {buyerType === 'organisation' && (
                <FormField id="organisation" name="organisation" label="Organisation Name" autoComplete="organization" required maxLength={160} />
              )}
              <FormField id="email" name="email" label="Email" type="email" autoComplete="email" required maxLength={254} />
              <FormField id="phone" name="phone" label="Contact Number" type="tel" autoComplete="tel" required maxLength={40} />
            </div>

            <div>
              <label htmlFor="rfq" className="block text-sm font-semibold text-slate-100">
                Upload RFQ / BOQ <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input
                id="rfq"
                name="rfq"
                type="file"
                accept={acceptedFileTypes}
                onChange={handleFileChange}
                aria-describedby="rfq-help rfq-error"
                aria-invalid={Boolean(fileError)}
                className="mt-2 block w-full rounded-md border border-slate-700 bg-[#071321] text-sm text-slate-300 file:mr-4 file:border-0 file:bg-slate-800 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-slate-700 focus-visible:outline-primary"
              />
              <p id="rfq-help" className="mt-2 text-xs leading-relaxed text-slate-400">
                Accepted: PDF, Word (.doc, .docx), or Excel (.xls, .xlsx). Maximum file size: 10 MB.
                {fileName ? <span className="mt-1 block font-medium text-slate-200">Selected: {fileName}</span> : null}
              </p>
              <p id="rfq-error" className="mt-1 text-sm text-rose-300" aria-live="polite">
                {fileError}
              </p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-100">
                Product Requirements <span className="text-rose-300" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={6000}
                rows={5}
                placeholder="Include specifications, quantities, preferred brands, delivery location, and timelines."
                className="mt-2 block w-full resize-y rounded-md border border-slate-700 bg-[#071321] px-3 py-3 text-white placeholder:text-slate-500 focus-visible:outline-primary"
              />
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-cyan-300"
                />
                <span>
                  I agree that NMAS Innovations may contact me about this quote request.
                  <span className="ml-1 text-rose-300" aria-hidden="true">*</span>
                </span>
              </label>
            </div>

            {status.kind !== 'idle' && (
              <p
                role={status.kind === 'error' ? 'alert' : 'status'}
                aria-live={status.kind === 'error' ? 'assertive' : 'polite'}
                className={`rounded-md px-4 py-3 text-sm leading-relaxed ${
                  status.kind === 'success'
                    ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    : status.kind === 'error'
                      ? 'border border-rose-500/30 bg-rose-500/10 text-rose-200'
                      : 'border border-cyan-300/20 bg-cyan-300/[0.07] text-slate-200'
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={status.kind === 'loading' || Boolean(fileError)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.kind === 'loading' ? 'Sending request…' : 'Submit Quote Request'}
            </button>
            <p className="text-xs leading-relaxed text-slate-500">
              Your RFQ / BOQ is sent to NMAS with your quote request.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function FormField({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  required = false,
  maxLength,
}: {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  autoComplete: string
  required?: boolean
  maxLength: number
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-100">
        {label}
        {required && <span className="ml-1 text-rose-300" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        className="mt-2 block min-h-11 w-full rounded-md border border-slate-700 bg-[#071321] px-3 py-2.5 text-white placeholder:text-slate-500 focus-visible:outline-primary"
      />
    </div>
  )
}
