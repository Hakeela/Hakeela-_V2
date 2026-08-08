import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyCourses, getStats } from "../../lib/data.js";
import "./dashboard-pages.css";

const iconProps = { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const BookIcon = (p) => (<svg xmlns="http://www.w3.org/2000/svg" width={p.w || 22} height={p.w || 22} viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" /></svg>);
const CheckIcon = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></svg>);
const ClockIcon = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>);
const StarIcon = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17.3 5.5 21 7 14 2 9.3 9 9" /></svg>);

const MetaIcons = {
  lessons: <BookIcon w={15} />,
  clock: <svg {...iconProps}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>,
  prog: <svg {...iconProps}><circle cx="12" cy="12" r="9" /><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg>,
};

function Courses() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getStats(user?.id), getMyCourses(user?.id)])
      .then(([s, c]) => { if (active) { setStats(s); setCourses(c); } })
      .catch(() => { if (active) { setStats({ enrolled: 0, completedLessons: 0, studyTime: "—", avgScore: "—" }); setCourses([]); } })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [user?.id]);

  const statCards = stats ? [
    { value: stats.enrolled, label: "Enrolled Courses", bg: "#eceafd", color: "#1a13d6", icon: <BookIcon /> },
    { value: stats.completedLessons, label: "Completed Lessons", bg: "#e4f6ec", color: "#1e9e5a", icon: <CheckIcon /> },
    { value: stats.studyTime, label: "Total Study Time", bg: "#f0eafd", color: "#7a3ff2", icon: <ClockIcon /> },
    { value: stats.avgScore, label: "Average Score", bg: "#fff4d6", color: "#c99700", icon: <StarIcon /> },
  ] : [];

  if (loading) return <div className="dashpg"><p style={{ color: "#8a8a8a" }}>Loading your courses…</p></div>;

  return (
    <div className="dashpg">
      <div className="stat-grid">
        {statCards.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__icon" style={{ background: s.bg, color: s.color }}>{s.icon}</span>
            <div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="courses-head">
        <h3 className="dash-section-title">Enrolled Courses</h3>
        <Link to="/dashboard/enroll" className="dash-btn dash-btn--solid">Enroll New Course →</Link>
      </div>

      {courses.length === 0 ? (
        <p style={{ color: "#8a8a8a" }}>You haven&apos;t enrolled in any courses yet. <Link className="pf__link" to="/dashboard/enroll">Browse the catalog →</Link></p>
      ) : (
        <div className="course-grid">
          {courses.map((c) => (
            <article className="course-card" key={c.id}>
              <div className="course-card__media">
                <img src={c.thumbnail_url || "/gain-1.png"} alt="" />
                <span className="course-card__badge">{c.progress}% Complete</span>
              </div>
              <h4 className="course-card__title">{c.title}</h4>
              <p className="course-card__desc">{c.description}</p>
              <div className="course-meta">
                {c.lessons ? <span className="course-meta__item course-meta__item--yellow">{MetaIcons.lessons} {c.lessons} Lessons</span> : null}
                {c.duration ? <span className="course-meta__item course-meta__item--yellow">{MetaIcons.clock} {c.duration}</span> : null}
                <span className="course-meta__item course-meta__item--blue">{MetaIcons.prog} {c.progress >= 100 ? "Completed" : "In Progress"}</span>
              </div>
              <div className="dash-bar"><i style={{ width: `${c.progress}%` }} /></div>
              <Link to={`/dashboard/courses/${c.id}`} className="dash-btn dash-btn--outline course-card__btn">Continue Learning</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
