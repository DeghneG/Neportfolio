import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import WorkSection from '../components/WorkSection'
import { credentials, languageGroups, profile } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

function Hero() {
  const [first, last] = profile.name.split(' ')
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 78% 18%, rgba(255,255,255,.07), transparent 70%), linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 12.5% 100%',
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.2 }}
        className="pointer-events-none absolute bottom-0 right-0 top-0 w-full opacity-40 md:w-[48%] md:opacity-100"
        style={{
          maskImage: 'linear-gradient(to left, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 25%)',
          maskComposite: 'intersect',
          WebkitMaskImage: 'linear-gradient(to left, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 25%)',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <img src="/profile.jpg" alt="" className="h-full w-full object-cover object-[50%_28%] grayscale contrast-125 brightness-90" />
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="label mb-8"
        >
          Portfolio — {new Date().getFullYear()}
        </motion.p>
        <h1 className="display text-[clamp(3.5rem,13.5vw,13rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.3, ease, delay: 0.3 }}
            >
              {first}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="outline-text block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.3, ease, delay: 0.45 }}
            >
              {last}
            </motion.span>
          </span>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
          className="mt-12 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-md text-xl text-smoke md:text-2xl">{profile.tagline}</p>
          <div className="flex items-center gap-6">
            <Link
              to="/#work"
              className="group inline-flex items-center gap-3 bg-bone px-7 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-all duration-500 hover:bg-white"
            >
              View work
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </Link>
            <Link to="/contact" className="label !text-bone underline-offset-8 hover:underline">
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40">
      <SectionHead title="About" />
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="space-y-12 md:col-span-7">
          <div className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-line">
            <img
              src="/profile.jpg"
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="h-full w-full object-cover object-[50%_25%] grayscale contrast-110 transition-all duration-1000 hover:scale-105"
            />
          </div>
          <p className="text-2xl leading-snug text-bone md:text-4xl md:leading-tight">{profile.bio}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-10 md:col-span-5">
          {languageGroups.map((g, gi) => (
            <div key={g.title} className={g.wide ? 'col-span-2' : undefined}>
              <Reveal delay={gi * 150}>
                <h3 className="display mb-6 text-2xl">{g.title}</h3>
              </Reveal>
              <ul className={g.wide ? 'grid grid-cols-2 gap-x-10 gap-y-3' : 'space-y-3'}>
                {g.items.map((l, i) => (
                  <Reveal as="li" key={l} delay={gi * 150 + (i + 1) * 90} className="flex items-center gap-3 text-xl">
                    <span aria-hidden className="size-1.5 shrink-0 bg-bone" />
                    <span className="font-medium tracking-tight text-smoke">{l}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40">
      <SectionHead title="Credentials" />
      <ul className="group/list divide-y divide-line border-b border-line">
        {credentials.map((c, i) => (
          <Reveal as="li" key={c.school} delay={i * 120}>
            <div className="grid gap-4 py-10 transition-opacity duration-500 group-hover/list:opacity-35 hover:!opacity-100 md:grid-cols-12 md:items-end md:gap-10 md:py-14">
              <p className="display outline-text text-5xl md:col-span-5 md:text-7xl">
                {c.from}
                <span className="mx-3 text-ash md:mx-5" aria-hidden>
                  —
                </span>
                {c.to}
              </p>
              <div className="md:col-span-7">
                <p className="text-2xl font-semibold tracking-tight md:text-4xl">{c.school}</p>
                <p className="label mt-3">{c.level}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="border-t border-line">
      <Link to="/contact" className="group mx-auto block max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="label mb-6">Have something to build?</p>
          <p className="display text-[clamp(3rem,11vw,10rem)]">
            {"Let's "}
            <span className="outline-text transition-colors duration-700 group-hover:!text-bone">talk</span> ↗
          </p>
        </Reveal>
      </Link>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WorkSection />
      <Credentials />
      <ContactCta />
    </>
  )
}
