import { Link } from "react-router-dom";
import "./dashboard-pages.css";

const stats = [
  {
    value: "3",
    label: "Enrolled Courses",
    bg: "#eceafd",
    color: "#1a13d6",
    // exact Courses icon copied from the sidebar
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" />
      </svg>
    ),
  },
  {
    value: "14",
    label: "Completed Lessons",
    bg: "#e4f6ec",
    color: "#1e9e5a",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="8 12 11 15 16 9" />
      </svg>
    ),
  },
  {
    value: "24h",
    label: "Total Study Time",
    bg: "#f0eafd",
    color: "#7a3ff2",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    value: "85%",
    label: "Average Score",
    bg: "#fff4d6",
    color: "#c99700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M8.697 3.25h6.606c.18 0 .335 0 .475.017a2.25 2.25 0 0 1 1.958 1.983h.806c.212-.002.677-.006 1.061.251c.497.331.647.9.647 1.499c0 2.726-1.453 4.546-3.308 5.557c-1.035 1.884-2.947 3.193-4.942 3.193c-1.519 0-2.96-.822-3.997-1.959a7 7 0 0 1-.902-1.23C5.247 11.555 3.75 9.737 3.75 7c0-.6.15-1.168.646-1.499c.385-.257.85-.253 1.062-.251h.806l.003-.028a2.25 2.25 0 0 1 1.955-1.955c.14-.017.295-.017.475-.017M7.75 6v.003L7.74 9.5v.001c0 .721.206 1.458.563 2.133l.014.025c.215.402.484.78.795 1.12c.842.924 1.908 1.471 2.889 1.471c1.422 0 2.921-1.028 3.7-2.544a4.8 4.8 0 0 0 .54-2.206l-.002-.002l.012-3.761v-.001c0-.242-.002-.294-.006-.329a.75.75 0 0 0-.651-.651a4 4 0 0 0-.33-.006H8.737c-.243 0-.295.001-.33.006a.75.75 0 0 0-.651.651a4 4 0 0 0-.006.33zm9.998.75l-.009 2.75v.001m-.023.539c.638-.768 1.035-1.77 1.035-3.04c0-.118-.01-.196-.019-.245a3 3 0 0 0-.231-.005h-.753M6.26 9.982a5 5 0 0 1-.022-.482v-.002l.009-2.748H5.5c-.109 0-.178 0-.231.005A1.3 1.3 0 0 0 5.25 7c0 1.237.388 2.22 1.01 2.982M12 16.25a.75.75 0 0 1 .75.75v2.25H16a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1 0-1.5h3.25V17a.75.75 0 0 1 .75-.75" />
        <path fill="currentColor" d="M11.77 6.555a.25.25 0 0 1 .46 0l.505 1.212a.25.25 0 0 0 .21.153l1.309.105a.25.25 0 0 1 .143.439l-.997.854a.25.25 0 0 0-.08.248l.304 1.276a.25.25 0 0 1-.374.272l-1.12-.684a.25.25 0 0 0-.26 0l-1.12.684a.25.25 0 0 1-.374-.272l.305-1.276a.25.25 0 0 0-.08-.248l-.998-.854a.25.25 0 0 1 .143-.44l1.308-.104a.25.25 0 0 0 .211-.153z" />
      </svg>
    ),
  },
];

const courses = [
  {
    id: "data-science",
    img: "/gain-1.png",
    title: "Data Science",
    desc: "Introduction to Data analytics",
    lessons: "12 Lessons",
    time: "8h 30m",
    progress: 65,
  },
  {
    id: "changemaker",
    img: "/gain-2.png",
    title: "Everyone a Changemaker",
    desc: "Unlock skills, knowledge and insight on how to lead a change in your community.",
    lessons: "8 Lessons",
    time: "6h 15m",
    progress: 65,
  },
];

const iconProps = {
  viewBox: '0 0 24 24',
  width: 15,
  height: 15,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const MetaIcons = {
  lessons: (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" />
    </svg>
  ),
  clock: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  ),
  prog: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
}

function Courses() {
  return (
    <div className="dashpg">
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </span>
            <div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="courses-head">
        <h3 className="dash-section-title">Enrolled Courses</h3>
        <Link to="/dashboard/enroll" className="dash-btn dash-btn--solid">
          Enroll New Course →
        </Link>
      </div>

      <div className="course-grid">
        {courses.map((c) => (
          <article className="course-card" key={c.id}>
            <div className="course-card__media">
              <img src={c.img} alt="" />
              <span className="course-card__badge">{c.progress}% Complete</span>
            </div>
            <h4 className="course-card__title">{c.title}</h4>
            <p className="course-card__desc">{c.desc}</p>
            <div className="course-meta">
              <span className="course-meta__item course-meta__item--yellow">
                {MetaIcons.lessons} {c.lessons}
              </span>
              <span className="course-meta__item course-meta__item--yellow">
                {MetaIcons.clock} {c.time}
              </span>
              <span className="course-meta__item course-meta__item--blue">
                {MetaIcons.prog} In Progress
              </span>
            </div>
            <div className="dash-bar">
              <i style={{ width: `${c.progress}%` }} />
            </div>
            <Link
              to={`/dashboard/courses/${c.id}`}
              className="dash-btn dash-btn--outline course-card__btn"
            >
              Continue Learning
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Courses;
