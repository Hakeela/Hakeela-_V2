import CountUp from 'react-countup'

const stats = [
  { to: 300, suffix: '', label: 'Special needs Trained' },
  { to: 4, suffix: '', label: 'African countries' },
  { to: 150, suffix: '+', label: 'Internship placements' },
]

const CapIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3zM5 13.18V16c0 1.66 3.13 3 7 3s7-1.34 7-3v-2.82l-7 3.18-7-3.18z" />
  </svg>
)

const programs = [
  {
    title: 'Enrollment Fee',
    desc: 'Enrollment fee is N5,000 for Nigerians, and $3 for non-Nigerians.',
    pills: ['Nigerians: N5,000', 'Non-Nigerians: $3'],
  },
  {
    title: 'Fee and Scholarship',
    desc: 'Fee is N15k a month for Nigerians, and $10 a month for non-nigerians. A session is for 3 months. Full tuition covered by Hakeela fund.',
    pills: ['Nigerians: N15,000/month', 'Non-Nigerians: $10/month', '3-Month Session', 'Scholarship Available'],
  },
]

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title hero__title--1">Learn. Build.</h1>
        <h1 className="hero__title hero__title--2">
          Lead{' '}
          <span className="hero__ul">
            Africa.
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M5 14 Q100 2 195 10" stroke="#ffc21a" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="hero__sub">
          HakVersity is Hakeela&rsquo;s hybrid tech university and innovation hub,
          built for the next generation of African tech builders, problem-solvers,
          and changemakers.
        </p>

        <div className="hero__ctas">
          <a href="#apply" className="btn btn--solid">
            Apply for Admission
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
          <a href="#programs" className="btn btn--outline">Explore Programs</a>
        </div>

        <div className="hero__stats">
          {stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <b>
                <CountUp end={s.to} suffix={s.suffix} duration={30} useEasing={false} enableScrollSpy scrollSpyOnce />
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hero__cards">
          {programs.map((p) => (
            <article className="pcard" key={p.title}>
              <span className="pcard__tag"><CapIcon /> AVAILABLE</span>
              <h3 className="pcard__title">{p.title}</h3>
              <p className="pcard__desc">{p.desc}</p>
              <div className="pcard__pills">
                {p.pills.map((pill) => (
                  <span className={`pill ${pill === 'Scholarship Available' ? 'pill--gold' : ''}`} key={pill}>{pill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
