import { useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from '../Popup/Popup.jsx'
import './Navbar.css'

function Navbar() {
  const [imabongOpen, setImabongOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="HakPortal home">
          <img src="/logo-hakportal.png" alt="HakPortal" height="50" />
        </Link>

        <div className="navbar__actions">
          <Link to="/login" className="navbar__btn navbar__btn--outline">Login</Link>
          <Link to="/signup" className="navbar__btn navbar__btn--solid">Sign Up</Link>
          <button
            type="button"
            className="navbar__avatar"
            aria-label="Meet Imabong, our AI Agent"
            onClick={() => setImabongOpen(true)}
          >
            <img src="/nav-avatar.png" alt="Imabong, our AI Agent" width="44" height="44" />
          </button>
        </div>
      </div>

      <Popup
        open={imabongOpen}
        onClose={() => setImabongOpen(false)}
        title="Imabong is coming soon!"
        image="/nav-avatar.png"
      >
        <p>Imabong, our AI Agent, is coming soon. Stay tuned!</p>
      </Popup>
    </header>
  )
}

export default Navbar
