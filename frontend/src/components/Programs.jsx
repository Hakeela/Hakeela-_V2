const programs = [
  {
    icon: '/icons/brush.png',
    cat: 'Design',
    title: 'Product & UI/UX Design',
    desc: 'Human-centered design for Africa. Learn Figma, design systems, user research, and build a portfolio of real products.',
    meta: '4 weeks – 8 weeks',
  },
  {
    icon: '/icons/brush.png',
    cat: 'Design',
    title: 'Graphics Design and Branding',
    desc: 'Human-centered design for Africa. Learn Figma, design systems, user research, and build a portfolio of real products.',
    meta: '4 weeks – 8 weeks',
  },
  {
    icon: '/icons/chart-analysis.png',
    cat: 'Data',
    title: 'Data Science and Analytics',
    desc: 'Data analysis, machine learning basics, and AI tools. Designed for African contexts and real-world datasets.',
    meta: '4 weeks – 8 weeks',
  },
  {
    icon: '/icons/source-code.png',
    cat: 'AI',
    title: 'AI Automation and Engineering',
    desc: 'AI Automation, engineering, prompt engineering, vibe coding.',
    meta: '4 weeks – 8 weeks',
  },
  {
    icon: '/icons/source-code.png',
    cat: 'Front-End Engineering and Website',
    title: 'Front-End Engineering, Wordpress, Shopify.',
    desc: 'Front end engineering, wordpress, shopify.',
    meta: '4 weeks – 8 weeks',
  },
]
function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="container">
        <p className="sec-label">What We Offer</p>
        <h2 className="sec-title">Programs that build careers.</h2>

        <div className="programs__grid">
          {programs.map((p, i) => (
            <article className="prog" key={`${p.title}-${i}`}>
              <span className="prog__icon"><img src={p.icon} alt="" /></span>
              <p className="prog__cat">{p.cat}</p>
              <h3 className="prog__title">{p.title}</h3>
              <p className="prog__desc">{p.desc}</p>
              <div className="prog__meta">{p.meta}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
