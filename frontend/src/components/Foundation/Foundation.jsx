import './Foundation.css'

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
  </svg>
)

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const cards = [
  {
    icon: <EyeIcon />,
    title: 'Vision',
    body: 'To provide the best technological learning, grooming, and growing platform for marginalized and special needs people, and also become the number one ed-tech solution provider for individuals, businesses, and organizations globally.',
  },
  {
    icon: <TargetIcon />,
    title: 'Mission',
    body: 'Our mission is to build an inclusive future where marginalized and special needs individuals have equal access to tech skills and opportunities. We aim to break barriers, promote inclusivity, and empower everyone to thrive in the global tech economy through accessibility and policy advocacy.',
  },
  {
    icon: <RocketIcon />,
    title: 'Objectives',
    body: 'By 2030, we aim to train 10,000+ marginalized individuals, onboard 5,000+ to our AI-powered platform, lead in inclusive edtech, influence policies in 20+ countries, and build hubs and partnerships for learning and jobs.',
  },
]

function Foundation() {
  return (
    <section className="foundation">
      <div className="foundation__inner">
        <header className="foundation__head">
          <h2 className="foundation__title">Our Foundation</h2>
          <p className="foundation__subtitle">
            Building sustainable impact through clear vision, focused mission,
            and measurable objectives
          </p>
        </header>

        <div className="foundation__grid">
          {cards.map((card) => (
            <article className="foundation-card" key={card.title}>
              <span className="foundation-card__icon">{card.icon}</span>
              <h3 className="foundation-card__title">{card.title}</h3>
              <p className="foundation-card__body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Foundation
