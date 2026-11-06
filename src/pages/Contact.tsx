import BackButton from '../components/BackButton'
import Reveal from '../components/Reveal'
import { profile } from '../data/content'

export default function Contact() {
  const rows = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: 'GitHub', value: 'GitHub profile', href: profile.github, external: true },
    { label: 'LinkedIn', value: 'LinkedIn profile', href: profile.linkedin, external: true },
  ]
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-40 md:px-10">
      <BackButton />
      <Reveal>
        <p className="label mb-6">Contact</p>
        <h1 className="display text-[clamp(3rem,12vw,11rem)]">
          Get in <span className="outline-text">touch</span>
        </h1>
      </Reveal>
      <ul className="mt-20 divide-y divide-line border-y border-line">
        {rows.map((r, i) => (
          <Reveal as="li" key={r.label} delay={i * 120}>
            <a
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group grid items-center gap-2 py-8 md:grid-cols-12"
            >
              <span className="label md:col-span-3">{r.label}</span>
              <span className="break-all text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-8 md:text-5xl">
                {r.value}
              </span>
              <span className="hidden text-3xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:col-span-1 md:block md:text-right">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
