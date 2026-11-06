import { useEffect } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Intro curtain: the monogram rises out of a mask, holds a beat, then the whole
 * black panel lifts away to reveal the page. No bar, no counter.
 */
export default function Preloader({ onReveal }: { onReveal: () => void }) {
  useEffect(() => {
    const t = setTimeout(onReveal, 2100)
    return () => clearTimeout(t)
  }, [onReveal])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease }}
    >
      <div className="text-center">
        <div className="overflow-hidden pb-[0.08em]">
          <motion.p
            className="display text-[clamp(6rem,24vw,18rem)]"
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
          >
            NP<span className="text-ash">.</span>
          </motion.p>
        </div>
        <motion.div
          className="mx-auto mt-6 h-px w-24 origin-center bg-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
        />
        <motion.p
          className="label mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
        >
          Neptali Palmares — Developer
        </motion.p>
      </div>
    </motion.div>
  )
}
