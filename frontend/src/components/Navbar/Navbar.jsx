import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

const navLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'HakPortal', href: 'https://hakportal.hakeela.org', external: true },
  { label: 'HakVersity', href: 'https://hakversity.hakeela.org', external: true },
  { label: 'Hak-AbilityTech', href: 'https://hakabilitytech.hakeela.org', external: true },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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

            <li>
              <a
                href="/#initiatives"
                className="navbar__link"
                onClick={() => setMenuOpen(false)}
              >
                Hakeela Fund
              </a>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'is-active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                About us
              </NavLink>
            </li>
          </ul>
        </nav>

        <ThemeToggle />

        <a href="#" className="navbar__avatar" aria-label="Your account">
          <img src="/avatar.png" alt="Account" width="48" height="48" />
        </a>
      </div>
    </header>
  )
}

export default Navbar
