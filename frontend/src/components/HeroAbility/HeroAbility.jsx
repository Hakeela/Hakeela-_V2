import './HeroAbility.css'

const stats = [
  { value: '300', label: 'Special needs Trained' },
  { value: '4', label: 'African countries' },
  { value: '70 hrs', label: 'of learning' },
]

function HeroAbility() {
  return (
    <section className="habhero">
      <div className="habhero__inner">
        <div className="habhero__text">
          <svg className="habhero__accent" viewBox="0 0 160 16" fill="none" aria-hidden="true">
            <path d="M4 12 Q80 2 156 8" stroke="#ffc21a" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <h1 className="habhero__title">
            &ldquo;Welcome to a world of limitless{' '}
            <span className="habhero__word">
              possibi
              <span className="habhero__ul">
                lities
                <svg viewBox="0 0 100 16" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M3 5 Q50 15 97 5" stroke="#ffc21a" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </span>
            &rdquo;
          </h1>

          <div className="habhero__stats">
            {stats.map((s) => (
              <div className="habhero__stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="habhero__media">
          <img src="/hab-hero.png" alt="A Hakeela mentor and a young learner smiling together" />
        </div>
      </div>
    </section>
  )
}

export default HeroAbility
