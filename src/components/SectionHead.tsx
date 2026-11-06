import Reveal from './Reveal'

export default function SectionHead({ title }: { title: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <h2 className="display text-5xl md:text-8xl">{title}</h2>
      <div className="rule-grow mt-6 h-px w-full bg-line" />
    </Reveal>
  )
}
