import { useLocation, useNavigate } from 'react-router-dom'

/** Goes back in history when possible, otherwise falls back to `fallback`. */
export default function BackButton({ fallback = '/', label = 'Back' }: { fallback?: string; label?: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  const go = () => {
    // location.key is "default" on the first page of a session (nothing to go back to)
    if (location.key !== 'default') navigate(-1)
    else navigate(fallback)
  }

  return (
    <button
      type="button"
      onClick={go}
      className="group label mb-10 inline-flex items-center gap-3 !text-smoke transition-colors duration-500 hover:!text-bone"
    >
      <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">←</span>
      {label}
    </button>
  )
}
