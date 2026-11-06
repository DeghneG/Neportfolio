import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// A refresh should always start at the top: stop the browser restoring the old scroll
// position, and drop a leftover #section from the URL (e.g. /#work) before React mounts.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
