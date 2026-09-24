import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Popup from './Popup.jsx'

const links = [
  { label: 'Home', to: '/hakversity' },
  { label: 'About', to: '/hakversity/about' },
  { label: 'Blog', to: '/hakversity/blog' },
  { label: 'HakPortal', href: 'https://hakportal.hakeela.org', external: true },
  { label: 'Hakeela', href: 'https://www.hakeela.org/', external: true },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [imabong, setImabong] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="nav__logo" to="/hakversity" aria-label="HakVersity home">
          <img src="/logo-full-blue.png" alt="Hakeela" />
        </Link>

        <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>

        <ul className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.label}>
              {l.to ? (
                <NavLink
                  to={l.to}
                  end={l.to === '/hakversity' || l.to === '/'}
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ) : (
                <a
                  className="nav__link"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
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
