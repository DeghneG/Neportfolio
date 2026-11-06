import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Reveal from '../components/Reveal'
import { projects } from '../data/content'

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:py-20">
      <Reveal className="md:col-span-3">
        <p className="label mb-2">{n}</p>
        <h2 className="display text-2xl md:text-3xl">{title}</h2>
      </Reveal>
      <Reveal className="md:col-span-9" delay={120}>
        {children}
      </Reveal>
    </section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1)
    return (
      <section className="mx-auto min-h-screen max-w-7xl px-6 pt-40 md:px-10">
        <BackButton fallback="/#work" label="Back to work" />
        <h1 className="display text-6xl">Not found</h1>
      </section>
    )
  const p = projects[i]
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <article className="mx-auto max-w-7xl px-6 pb-12 pt-36 md:px-10">
      <BackButton fallback="/#work" label="Back to work" />
      <Reveal>
        <p className="label mb-6">{p.term} project</p>
        <h1 className="display text-[clamp(3rem,11vw,10rem)]">{p.title}</h1>
      </Reveal>

      <div className="mt-20">
        <Block n="01" title="Problem & overview">
          <p className="text-xl leading-relaxed text-smoke md:text-2xl">{p.problem}</p>
        </Block>

        <Block n="02" title="Role, timeline, tools">
          <dl className="grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="label mb-2">Role</dt>
              <dd className="text-lg">{p.role}</dd>
            </div>
            <div>
              <dt className="label mb-2">Timeline</dt>
              <dd className="text-lg">{p.timeline}</dd>
            </div>
            <div>
              <dt className="label mb-2">Tools</dt>
              <dd className="flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="border border-line px-3 py-1 font-mono text-xs text-smoke">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Block>

        <Block n="03" title="Process, wireframes, code, visuals">
          <div className="space-y-6">
            {p.process.map((x, k) => (
              <p key={k} className="text-lg text-smoke">
                {x}
              </p>
            ))}
            <div className="grid aspect-video place-items-center border border-dashed border-line">
              <span className="label">Wireframes / visuals</span>
            </div>
          </div>
        </Block>

        <Block n="04" title="Results & deliverables">
          <ul className="space-y-3">
            {p.results.map((x, k) => (
              <li key={k} className="border-l border-bone pl-5 text-lg text-smoke">
                {x}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <Reveal as="nav" className="grid border-y border-line md:grid-cols-2">
        <Link
          to={`/work/${prev.slug}`}
          className="group border-b border-line p-8 transition-colors hover:bg-iron md:border-b-0 md:border-r md:p-12"
        >
          <p className="label mb-3">← Previous</p>
          <p className="display text-3xl transition-transform duration-500 group-hover:-translate-x-2 md:text-5xl">
            {prev.title}
          </p>
        </Link>
        <Link to={`/work/${next.slug}`} className="group p-8 text-left transition-colors hover:bg-iron md:p-12 md:text-right">
          <p className="label mb-3">Next →</p>
          <p className="display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
            {next.title}
          </p>
        </Link>
      </Reveal>
    </article>
  )
}
