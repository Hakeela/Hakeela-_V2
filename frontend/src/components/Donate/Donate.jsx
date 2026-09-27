import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Donate.css'

function Donate() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="donate" id="donate">
      {isVideoOpen && (
        <div className="donate__modal" onClick={() => setIsVideoOpen(false)}>
          <div className="donate__modal-content" onClick={e => e.stopPropagation()}>
            <button className="donate__modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close video">×</button>
            <div className="donate__iframe-container">
              <iframe
                src="https://www.youtube.com/embed/XjA22yft2c4?autoplay=1"
                title="Special Needs Workshop Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <div className="donate__panel">
        <div className="donate__text">
          <span className="donate__badge">
            Support our mission
          </span>

          <h2 className="donate__title">Donate</h2>

          <p className="donate__body">
            An interview with a participant from our Special needs and tech
            Workshop, Calabar chapter which aimed to teach digital skills to
            young people with hearing and speech disabilities. Join Hakeela as we
            empower special and marginalized youth in Africa with digital skills.
          </p>

          <div className="donate__actions">
            <a href="#" className="donate__btn donate__btn--solid">
              Donate
            </a>
            <Link to="/about" className="donate__btn donate__btn--outline">
              Learn More
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="donate__media">
          <button className="donate__video" aria-label="Play: Special Needs Workshop Interview" onClick={() => setIsVideoOpen(true)}>
            <img src="/donate-video.png" alt="Special Needs Workshop Interview" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Donate
