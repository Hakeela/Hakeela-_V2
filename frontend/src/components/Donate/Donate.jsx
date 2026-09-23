import './Donate.css'

function Donate() {
  return (
    <section className="donate" id="donate">
      <div className="donate__panel">
        <div className="donate__text">
          <span className="donate__badge">
            Support our mission
          </span>

          <h2 className="donate__title">Donate</h2>

          <p className="donate__body">
            An interview with a participant from our Hak-AbilityTech Fellowship,
            Calabar, where we impacted young people living with hearing and speech
            disabilities with tech skills. Join Hakeela as we empower people living
            with disabilities and marginalized youth in Africa with tech skills.
          </p>

          <div className="donate__actions">
            <a href="#" className="donate__btn donate__btn--solid">
              Donate
            </a>
            <a
              href="https://hakabilitytech.hakeela.org"
              target="_blank"
              rel="noopener noreferrer"
              className="donate__btn donate__btn--outline"
            >
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
