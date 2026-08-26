'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Award, Briefcase, FileText, CheckCircle2 } from 'lucide-react'

const trustCards = [
  { icon: CheckCircle2, label: '100% Black-Owned' },
  { icon: ShieldCheck, label: '36% Black Woman-Owned' },
  { icon: Award, label: '36% Black Youth-Owned' },
  { icon: FileText, label: 'Level 1 B-BBEE' },
  { icon: CheckCircle2, label: 'Fully Tax Compliant' },
  { icon: Briefcase, label: '20+ Years ICT Experience' },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#020817] pt-20 lg:pt-28 pb-16 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,217,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(140,255,216,0.12),transparent_22%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(77,217,255,0.16) 1px, transparent 1px), linear-gradient(rgba(77,217,255,0.16) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 35%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#4dd9ff]/20 bg-[#4dd9ff]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4dd9ff] shadow-[0_0_20px_rgba(77,217,255,0.12)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#4dd9ff] animate-pulse" />
              NMAS Innovations • South African ICT procurement
            </motion.div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Future-ready ICT hardware,
              <span className="block text-[#4dd9ff] bg-clip-text text-transparent bg-gradient-to-r from-[#4dd9ff] via-[#91b8ff] to-[#8cffd8]">
                software licensing
              </span>
              & technology supply solutions.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300/90">
              NMAS Innovations is a trusted South African B2B ICT supplier, delivering genuine hardware, software licensing and enterprise technology procurement services across government, corporate and education sectors.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-300/80">
              <span className="rounded-full border border-white/10 bg-[#071423]/80 px-4 py-2">Hardware procurement</span>
              <span className="rounded-full border border-white/10 bg-[#071423]/80 px-4 py-2">Software licensing</span>
              <span className="rounded-full border border-white/10 bg-[#071423]/80 px-4 py-2">Nationwide distribution</span>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-3xl bg-[#4dd9ff] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#020817] shadow-[0_0_40px_rgba(77,217,255,0.2)] transition-all hover:bg-[#0a1128] hover:text-white"
              >
                Request an ICT Supplier Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-[#071423]/70 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-[#4dd9ff]/20 hover:bg-[#0a1128]/70"
              >
                View Portfolio
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[#4dd9ff]/20 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071423]/70 shadow-[0_60px_120px_-40px_rgba(0,212,255,0.35)]">
              <Image
                src="/images/hero-enterprise-new.webp"
                alt="South African enterprise IT professionals collaborating in a modern boardroom"
                width={800}
                height={600}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020817]/70 to-transparent mix-blend-multiply" />
              <div className="pointer-events-none absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#4dd9ff]/15 blur-3xl" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6,
              },
            },
          }}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {trustCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#071423]/70 p-4 text-center backdrop-blur-lg transition-all hover:bg-[#0a1128]/70 hover:border-[#4dd9ff]/30"
            >
              <card.icon className="h-8 w-8 text-[#4dd9ff]" />
              <span className="text-xs font-semibold leading-snug text-slate-200">
                {card.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
