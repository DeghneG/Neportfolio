import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin bar fixed to the top of the viewport that fills as the page is scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-bone"
      style={{ scaleX }}
    />
  )
}
