import { useMemo, useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const W = 1600
const H = 300
const COUNT = 40
const CYCLE = 32 // seconds for the wave to travel one full period (higher = calmer)
const PHASES = [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2] // last === first, so the loop is seamless

/** One line of the ribbon at a given wave phase. */
function buildPath(t: number, phase: number, flip: (v: number) => number) {
  const pts: string[] = []
  for (let x = -20; x <= W + 20; x += 20) {
    const u = x / W
    const spread = 130 + 60 * Math.sin(u * Math.PI * 2 + 0.6 + phase)
    const wave =
      54 * Math.sin(u * Math.PI * 3 + t * 2.2 + phase) + 24 * Math.sin(u * Math.PI * 6 + t * 3.6 + phase * 2)
    const y = 130 + (t - 0.5) * spread + wave
    pts.push(`${x} ${flip(y).toFixed(1)}`)
  }
  return `M${pts.join(' L')}`
}

/**
 * A ribbon of fine lines across the full width. The wave phase travels
 * continuously, so the silk visibly flows.
 */
function Ribbon({ position, shown }: { position: number; shown: boolean }) {
  const reduce = useReducedMotion()
  const lines = useMemo(() => {
    const flip = (v: number) => (position > 0 ? v : H - v)
    return Array.from({ length: COUNT }, (_, i) => {
      const t = i / (COUNT - 1)
      return {
        id: i,
        frames: PHASES.map((p) => buildPath(t, p, flip)),
        opacity: 0.12 + Math.sin(t * Math.PI) * 0.34,
      }
    })
  }, [position])

  return (
    <>
      {lines.map((l) => (
        <motion.path
          key={l.id}
          d={l.frames[0]}
          stroke="currentColor"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: l.opacity } : { pathLength: 0, opacity: 0 }}
          animate={reduce || !shown ? undefined : { pathLength: 1, opacity: l.opacity, d: l.frames }}
          transition={{
            pathLength: { duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: l.id * 0.03 },
            opacity: { duration: 1.6, delay: l.id * 0.03 },
            d: { duration: CYCLE, ease: 'linear', repeat: Infinity },
          }}
        />
      ))}
    </>
  )
}

type Props = {
  children?: ReactNode
  className?: string
  /** 1 or -1 mirrors the ribbon vertically */
  position?: number
}

export function FloatingPathsBackground({ children, className = '', position = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  // Fade the lines out toward the bottom edge (where the footer text sits) and the sides.
  const mask =
    'linear-gradient(to bottom, transparent 0%, #000 22%, #000 48%, transparent 88%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)'
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-bone"
        style={{ maskImage: mask, WebkitMaskImage: mask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
      >
        <svg className="h-full w-full" viewBox={`0 0 ${W} ${H}`} fill="none" preserveAspectRatio="none">
          <Ribbon position={position} shown={shown} />
        </svg>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
