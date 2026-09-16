'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, UploadCloud, FileText } from 'lucide-react'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-[#020817] py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[#0a1128]/60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: info */}
          <div className="pt-10">
            <span className="text-sm font-bold uppercase tracking-widest text-[#00b4d8]">
              Contact Our Enterprise Team
            </span>
            <h2 className="mt-4 text-balance font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Request an ICT Supplier Quote
            </h2>
            <div className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 space-y-4">
              <p>Need ICT equipment or software licensing?</p>
              <p>Send your requirements and NMAS Innovations will assist with product sourcing, quotation and supply of genuine technology solutions.</p>
            </div>

            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#071423]/70 flex items-center justify-center shrink-0 text-[#00b4d8]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Phone</h3>
                  <p className="text-white/70 mt-1">067 487 7278</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#071423]/70 flex items-center justify-center shrink-0 text-[#00b4d8]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Email</h3>
                  <p className="text-white/70 mt-1">info@nmas.co.za</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#071423]/70 flex items-center justify-center shrink-0 text-[#00b4d8]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Location</h3>
                  <p className="text-white/70 mt-1">Gauteng, South Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#071423]/70 p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b4d8]/10 rounded-bl-full" />
            
            {submitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center relative z-10">
                <CheckCircle2 className="h-20 w-20 text-[#00b4d8] mb-6" />
                <h3 className="font-heading text-3xl font-extrabold text-white">
                  RFQ Received
                </h3>
                <p className="mt-4 max-w-sm text-lg text-slate-300/80">
                  Our procurement specialists are reviewing your requirements and will contact you shortly with a competitive quotation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" name="name" placeholder="Your name" required />
                  <Field label="Organisation Name" name="org" placeholder="Company, Dept, or Municipality" required />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" placeholder="you@organisation.co.za" required />
                  <Field label="Contact Number" name="phone" type="tel" placeholder="012 345 6789" required />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-bold text-white">
                    Upload RFQ / BOQ (Optional)
                  </label>
                  <label htmlFor="rfq-file" className="block cursor-pointer rounded-xl border-2 border-dashed border-white/15 p-6 text-center transition-colors hover:border-[#57d8ef]/60 hover:bg-[#0a1128]/40 group">
                    <UploadCloud className="h-8 w-8 text-slate-300/40 mx-auto mb-2 group-hover:text-[#4dd9ff] transition-colors" />
                    <span className="block text-sm text-slate-300/70 font-medium">{fileName || 'Choose a PDF, Excel, or Word document'}</span>
                    <input
                      id="rfq-file"
                      name="rfq-file"
                      type="file"
                      accept=".pdf,.xls,.xlsx,.doc,.docx"
                      className="sr-only"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold text-white">
                    Product Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Specify exact configurations, quantities, or delivery requirements..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#071423]/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-300/50 focus:border-[#4dd9ff] focus:ring-4 focus:ring-[#4dd9ff]/10"
                  />
                </div>
                <p className="text-xs text-slate-300/60 italic font-medium">
                  Please provide product specifications, quantities, preferred brands, delivery location and required timelines where available.
                </p>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4dd9ff] px-6 py-4 text-base font-bold uppercase tracking-wider text-[#020817] transition-all hover:bg-[#0a1228] hover:text-white"
                >
                  <FileText className="h-5 w-5" />
                  Submit Quote Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold text-white">
        {label}{required && <span className="ml-1 text-[#57d8ef]" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#071423]/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-300/50 focus:border-[#4dd9ff] focus:ring-4 focus:ring-[#4dd9ff]/10"
      />
    </div>
  )
}
