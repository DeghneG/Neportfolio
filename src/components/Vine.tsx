import { useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'

const W = 100
const H = 600
const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'

const STEM = '#3f8a52'
const STEM_DARK = '#255031'
const LEAF = '#4a9a5e'
const ROSE_DARK = '#5c0d12'
const ROSE_MID = '#9b1620'
const ROSE_LIGHT = '#c4262d'

// small deterministic pseudo-random so the vine looks organic but never changes between renders
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const stemX = (y: number, seed: number) => 50 + 16 * Math.sin(y / 70 + seed) + 6 * Math.sin(y / 23 + seed * 2)

/** A stylised rose bloom drawn around (0,0), radius ~12. */
function Rose() {
  return (
    <g>
      <circle r={12} fill={ROSE_DARK} />
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 -1 C-10 -3 -11 -13 0 -13 C11 -13 10 -3 0 -1Z"
          fill={ROSE_MID}
          stroke={ROSE_DARK}
          strokeWidth={0.7}
        />
      ))}
      {[36, 108, 180, 252, 324].map((a) => (
        <path
          key={a}
          transform={`rotate(${a}) scale(.68)`}
          d="M0 -1 C-10 -3 -11 -13 0 -13 C11 -13 10 -3 0 -1Z"
          fill={ROSE_LIGHT}
          stroke={ROSE_DARK}
          strokeWidth={0.9}
        />
      ))}
      <path
        d="M0 0 C3 -1 4 -4 1 -5 C-3 -6 -5 -2 -3 1 C-1 4 4 3 5 -1"
        stroke={ROSE_DARK}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  )
}

type Props = {
  className?: string
  seed?: number
  /** grow upward from the bottom instead of hanging from the top */
  up?: boolean
}

/**
 * A thorny green rose vine. The stem draws itself as it scrolls into view, then thorns,
 * leaves and finally the red roses bloom along it.
 */
export default function Vine({ className = '', seed = 0, up = false }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.05 })

  const { d, leaves, thorns, roses } = useMemo(() => {
    const pts: string[] = []
    for (let y = -10; y <= H + 10; y += 10) pts.push(`${stemX(y, seed).toFixed(1)} ${y}`)

    const leaves: { x: number; y: number; deg: number; s: number; i: number }[] = []
    let i = 0
    for (let y = 50; y < H - 20; y += 64) {
      const side = i % 2 === 0 ? 1 : -1
      const base = side > 0 ? 30 + rnd(i + seed) * 25 : 150 - rnd(i + seed) * 25
      leaves.push({ x: stemX(y, seed), y, deg: base, s: 0.55 + rnd(i * 3 + seed) * 0.35, i })
      i++
    }

    const thorns: { x: number; y: number; deg: number; i: number }[] = []
    i = 0
    for (let y = 24; y < H; y += 21) {
      const side = i % 2 === 0 ? -1 : 1
      thorns.push({ x: stemX(y, seed), y, deg: side > 0 ? 62 : 118, i })
      i++
    }

    const roses = [150, 330, 500].map((y, k) => {
      const side = (k + seed) % 2 === 0 ? 1 : -1
      const sx = stemX(y, seed)
      return { sx, y, rx: sx + side * 17, ry: y + 6, s: 0.8 + rnd(k + seed) * 0.25, k }
    })

    return { d: `M${pts.join(' L')}`, leaves, thorns, roses }
  }, [seed])

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none ${up ? '-scale-y-100' : ''} ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="vine-sway h-full w-full"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        style={{ animationDelay: `${-seed * 3}s` }}
      >
        {/* stem */}
        <path
          d={d}
          pathLength={1}
          stroke={STEM}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={visible ? 0 : 1}
          style={{ transition: `stroke-dashoffset 3.8s ${ease}` }}
        />

        {/* thorns */}
        {thorns.map((t) => (
          <g key={`t${t.i}`} transform={`translate(${t.x.toFixed(1)} ${t.y}) rotate(${t.deg})`}>
            <path
              d="M0 -1.4 L8 0.6 L0 1.8Z"
              fill={STEM_DARK}
              stroke={STEM_DARK}
              strokeWidth={0.4}
              strokeLinejoin="round"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.8s ease ${(0.4 + (t.y / H) * 3).toFixed(2)}s`,
              }}
            />
          </g>
        ))}

        {/* leaves */}
        {leaves.map((l) => (
          <g key={`l${l.i}`} transform={`translate(${l.x.toFixed(1)} ${l.y}) rotate(${l.deg.toFixed(1)})`}>
            <g
              style={{
                transformBox: 'fill-box',
                transformOrigin: '0% 50%',
                transform: `scale(${visible ? l.s : 0})`,
                transition: `transform 1.4s ${ease} ${(0.6 + (l.y / H) * 3).toFixed(2)}s`,
              }}
            >
              <path d="M0 0 C8 -10 24 -10 32 0 C24 10 8 10 0 0Z" fill={LEAF} stroke={STEM_DARK} strokeWidth={1} />
              <path d="M2 0 L28 0" stroke={STEM_DARK} strokeWidth={0.7} />
            </g>
          </g>
        ))}

        {/* roses */}
        {roses.map((r) => (
          <g key={`r${r.k}`}>
            <path
              d={`M${r.sx.toFixed(1)} ${r.y} Q${((r.sx + r.rx) / 2).toFixed(1)} ${r.y + 10} ${r.rx.toFixed(1)} ${r.ry}`}
              stroke={STEM}
              strokeWidth={1.6}
              strokeLinecap="round"
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.8s ease ${(1.2 + r.k * 0.5).toFixed(2)}s` }}
            />
            <g transform={`translate(${r.rx.toFixed(1)} ${r.ry})`}>
              <g
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: '50% 50%',
                  transform: `scale(${visible ? r.s : 0}) rotate(${visible ? 0 : -90}deg)`,
                  transition: `transform 1.8s ${ease} ${(2 + r.k * 0.6).toFixed(2)}s`,
                }}
              >
                <Rose />
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
