import CTA from '../components/CTA/CTA.jsx'
import './About.css'

const Chevron = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// What We Do — feature cards
const AiIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
)
const HandsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z" />
  </svg>
)
const AccessIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="4.5" r="1.6" />
    <path d="M20 8h-5.5L12 21l-2.5-8H4" />
  </svg>
)
const FundIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10 12 4 2 10l10 6 10-6Z" />
    <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
  </svg>
)

const whatWeDo = [
  {
    icon: <AiIcon />,
    title: 'AI powered accessible learning and communication platform',
    body: 'Leveraging artificial intelligence to create inclusive learning experiences for everyone.',
  },
  {
    icon: <HandsIcon />,
    title: 'Hands on learning experiences and live internships',
    body: 'Practical, real-world experience through live projects and internship opportunities.',
  },
  {
    icon: <AccessIcon />,
    title: 'Specialised curriculums and training for people of all backgrounds and abilities',
    body: 'Customized learning paths designed for diverse backgrounds and accessibility needs.',
  },
  {
    icon: <FundIcon />,
    title: 'Educational funding & Scholarships for underserved communities',
    body: 'Financial support and educational opportunities for those who need it most.',
  },
]

// Stories — static placeholder posts
const stories = [
  { image: '/init-1.jpg' },
  { image: '/init-2.png' },
]
const storyExcerpt =
  'Learn how Hakeela started, why it started and the impact the Edtech organization has been making in regions across Africa, and why Hakeela is the literally the Future.'

// Team
const team = [
  { name: 'Victor Eyo', role: 'Founder/CEO Hakeela', img: '/about-victor.png' },
  { name: 'Comfort Alphonsus', role: 'Founder/CEO Hakeela', img: '/about-comfort.png' },
  { name: 'Laurenz', role: 'Founder/CEO Hakeela', img: '/about-laurenz.png' },
  { name: 'Kavita', role: 'Founder/CEO Hakeela', img: '/about-kavita.png' },
]

const Social = () => (
  <div className="about-member__socials">
    <a href="#" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" /></svg>
    </a>
    <a href="#" aria-label="Instagram">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.12 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" /></svg>
    </a>
    <a href="#" aria-label="X">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z" /></svg>
    </a>
  </div>
)

function About() {
  return (
    <main className="about">
      {/* Hero banner */}
      <section className="about-hero">
        <div className="about-hero__panel">
          <span className="about-hero__label">About Us</span>
          <h1 className="about-hero__title">
            We believe that every person should have access to tech skills,
            irrespective of their background.
          </h1>
          <a href="#" className="about-hero__btn">
            Join our Community <Chevron />
          </a>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-who">
        <div className="about-who__inner">
          <div className="about-who__media">
            <img src="/about-who.png" alt="Hakeela students learning at a computer" />
          </div>
          <div className="about-who__text">
            <h2 className="about-who__title">Who We Are</h2>
            <p className="about-who__body">
              Hakeela is a social enterprise designed to train and equip young
              Africans from marginalized backgrounds and people living with
              disabilities with tech skills.
            </p>
            <ul className="about-check">
              <li>
                <span className="about-check__icon"><Check /></span>
                We use AI to bridge communication and edtech learning gap for
                special needs people.
              </li>
              <li>
                <span className="about-check__icon"><Check /></span>
                We empower marginalized individuals in tech skills, accessible
                tech education, and tech job opportunities.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-do">
        <div className="about-do__inner">
          <header className="about-do__head">
            <h2 className="about-do__title">What We Do</h2>
            <p className="about-do__subtitle">
              Building the Future of Tech Inclusion one community at a time
            </p>
            <p className="about-do__desc">
              Hakeela is a community for marginalized and people living with
              disabilities learning to be part of the tech ecosystem. We exist to
              ensure marginalized Africans and people living with disabilities can
              independently and confidently learn tech skills, land tech roles,
              launch successful tech businesses, and take their rightful place in
              the tech industry.
            </p>
          </header>

          <div className="about-do__grid">
            {whatWeDo.map((card) => (
              <article className="about-do-card" key={card.title}>
                <span className="about-do-card__icon">{card.icon}</span>
                <h3 className="about-do-card__title">{card.title}</h3>
                <p className="about-do-card__body">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="about-stories">
        <div className="about-stories__inner">
          <h2 className="about-stories__title">Stories that are changing the world</h2>
          <div className="about-stories__grid">
            {stories.map((story, i) => (
              <article className="story-card" key={i}>
                <div className="story-card__img">
                  <img src={story.image} alt="" />
                </div>
                <p className="story-card__body">{storyExcerpt}</p>
                <a href="#" className="story-card__btn">Read More</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner (reused) */}
      <CTA
        title="Ready to get started? Kickstart your tech journey today."
        buttonLabel="Explore"
      />

      {/* Meet the Individuals */}
      <section className="about-team">
        <div className="about-team__inner">
          <h2 className="about-team__title">Meet the Individuals, changing the world</h2>
          <div className="about-team__grid">
            {team.map((member) => (
              <article className="about-member" key={member.name}>
                <div className="about-member__photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <h3 className="about-member__name">{member.name}</h3>
                <p className="about-member__role">{member.role}</p>
                <Social />
              </article>
            ))}
          </div>
          <div className="about-team__more">
            <a href="#" className="about-team__load">Load More</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
