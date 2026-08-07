import { useEffect, useState } from 'react'
import './LessonModal.css'

const q1 = [
  { label: 'Tableau', correct: false },
  { label: 'Python', correct: true },
  { label: 'Excel', correct: false },
  { label: 'Power BI', correct: false },
]
const q2 = [
  { label: 'True', correct: true },
  { label: 'False', correct: false },
]

function LessonModal({ open, lessonTitle = 'Data Science Tools Overview', onClose }) {
  const [tab, setTab] = useState('transcript')
  const [a1, setA1] = useState('Python')
  const [a2, setA2] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const resultLabel = (opt, selected) => {
    if (!submitted) return null
    if (opt.correct) return <span className="lm-tag lm-tag--ok">Correct</span>
    if (selected === opt.label && !opt.correct)
      return <span className="lm-tag lm-tag--bad">Wrong</span>
    return null
  }

  return (
    <div className="lm-overlay" onClick={onClose}>
      <div className="lm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="lm__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="lm__head">
          <div>
            <h3 className="lm__title">Data Science</h3>
            <p className="lm__sub">{lessonTitle}</p>
          </div>
          <div className="lm__nav">
            <button className="dash-btn dash-btn--outline">Prev Lesson</button>
            <button className="dash-btn dash-btn--outline">Next Lesson</button>
          </div>
        </div>

        <div className="lm__video">
          <img src="/user-photo.png" alt="" />
          <span className="lm__play">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><polygon points="8 5 19 12 8 19 8 5"/></svg>
          </span>
        </div>

        <div className="lm__tabs">
          {['transcript', 'assessments', 'opinions'].map((t) => (
            <button
              key={t}
              className={`lm__tab ${tab === t ? 'is-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="lm__panel">
          {tab === 'transcript' && (
            <>
              <h4 className="lm__panel-title">Data Science Tools Overview</h4>
              <p className="lm__text">
                Data science tools are software, libraries, and platforms that help
                professionals process, analyze, and visualize data to extract
                insights and make informed decisions. These tools are categorized by
                their function, including programming languages like Python and R;
                data manipulation libraries such as NumPy and Pandas; machine
                learning frameworks like Scikit-learn, TensorFlow, and PyTorch; data
                visualization tools like Tableau and Power BI; and big data
                technologies like Apache Spark.
              </p>
              <h5 className="lm__text-h">Why Data Science Tools Are Important</h5>
              <ul className="lm__list">
                <li><strong>Informed Decision-Making:</strong> Tools provide data-driven insights to support strategic planning and better business decisions.</li>
                <li><strong>Automation &amp; Efficiency:</strong> They automate repetitive tasks, allowing data scientists to focus on more complex work.</li>
                <li><strong>Predictive Analytics:</strong> Machine learning tools enable businesses to forecast future trends, behaviors, and outcomes.</li>
                <li><strong>Problem Solving:</strong> They provide the means to apply statistical and computational methods to solve real-world problems.</li>
                <li><strong>Competitive Advantage:</strong> Organizations that effectively use data science tools gain a competitive edge.</li>
              </ul>
            </>
          )}

          {tab === 'assessments' && (
            <>
              <h4 className="lm__panel-title">Data Science Tools Assessment</h4>

              <p className="lm-q">1. Which of these is primarily a programming language used in data science?</p>
              <div className="lm-opts">
                {q1.map((opt) => (
                  <label className="lm-opt" key={opt.label}>
                    <input type="checkbox" checked={a1 === opt.label} disabled={submitted}
                      onChange={() => setA1(a1 === opt.label ? null : opt.label)} />
                    {opt.label}
                    {resultLabel(opt, a1)}
                  </label>
                ))}
              </div>

              <p className="lm-q">2. R is mostly used for statistical analysis and visualization.</p>
              <div className="lm-opts">
                {q2.map((opt) => (
                  <label className="lm-opt" key={opt.label}>
                    <input type="checkbox" checked={a2 === opt.label} disabled={submitted}
                      onChange={() => setA2(a2 === opt.label ? null : opt.label)} />
                    {opt.label}
                    {resultLabel(opt, a2)}
                  </label>
                ))}
              </div>

              {submitted ? (
                <button className="dash-btn dash-btn--solid lm-submit" onClick={() => { setSubmitted(false); setA2(null) }}>Retake</button>
              ) : (
                <button className="dash-btn dash-btn--solid lm-submit" onClick={() => setSubmitted(true)}>Submit</button>
              )}
            </>
          )}

          {tab === 'opinions' && (
            <div className="lm__opinions">
              <p className="lm__text">No opinions yet — be the first to share your thoughts on this lesson.</p>
              <textarea className="lm__opinion-box" placeholder="Write a comment..." rows={4} />
              <button className="dash-btn dash-btn--solid lm-submit">Post</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonModal
