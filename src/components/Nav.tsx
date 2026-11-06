import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { to: '/#about', label: 'About' },
  { to: '/#work', label: 'Work' },
  { to: '/#credentials', label: 'Credentials' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="display text-lg tracking-tight">
          NP<span className="text-ash">.</span>
        </Link>
        <ul className="flex items-center gap-5 md:gap-9">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="label !text-smoke relative transition-colors hover:!text-bone after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bone after:transition-transform after:duration-500 hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
