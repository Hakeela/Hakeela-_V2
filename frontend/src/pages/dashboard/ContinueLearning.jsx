import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import LessonModal from '../../components/LessonModal/LessonModal.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { getCourseDetail, markLessonComplete, ensureCertificate } from '../../lib/data.js'
import './dashboard-pages.css'

const sp = { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const BookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" /></svg>)
const ClockIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>)
const ProgIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg>)
const CheckIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></svg>)
const BangBangIcon = () => (<svg {...sp}><line x1="9" y1="5" x2="9" y2="13" /><line x1="9" y1="17.5" x2="9" y2="17.5" /><line x1="15" y1="5" x2="15" y2="13" /><line x1="15" y1="17.5" x2="15" y2="17.5" /></svg>)

const statusIcon = (s) => (s === 'Completed' ? <CheckIcon /> : s === 'Not Started' ? <BangBangIcon /> : <ProgIcon />)
const statusClass = (s) => (s === 'Completed' ? 'cl-meta--green' : 'cl-meta--blue')

function ContinueLearning() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)      // open module id
  const [activeIdx, setActiveIdx] = useState(null) // index into flat lessons

  useEffect(() => {
    let active = true
    getCourseDetail(id, user?.id)
      .then((c) => { if (active) { setCourse(c); setOpen(c?.modules?.[0]?.id ?? null) } })
      .catch(() => active && setCourse(null))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [id, user?.id])

  const flat = useMemo(() => (course ? course.modules.flatMap((m) => m.lessons) : []), [course])

  const markDone = (lessonId) => {
    setCourse((c) => {
      if (!c) return c
      const modules = c.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, done: true } : l)),
      })).map((m) => {
        const dc = m.lessons.filter((l) => l.done).length
        return { ...m, status: m.lessons.length && dc === m.lessons.length ? 'Completed' : dc > 0 ? 'In Progress' : 'Not Started' }
      })
      const completed = modules.flatMap((m) => m.lessons).filter((l) => l.done).length
      const total = modules.flatMap((m) => m.lessons).length
      const progress = total ? Math.round((completed / total) * 100) : 0
      if (progress === 100) ensureCertificate(user?.id, id) // course finished → queue a certificate
      return { ...c, modules, completedLessons: completed, progress }
    })
    markLessonComplete(user?.id, lessonId, true)
  }

  if (loading) return <div className="dashpg"><p style={{ color: '#8a8a8a' }}>Loading course…</p></div>
  if (!course) return <div className="dashpg"><p>Course not found.</p></div>

  const overall = course.progress >= 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'

  return (
    <div className="dashpg">
      <div className="cl__banner"><img src={course.thumbnail_url || '/gain-1.png'} alt="" /></div>

      <div className="cl__head">
        <div>
          <h2 className="cl__title">{course.title}</h2>
          <p className="cl__sub">{course.description}</p>
        </div>
        <div className="cl__meta">
          <span className="cl-meta--yellow"><BookIcon /> {course.totalLessons} Lessons</span>
          <span className={statusClass(overall)}>{statusIcon(overall)} {overall}</span>
          {flat[0] && <button className="dash-btn dash-btn--outline" onClick={() => setActiveIdx(Math.max(0, flat.findIndex((l) => !l.done)))}>Continue Learning</button>}
        </div>
      </div>

      <div className="cl__progress"><div className="dash-bar"><i style={{ width: `${course.progress}%` }} /></div></div>

      <div className="dash-card">
        <h3 className="cl-modules__title">Course Modules</h3>

        {course.modules.map((m, mi) => {
          const completed = m.status === 'Completed'
          const badgeKind = completed ? 'done' : 'num'
          return (
            <div className="cl-mod" key={m.id}>
              <button className="cl-mod__head" onClick={() => setOpen(open === m.id ? null : m.id)}>
                <span className={`cl-mod__badge cl-mod__badge--${badgeKind}`}>{completed ? <CheckIcon /> : mi + 1}</span>
                <span className="cl-mod__name">{m.name}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === m.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="cl-mod__meta">
                <span className="cl-meta--yellow"><BookIcon /> {m.lessonsCount} lessons</span>
                <span className={statusClass(m.status)}>{statusIcon(m.status)} {m.status}</span>
              </div>

              {open === m.id && m.lessons.length > 0 && (
                <ul className="cl-lessons">
                  {m.lessons.map((it, i) => (
                    <li className="cl-lesson" key={it.id} onClick={() => setActiveIdx(flat.findIndex((l) => l.id === it.id))}>
                      {it.done ? <span className="cl-lesson__check"><CheckIcon /></span> : <span className="cl-lesson__num">{i + 1}</span>}
                      {it.title}
                      {it.duration && (
                        <span className="cl-lesson__dur">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                          {it.duration}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      <LessonModal
        open={activeIdx != null}
        courseTitle={course.title}
        lesson={activeIdx != null ? flat[activeIdx] : null}
        hasPrev={activeIdx > 0}
        hasNext={activeIdx != null && activeIdx < flat.length - 1}
        onPrev={() => setActiveIdx((i) => Math.max(0, i - 1))}
        onNext={() => setActiveIdx((i) => Math.min(flat.length - 1, i + 1))}
        onClose={() => setActiveIdx(null)}
        onCompleted={markDone}
        userId={user?.id}
      />
    </div>
  )
}

export default ContinueLearning
