import { FloatingPathsBackground } from './ui/floating-paths'
import { profile } from '../data/content'

const links = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
  { label: 'Resume', href: profile.resume, external: true },
]

export default function Footer() {
  return (
    <footer>
      <FloatingPathsBackground position={-1} className="flex min-h-64 items-end bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="label">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="label !text-smoke transition-colors hover:!text-bone"
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </FloatingPathsBackground>
    </footer>
  )
}
