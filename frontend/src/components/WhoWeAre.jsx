const features = [
  { icon: '/icons/globe.png', title: 'Hybrid Campus Model', body: 'Learn online at your pace, then connect in-person at HakVersity hub locations across Nigeria for workshops, collaboration, and mentorship.' },
  { icon: '/icons/agreement-02.png', title: 'Radically Inclusive', body: 'Programs designed for hearing-impaired and speech-impaired learners, with NSL-accessible content and assistive technology support.' },
  { icon: '/icons/champion.png', title: 'Hakeela Fund Scholarships', body: 'Eligible students can access Hakeela Fund scholarships so that financial constraints never stop talented Africans from building their future.' },
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
                <span className="feature__icon"><img src={f.icon} alt="" /></span>
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
