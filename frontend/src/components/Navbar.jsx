import { useState } from 'react'
import Popup from './Popup.jsx'

const links = [
  { label: 'Blog', href: 'https://hakeela.org/blog', external: true },
  { label: 'HakPortal', href: 'https://hakportal.hakeela.org', external: true },
  { label: 'HakVersity', href: '/', active: true },
  { label: 'Hak-AbilityTech', href: '#' },
  { label: 'About us', href: 'https://hakeela.org/about', external: true },
]

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
)

function Navbar() {
  const [open, setOpen] = useState(false)
  const [imabong, setImabong] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__logo" href="/" aria-label="HakVersity home">
          <img src="/logo-full-blue.png" alt="Hakeela" />
        </a>

        <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>

        <ul className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                className={`nav__link ${l.active ? 'is-active' : ''}`}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li><button className="nav__link">Initiatives <Chevron /></button></li>
        </ul>

        <div className="nav__right">
          <a className="btn btn--solid" href="#apply">Enroll Now</a>
          <button className="nav__avatar" aria-label="Meet Imaobong" onClick={() => setImabong(true)}>
            <img src="/nav-avatar.png" alt="Imaobong, our AI Agent" />
          </button>
        </div>
      </div>

      <Popup open={imabong} onClose={() => setImabong(false)} title="Imaobong is coming soon!" image="/nav-avatar.png">
        <p>Imaobong, our AI Agent, is coming soon. Stay tuned!</p>
      </Popup>
    </header>
  )
}

export default Navbar
