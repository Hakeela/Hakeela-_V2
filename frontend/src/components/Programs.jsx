const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
)
const BrushIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 4 5.5 5.5M3 21s3-1 6-4l8.5-8.5-2-2L7 15c-3 3-4 6-4 6Z" /></svg>
)
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
)

// 3 core programs (rendered as a 6-card grid to match the reference layout).
const core = [
  { icon: <CodeIcon />, cat: 'Engineering', title: 'Software Engineering', desc: 'Full-stack web and mobile development. From fundamentals to deploying live products. Mentorship-led and project-based.', meta: '6 – 12 months' },
  { icon: <BrushIcon />, cat: 'Design', title: 'Product & UI/UX Design', desc: 'Human-centered design for Africa. Learn Figma, design systems, user research, and build a portfolio of real products.', meta: '6 – 12 months' },
  { icon: <ChartIcon />, cat: 'Data', title: 'Data & AI Fundamentals', desc: 'Data analysis, machine learning basics, and AI tools. Designed for African contexts and real-world datasets.', meta: '6 – 12 months' },
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
              <span className="prog__icon">{p.icon}</span>
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
