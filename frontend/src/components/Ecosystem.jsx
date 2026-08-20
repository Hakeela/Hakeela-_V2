// Titles corrected from the mockup (which repeated placeholder labels); the body
// copy is preserved from the design.
const cards = [
  { title: 'Co-working Space', body: 'Hot desks, meeting rooms, and fast internet — open to all enrolled students.' },
  { title: 'Mentorship Sessions', body: 'Monthly in-person and virtual sessions with industry mentors from Africa and the diaspora.' },
  { title: 'Events & Hackathons', body: 'Quarterly hackathons, pitch days, and career fairs hosted across hub locations.' },
  { title: 'HakPortal Access', body: "Full access to HakPortal — Hakeela's AI-powered inclusive learning marketplace." },
  { title: 'Accessibility First', body: 'Nigerian Sign Language support and assistive tools available at every hub location.' },
  { title: 'Career Support', body: "Job board access, CV clinics, and direct connections with Hakeela's employer network." },
]

function Ecosystem() {
  return (
    <section className="eco">
      <div className="container">
        <div className="eco__panel">
          <p className="eco__label">Our Space</p>
          <h2 className="eco__title">More than a school — a tech ecosystem</h2>

          <div className="eco__grid">
            <div className="eco__copy">
              <p>HakVersity&rsquo;s physical hubs are co-working and innovation spaces where students, founders, and creatives come together. Located across Nigerian cities, our hubs serve as real campuses, with events, workshops, and community activations running year-round.</p>
              <p>Hubs are also innovation sandboxes. Student teams work on live briefs, pitch to investors, and collaborate with HakStudios consultants. It is where learning meets doing.</p>
              <p>Hubs are fully accessible, with assistive technologies, quiet zones, and NSL-trained facilitators on site.</p>
            </div>

            <div className="eco__cards">
              {cards.map((c) => (
                <div className="eco-card" key={c.title}>
                  <h3 className="eco-card__title">{c.title}</h3>
                  <p className="eco-card__body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ecosystem
