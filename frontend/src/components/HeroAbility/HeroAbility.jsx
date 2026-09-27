import './HeroAbility.css'

const stats = [
  { value: '300', label: 'PWDs Trained' },
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
            Building a world where persons living with disabilities can learn tech skills, and be relevant in the socio-economic technological space
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
