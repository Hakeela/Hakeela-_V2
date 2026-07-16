import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

const navLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'HakStudios', href: '#' },
  { label: 'HakPortal', href: '#' },
  { label: 'HakVersity', href: '#' },
  { label: 'HakAbilityTech', href: '#' },
]

const initiatives = [
  { label: 'Hakeela Fund', href: '#' },
  { label: 'Hakeela Tech Hub', href: '#' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [initiativesOpen, setInitiativesOpen] = useState(false)
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
                  <a href={link.href} className="navbar__link">
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
                      <a href={item.href} className="navbar__submenu-link">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
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
