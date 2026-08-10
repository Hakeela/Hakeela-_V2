import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getCourseDetail, enroll } from '../../lib/data.js'
import './dashboard-pages.css'

const sp = { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const BookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" /></svg>)
const CheckIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></svg>)
const ProgIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg>)

const statusIcon = (s) => (s === 'Completed' ? <CheckIcon /> : <ProgIcon />)
const statusClass = (s) => (s === 'Completed' ? 'cl-meta--green' : 'cl-meta--blue')
const naira = (n) => (n === 0 ? 'Free' : '₦' + Number(n || 0).toLocaleString('en-NG'))

function CourseInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    getCourseDetail(id, user?.id)
      .then((c) => { if (active) { setCourse(c); setOpen(c?.modules?.[0]?.id ?? null) } })
      .catch(() => active && setCourse(null))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [id, user?.id])

  const handleEnroll = async () => {
    if (course?.isEnrolled) return navigate(`/dashboard/courses/${id}`)
    setBusy(true)
    const { error } = await enroll(user?.id, id)
    setBusy(false)
    if (!error) navigate(`/dashboard/courses/${id}`)
  }

  if (loading) return <div className="dashpg"><p style={{ color: '#8a8a8a' }}>Loading…</p></div>
  if (!course) return <div className="dashpg"><p>Course not found.</p></div>

  return (
    <div className="dashpg">
      <div className="cl__banner"><img src={course.thumbnail_url || '/gain-1.png'} alt="" /></div>

      <div className="cl__head">
        <div>
          <h2 className="cl__title">{course.title}</h2>
          <p className="cl__sub">{course.description}</p>
        </div>
        <div className="ci__buy">
          <span className="ci__price">{naira(course.price)}</span>
          <button className="dash-btn dash-btn--solid" onClick={handleEnroll} disabled={busy}>
            {course.isEnrolled ? 'Go to course' : busy ? 'Enrolling…' : 'Enroll'}
          </button>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 28 }}>
        <h3 className="cl-modules__title">Course Modules</h3>

        {course.modules.map((m, mi) => {
          const completed = m.status === 'Completed'
          return (
            <div className="cl-mod" key={m.id}>
              <button className="cl-mod__head" onClick={() => setOpen(open === m.id ? null : m.id)}>
                <span className={`cl-mod__badge cl-mod__badge--${completed ? 'done' : 'num'}`}>{completed ? <CheckIcon /> : mi + 1}</span>
                <span className="cl-mod__name">{m.name}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === m.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="cl-mod__meta">
                <span className="cl-meta--yellow"><BookIcon /> {m.lessonsCount} lessons</span>
                <span className={statusClass(m.status)}>{statusIcon(m.status)} {m.status}</span>
              </div>

              {open === m.id && m.lessons.length > 0 && (
                <ul className="cl-lessons">
                  {m.lessons.map((it) => (
                    <li className="cl-lesson ci-lesson" key={it.id}>
                      <span className="ci-lesson__chevron">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                      </span>
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
    </div>
  )
}

export default CourseInfo
