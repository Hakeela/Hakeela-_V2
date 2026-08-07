import { useNavigate } from 'react-router-dom'
import './AuthLayout.css'

function AuthLayout({ children }) {
  const navigate = useNavigate()

  const handleBack = () => {
    // Go to the previous page if there's in-app history, else fall back home
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="auth">
      {/* Left — form */}
      <div className="auth__form-side">
        <div className="auth__form-wrap">
          <button type="button" className="auth__back" onClick={handleBack}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          {children}
        </div>
      </div>

      {/* Right — marketing panel */}
      <aside className="auth__aside">
        <div className="auth__aside-content">
          <img className="auth__logo" src="/logo-white.png" alt="HakPortal" />
          <h2 className="auth__aside-title">
            Empowering the Next Generation of Creators and Innovators
          </h2>
          <p className="auth__aside-desc">
            At Hakeela, we equip students with practical digital skills to turn
            ideas into impact. From coding to design, our expert-led courses help
            you learn fast, build real projects, and thrive in the digital world.
          </p>
          <a href="#" className="auth__aside-btn">
            Join the community
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </aside>
    </div>
  )
}

export default AuthLayout
