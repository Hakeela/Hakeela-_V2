import { Link } from 'react-router-dom'
import './Initiatives.css'

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const otherInitiatives = [
  {
    logo: '/logo-hfund.png',
    alt: 'Hakeela Fund',
    title: 'Hakeela Fund',
    body: 'A dedicated scholarship program aimed at providing educational sponsorships for children and teens from marginalized communities across Africa.',
  },
  {
    logo: '/logo-techhub.png',
    alt: 'HakVersity',
    title: 'HakVersity',
    body: 'A network of physical tech hubs across at least 10 African countries, providing young Africans with quiet, durable workspaces to learn, collaborate, innovate, and grow.',
  },
]

function Initiatives() {
  return (
    <section className="initiatives">
      <div className="initiatives__inner">
        <h2 className="initiatives__title">Our Initiatives</h2>

        {/* Block 1 — HakAbilityTech (image left, text right) */}
        <div className="init-block">
          <div className="init-figure">
            <img src="/init-1.jpg" alt="A mentor and student smiling together" />
          </div>
          <div className="init-block__text">
            <img className="init-block__logo" src="/logo-snat.png" alt="HakSNAT" />
            <h3 className="init-block__heading">
              Empowering Accessibility Through A.I
            </h3>
            <p className="init-block__body">
              &ldquo;Through our Hak-AbilityTech Initiative; we are building a
              world were the visually impaired, speech impaired, or hearing
              impaired can learn tech skills, work in tech establishments, and
              we are doing all this using A.I&rdquo;
              <br />- Victor Eyo
            </p>
            <Link to="/about" className="init-btn init-btn--outline">
              Learn More <Chevron />
            </Link>
          </div>
        </div>

        {/* Block 3 — Meet HakPortal */}
        <div className="hakpilot">
          <header className="hakpilot__head">
            <h3 className="hakpilot__title">Meet HakPortal</h3>
            <p className="hakpilot__subtitle">
              Easily launch your courses, ebooks, events, and products — and
              accept payments all in one place.
            </p>
          </header>

          <div className="hakpilot__card">
            <div className="hakpilot__bar">
              <img className="hakpilot__logo" src="/HakPortal.png" alt="HakPortal" />
              <div className="hakpilot__search">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search</span>
              </div>
              <a href="https://hakportal.hakeela.org" target="_blank" rel="noopener noreferrer" className="init-btn init-btn--solid hakpilot__learn">
                Learn more <Chevron />
              </a>
            </div>

            <div className="hakpilot__hero">
              <div className="hakpilot__hero-text">
                <h4 className="hakpilot__hero-title">
                  Where{' '}
                  <img className="hakpilot__avatars" src="/hakpilot-avatars.png" alt="" />
                  <br />
                  creators launch!
                </h4>
                <p className="hakpilot__hero-body">
                  Launch your course, ebooks, event tickets, digital products,
                  and even accept payments for your physical goods — all in one
                  place.
                </p>
                <a href="#" className="init-btn init-btn--outline">
                  Coming Soon!
                </a>
              </div>
              <div className="hakpilot__hero-art">
                <img src="/hakpilot-rocket.png" alt="Illustration of creators launching a rocket" />
              </div>
            </div>
          </div>
        </div>

        {/* Block 4 — Other Initiatives */}
        <div className="other-init">
          <h3 className="other-init__title">Other Initiatives</h3>
          <div className="other-init__grid">
            {otherInitiatives.map((item) => (
              <article className="other-card" key={item.title}>
                <img className="other-card__logo" src={item.logo} alt={item.alt} />
                <h4 className="other-card__title">{item.title}</h4>
                <p className="other-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Initiatives
