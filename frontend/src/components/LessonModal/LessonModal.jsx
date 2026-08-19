import { useEffect, useState } from 'react'
import { submitAssessment } from '../../lib/data.js'
import { lessonTypeLabel, isPdfUrl } from '../../lib/lessonTypes.js'
import './LessonModal.css'

const parseOptions = (opts) =>
  (Array.isArray(opts) ? opts : String(opts || '').split(',')).map((o) => o.trim()).filter(Boolean)

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
)

/** Renders the lesson's main content according to its type. */
function LessonMedia({ lesson }) {
  const type = lesson.type || 'video'
  const url = lesson.content_url || lesson.video_url || ''

  if (type === 'text') {
    return <div className="lm-media-text">{lesson.transcript || 'No content for this lesson yet.'}</div>
  }

  if (!url) {
    return <div className="lm-media-empty">No {lessonTypeLabel(type).toLowerCase()} for this lesson yet.</div>
  }

  switch (type) {
    case 'video':
      return <video src={url} controls className="lm-media-fill" style={{ background: '#000' }} />
    case 'audio':
      return <div className="lm-media-audio"><audio src={url} controls /></div>
    case 'image':
      return <img src={url} alt={lesson.title} className="lm-media-fill" style={{ objectFit: 'contain', background: '#000' }} />
    case 'pdf':
      return <iframe src={url} title={lesson.title} className="lm-media-fill" />
    case 'slides':
    case 'document':
    default:
      // PDFs (incl. PDF-exported slides/docs) embed; other formats offer a download.
      if (isPdfUrl(url)) return <iframe src={url} title={lesson.title} className="lm-media-fill" />
      return (
        <div className="lm-file-card">
          <DownloadIcon />
          <p className="lm-file-card__name">{lessonTypeLabel(type)} attachment</p>
          <a className="dash-btn dash-btn--solid" href={url} target="_blank" rel="noopener noreferrer">Open / Download</a>
        </div>
      )
  }
}

function LessonModal({ open, courseTitle = 'Course', lesson, hasPrev, hasNext, onPrev, onNext, onClose, onCompleted, userId }) {
  const [tab, setTab] = useState('transcript')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  const questions = lesson?.assessment?.questions || []

  // Reset per-lesson state whenever the lesson changes
  useEffect(() => {
    setTab('transcript'); setAnswers({}); setSubmitted(false); setScore(null)
  }, [lesson?.id])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !lesson) return null

  const submitQuiz = async () => {
    const correct = questions.filter((q, i) => answers[i] === q.answer).length
    const pct = questions.length ? Math.round((correct / questions.length) * 100) : 100
    setScore(pct)
    setSubmitted(true)
    if (lesson.assessment) await submitAssessment(userId, lesson.assessment.id, answers, pct)
    onCompleted?.(lesson.id)
  }

  const completeLesson = () => onCompleted?.(lesson.id)

  return (
    <div className="lm-overlay" onClick={onClose}>
      <div className="lm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="lm__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        <div className="lm__head">
          <div>
            <h3 className="lm__title">{courseTitle}</h3>
            <p className="lm__sub">{lesson.title}{lesson.done && <span className="lm-tag lm-tag--ok" style={{ marginLeft: 8 }}>Completed</span>}</p>
          </div>
          <div className="lm__nav">
            <button className="dash-btn dash-btn--outline" onClick={onPrev} disabled={!hasPrev}>Prev Lesson</button>
            <button className="dash-btn dash-btn--outline" onClick={onNext} disabled={!hasNext}>Next Lesson</button>
          </div>
        </div>

        <div className={`lm__video lm__video--${lesson.type || 'video'}`}>
          <LessonMedia lesson={lesson} />
        </div>

        <div className="lm__tabs">
          {['transcript', 'assessments', 'opinions'].map((t) => (
            <button key={t} className={`lm__tab ${tab === t ? 'is-active' : ''}`} onClick={() => setTab(t)}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="lm__panel">
          {tab === 'transcript' && (
            <>
              <h4 className="lm__panel-title">{lesson.title}</h4>
              <p className="lm__text">{lesson.transcript || 'No transcript for this lesson yet.'}</p>
              {!lesson.done && (
                <button className="dash-btn dash-btn--solid lm-submit" onClick={completeLesson}>Mark lesson complete</button>
              )}
            </>
          )}

          {tab === 'assessments' && (
            questions.length === 0 ? (
              <p className="lm__text">No assessment for this lesson.</p>
            ) : (
              <>
                <h4 className="lm__panel-title">{lesson.assessment.title}</h4>
                {submitted && <p className="lm__text"><strong>Your score: {score}%</strong></p>}
                {questions.map((q, qi) => (
                  <div key={qi}>
                    <p className="lm-q">{qi + 1}. {q.question}</p>
                    <div className="lm-opts">
                      {parseOptions(q.options).map((opt) => {
                        const chosen = answers[qi] === opt
                        const isCorrect = submitted && opt === q.answer
                        const isWrong = submitted && chosen && opt !== q.answer
                        return (
                          <label className="lm-opt" key={opt}>
                            <input type="radio" name={`q${qi}`} checked={chosen} disabled={submitted}
                              onChange={() => setAnswers((a) => ({ ...a, [qi]: opt }))} />
                            {opt}
                            {isCorrect && <span className="lm-tag lm-tag--ok">Correct</span>}
                            {isWrong && <span className="lm-tag lm-tag--bad">Wrong</span>}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
                {submitted ? (
                  <button className="dash-btn dash-btn--solid lm-submit" onClick={() => { setSubmitted(false); setAnswers({}); setScore(null) }}>Retake</button>
                ) : (
                  <button className="dash-btn dash-btn--solid lm-submit" disabled={Object.keys(answers).length < questions.length} onClick={submitQuiz}>Submit</button>
                )}
              </>
            )
          )}

          {tab === 'opinions' && (
            <div className="lm__opinions">
              <p className="lm__text">Share your thoughts on this lesson.</p>
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
