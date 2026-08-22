// 3 core programs (rendered as a 6-card grid to match the reference layout).
const core = [
  { icon: '/icons/source-code.png', cat: 'Engineering', title: 'Software Engineering', desc: 'Full-stack web and mobile development. From fundamentals to deploying live products. Mentorship-led and project-based.', meta: '6 – 12 months' },
  { icon: '/icons/brush.png', cat: 'Design', title: 'Product & UI/UX Design', desc: 'Human-centered design for Africa. Learn Figma, design systems, user research, and build a portfolio of real products.', meta: '6 – 12 months' },
  { icon: '/icons/chart-analysis.png', cat: 'Data', title: 'Data & AI Fundamentals', desc: 'Data analysis, machine learning basics, and AI tools. Designed for African contexts and real-world datasets.', meta: '6 – 12 months' },
]
const programs = [...core, ...core]

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
