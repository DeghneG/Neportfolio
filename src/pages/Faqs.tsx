import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import Reveal from '../components/Reveal'
import { faqs } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
      >
        <span
          className={`text-xl font-semibold tracking-tight transition-all duration-500 md:text-3xl ${
            open ? 'text-bone' : 'text-smoke group-hover:translate-x-2 group-hover:text-bone'
          }`}
        >
          {q}
        </span>
        {/* plus / minus drawn with two bars */}
        <span aria-hidden className="relative size-5 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bone" />
          <span
            className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone transition-transform duration-500 ${
              open ? 'scale-y-0' : ''
            }`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-9 text-lg leading-relaxed text-smoke md:text-xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-40 md:px-10">
      <BackButton />
      <Reveal>
        <h1 className="display text-[clamp(3rem,12vw,11rem)]">
          Fa<span className="outline-text">qs</span>
        </h1>
      </Reveal>
      <div className="mt-20 border-t border-line">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 70}>
            <Item q={f.q} a={f.a} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
