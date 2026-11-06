import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { projects, terms, type Project, type Term } from '../data/content'

const SLOTS_PER_TERM = 4 // total cards per term (real + placeholders)
const VISIBLE = 2 // shown before "See more"
const ease = [0.16, 1, 0.3, 1] as const

type Slot = { kind: 'project'; project: Project } | { kind: 'placeholder'; n: number }

function buildSlots(term: Term): Slot[] {
  const real = projects.filter((p) => p.term === term)
  const slots: Slot[] = real.map((project) => ({ kind: 'project', project }))
  for (let n = real.length + 1; slots.length < Math.max(SLOTS_PER_TERM, real.length); n++) {
    slots.push({ kind: 'placeholder', n })
  }
  return slots
}

function Card({ slot }: { slot: Slot }) {
  if (slot.kind === 'project') {
    const p = slot.project
    return (
      <Link
        to={`/work/${p.slug}`}
        className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden border border-line bg-iron p-8 transition-colors duration-700 hover:border-smoke"
      >
        <div className="absolute inset-0 -translate-x-full bg-steel transition-transform duration-700 ease-out group-hover:translate-x-0" />
        <p className="label relative">Case study</p>
        <div className="relative flex items-end justify-between gap-4">
          <h4 className="display text-3xl md:text-5xl">{p.title}</h4>
          <span className="text-3xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:text-5xl">
            ↗
          </span>
        </div>
      </Link>
    )
  }
  return (
    <div className="flex h-full min-h-56 flex-col justify-between border border-dashed border-line p-8">
      <p className="label">Project {String(slot.n).padStart(2, '0')}</p>
      <div>
        <h4 className="display text-3xl text-steel md:text-4xl">To be announced</h4>
        <p className="label mt-3">Upcoming</p>
      </div>
    </div>
  )
}

function TermRow({ term, index }: { term: Term; index: number }) {
  const [open, setOpen] = useState(false)
  const slots = buildSlots(term)
  const real = slots.filter((s) => s.kind === 'project').length
  const head = slots.slice(0, VISIBLE)
  const rest = slots.slice(VISIBLE)

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <p className="label mb-3">{String(index + 1).padStart(2, '0')} / 03</p>
        <h3 className="display text-3xl md:text-4xl">{term}</h3>
        <p className="label mt-3">
          {real} {real === 1 ? 'project' : 'projects'}
          {slots.length - real > 0 && ` · ${slots.length - real} upcoming`}
        </p>
      </Reveal>

      <div className="md:col-span-9">
        <div className="grid gap-4 md:grid-cols-2">
          {head.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <Card slot={s} />
            </Reveal>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 pt-4 md:grid-cols-2">
                {rest.map((s, i) => (
                  <Card key={i} slot={s} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {rest.length > 0 && (
          <Reveal className="mt-6">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="group label inline-flex items-center gap-3 border border-line px-6 py-3 !text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:!text-ink"
            >
              {open ? 'See less' : `See more (${rest.length})`}
              <span className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`}>↓</span>
            </button>
          </Reveal>
        )}
      </div>
    </div>
  )
}

export default function WorkSection() {
  return (
    <section id="work" className="scroll-mt-20 bg-coal">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <SectionHead title="Work" />
        <div className="space-y-20 md:space-y-28">
          {terms.map((term, i) => (
            <TermRow key={term} term={term} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
