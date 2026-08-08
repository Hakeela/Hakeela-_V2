import { Link, useParams } from "react-router-dom";
import { learners, countryFromPhone, initials } from "./adminData.js";

const statusBadge = {
  Active: "adm-badge--green", Graduated: "adm-badge--blue",
  Suspended: "adm-badge--red", "At risk": "adm-badge--yellow",
};

function LearnerProfile() {
  const { id } = useParams();
  const learner = learners.find((l) => l.id === id);

  if (!learner) {
    return (
      <div className="dashpg">
        <p>Learner not found. <Link className="adm-link" to="/admin/learners">Back to learners</Link></p>
      </div>
    );
  }

  const c = countryFromPhone(learner.phone);
  const completed = learner.courses.filter((x) => x.status === "Completed").length;
  const avg = (() => {
    const scored = learner.courses.filter((x) => x.score != null);
    return scored.length ? Math.round(scored.reduce((s, x) => s + x.score, 0) / scored.length) + "%" : "—";
  })();

  const stats = [
    { value: learner.courses.length, label: "Enrolled Courses" },
    { value: completed, label: "Completed" },
    { value: avg, label: "Average Score" },
    { value: learner.joined, label: "Joined" },
  ];

  return (
    <div className="dashpg">
      <Link className="adm-link" to="/admin/learners" style={{ display: "inline-block", marginBottom: 16 }}>← Back to learners</Link>

      {/* Profile header */}
      <div className="dash-card lp-head">
        <span className="lp-head__avatar">{initials(learner.name)}</span>
        <div className="lp-head__main">
          <div className="lp-head__top">
            <h2 className="lp-head__name">{learner.name}</h2>
            <span className={`adm-badge ${statusBadge[learner.status] || "adm-badge--gray"}`}>{learner.status}</span>
          </div>
          <div className="lp-head__facts">
            <span><b>Email</b> {learner.email}</span>
            <span><b>Phone</b> {learner.phone}</span>
            <span><b>Gender</b> {learner.gender}</span>
            <span><b>Country</b> {c.flag} {c.country}</span>
            <span><b>ID</b> {learner.id}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-kpis" style={{ marginTop: 24 }}>
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning history */}
      <div className="dash-card">
        <div className="adm-card-head"><h3>Learning history</h3></div>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Course</th><th>Progress</th><th>Status</th><th>Score</th></tr>
            </thead>
            <tbody>
              {learner.courses.map((x) => (
                <tr key={x.title}>
                  <td className="adm-user__name">{x.title}</td>
                  <td style={{ minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="dash-bar" style={{ maxWidth: 110 }}><i style={{ width: `${x.progress}%` }} /></div>
                      <span style={{ fontSize: 13, color: "#8a8a8a" }}>{x.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`adm-badge ${x.status === "Completed" ? "adm-badge--green" : x.status === "Not Started" ? "adm-badge--gray" : "adm-badge--blue"}`}>{x.status}</span>
                  </td>
                  <td>{x.score == null ? "—" : `${x.score}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LearnerProfile;
