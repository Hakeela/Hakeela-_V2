import { useState } from 'react'
import './dashboard-pages.css'

/* ---- shared meta icons (match the enrolled course detail page) ---- */
const sp = { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" />
  </svg>
)
const ClockIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>)
const CheckIcon = () => (<svg {...sp}><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></svg>)
const ProgIcon = () => (
  <svg {...sp}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const BangBangIcon = () => (
  <svg {...sp}>
    <line x1="9" y1="5" x2="9" y2="13" />
    <line x1="9" y1="17.5" x2="9" y2="17.5" />
    <line x1="15" y1="5" x2="15" y2="13" />
    <line x1="15" y1="17.5" x2="15" y2="17.5" />
  </svg>
)

const statusIcon = (status) =>
  status === 'Completed' ? <CheckIcon /> : status === 'In Progress' ? <ProgIcon /> : <BangBangIcon />
const statusClass = (status) =>
  status === 'Completed' ? 'cl-meta--green' : 'cl-meta--blue'

// Pre-enrollment view: the user hasn't started any module yet
const modules = [
  {
    id: 1,
    name: 'Module 1: Introduction to Data Science',
    lessons: '4 lessons',
    time: '2h 30m',
    status: 'Not Started',
    items: [
      { title: 'What is Data Science?', dur: '25 min' },
      { title: 'Data Science Tools Overview', dur: '30 min' },
      { title: 'Setting Up Your Environment', dur: '45 min' },
      { title: 'First Data Analysis Project', dur: '50 min' },
    ],
  },
  { id: 2, name: 'Module 2: Python for Data Science', lessons: '6 lessons', time: '3h 45m', status: 'Not Started', items: [] },
  { id: 3, name: 'Module 3: Data Visualization', lessons: '5 lessons', time: '2h 20m', status: 'Not Started', items: [] },
]

function CourseInfo() {
  const [open, setOpen] = useState(1)

  return (
    <div className="dashpg">
      <div className="cl__banner">
        <img src="/gain-1.png" alt="" />
      </div>

      <div className="cl__head">
        <div>
          <h2 className="cl__title">Data Science</h2>
          <p className="cl__sub">Introduction to Data analytics</p>
        </div>
        <div className="ci__buy">
          <span className="ci__price">₦5,000</span>
          <button className="dash-btn dash-btn--solid">Buy Course</button>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 28 }}>
        <h3 className="cl-modules__title">Course Modules</h3>

        {modules.map((m) => (
          <div className="cl-mod" key={m.id}>
            <button className="cl-mod__head" onClick={() => setOpen(open === m.id ? 0 : m.id)}>
              <span className="cl-mod__badge cl-mod__badge--gray">{m.id}</span>
              <span className="cl-mod__name">{m.name}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === m.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="cl-mod__meta">
              <span className="cl-meta--yellow"><BookIcon /> {m.lessons}</span>
              <span className="cl-meta--yellow"><ClockIcon /> {m.time}</span>
              <span className={statusClass(m.status)}>{statusIcon(m.status)} {m.status}</span>
            </div>

            {open === m.id && m.items.length > 0 && (
              <ul className="cl-lessons">
                {m.items.map((it) => (
                  <li className="cl-lesson ci-lesson" key={it.title}>
                    <span className="ci-lesson__chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
                    </span>
                    {it.title}
                    <span className="cl-lesson__dur">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                      {it.dur}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseInfo
