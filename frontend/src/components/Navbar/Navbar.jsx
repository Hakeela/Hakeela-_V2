import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Popup from '../Popup/Popup.jsx'
import './Navbar.css'

const navLinks = [
  { label: 'Blog', href: 'https://hakeela.org/blog', external: true },
  { label: 'HakPortal', href: 'https://hakportal.hakeela.org', external: true },
  { label: 'HakVersity', href: 'https://hakversity.hakeela.org', external: true },
  { label: 'Hak-AbilityTech', to: '/' },
]

const initiatives = [
  { label: 'Hakeela Fund', href: 'https://hakeela.org', external: true },
  { label: 'HakVersity', href: 'https://hakversity.hakeela.org', external: true },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [initiativesOpen, setInitiativesOpen] = useState(false)
  const [imabong, setImabong] = useState(false)
  const dropdownRef = useRef(null)

  // Close the Initiatives dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setInitiativesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Hakeela home">
          <img src="/logo-full-blue.png" alt="Hakeela" height="40" />
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${menuOpen ? 'is-open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? 'is-active' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <a
                    href={link.href}
                    className="navbar__link"
                    onClick={() => setMenuOpen(false)}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}

            <li className="navbar__dropdown" ref={dropdownRef}>
              <button
                className="navbar__link navbar__dropdown-btn"
                aria-haspopup="true"
                aria-expanded={initiativesOpen}
                onClick={() => setInitiativesOpen((open) => !open)}
              >
                Initiatives
                <svg
                  className={`navbar__chevron ${initiativesOpen ? 'is-open' : ''}`}
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {initiativesOpen && (
                <ul className="navbar__submenu">
                  {initiatives.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="navbar__submenu-link"
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        onClick={() => {
                          setInitiativesOpen(false)
                          setMenuOpen(false)
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <a
                href="https://hakeela.org/about"
                className="navbar__link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                About us
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="navbar__avatar"
          aria-label="Meet Imaobong"
          onClick={() => setImabong(true)}
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src="/nav-avatar.png" alt="Imaobong, our AI Agent" width="48" height="48" />
        </button>
      </div>

      <Popup open={imabong} onClose={() => setImabong(false)} title="Imaobong is coming soon!" image="/nav-avatar.png">
        <p>Imaobong, our AI Agent, is coming soon. Stay tuned!</p>
      </Popup>
    </header>
  )
}

export default Navbar
