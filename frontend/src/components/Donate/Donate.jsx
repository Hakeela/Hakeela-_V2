import './Donate.css'

function Donate() {
  return (
    <section className="donate">
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
            <a href="#" className="donate__btn donate__btn--outline">
              Learn More
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="donate__media">
          <button className="donate__video" aria-label="Play: Special Needs Workshop Interview">
            <img src="/donate-video.png" alt="Special Needs Workshop Interview" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Donate
