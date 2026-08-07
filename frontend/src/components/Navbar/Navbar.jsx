import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="HakPortal home">
          <img src="/logo-hakportal.png" alt="HakPortal" height="50" />
        </Link>

        <div className="navbar__actions">
          <ThemeToggle />
          <Link to="/login" className="navbar__btn navbar__btn--outline">Login</Link>
          <Link to="/signup" className="navbar__btn navbar__btn--solid">Sign Up</Link>
          <Link to="/login" className="navbar__avatar" aria-label="Your account">
            <img src="/nav-avatar.png" alt="Account" width="44" height="44" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
