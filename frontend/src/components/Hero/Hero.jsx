import { Link } from 'react-router-dom'
import './Hero.css'

const stats = [
  { value: '1000+', label: 'Students Trained' },
  { value: '65%', label: 'Job Placement' },
  { value: '8', label: 'Weeks Training' },
]

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">
            Gain In-<br></br>demand tech skills for{' '}
            <span className="hero__hl">
              free!
              <svg className="hero__hl-underline" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path d="M3 11 Q100 1 197 8" stroke="#ffc21a" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="hero__desc">
            Upskill yourself with our various tech programs designed for people of
            all backgrounds and abilities. Gain hands on experience and be ready to
            intern or start entry-level positions in 8 weeks.
          </p>
          <Link to="/signup" className="hero__cta">
            Get Started for free
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <div className="hero__stats">
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__media">
          <img src="/hero-collage.png" alt="Students learning tech skills across Product Design, Web Development and Data Analysis" />
        </div>
      </div>
    </section>
  )
}

export default Hero
