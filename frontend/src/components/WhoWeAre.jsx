const HubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
)
const InclusiveIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="2" /><path d="M20 8h-5l-3 11-3-11H4" /></svg>
)
const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v4a6 6 0 0 1-12 0V4Z" /><path d="M6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 1-3 3M9 20h6M12 14v6" /></svg>
)

const features = [
  { icon: <HubIcon />, title: 'Hybrid Campus Model', body: 'Learn online at your pace, then connect in-person at HakVersity hub locations across Nigeria for workshops, collaboration, and mentorship.' },
  { icon: <InclusiveIcon />, title: 'Radically Inclusive', body: 'Programs designed for hearing-impaired and speech-impaired learners, with NSL-accessible content and assistive technology support.' },
  { icon: <TrophyIcon />, title: 'Hakeela Fund Scholarships', body: 'Eligible students can access Hakeela Fund scholarships so that financial constraints never stop talented Africans from building their future.' },
]

function WhoWeAre() {
  return (
    <section className="about">
      <div className="container">
        <p className="sec-label">Who We Are</p>
        <h2 className="sec-title">Education built for African realities.</h2>

        <div className="about__grid">
          <div className="about__copy">
            <p>HakVersity is not a traditional university. We are a hybrid tech institution that blends structured online learning with in-person hubs — designed to meet learners where they are, across Nigeria and the continent.</p>
            <p>Powered by Hakeela&rsquo;s inclusive-first philosophy, every program is built with accessibility at its core — including Nigerian Sign Language support, flexible scheduling, and community-driven mentorship.</p>
            <p>Whether you&rsquo;re a school leaver, a career switcher, or someone who has always been told tech isn&rsquo;t for you — HakVersity is your campus.</p>
          </div>

          <div className="about__cards">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <span className="feature__icon">{f.icon}</span>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
