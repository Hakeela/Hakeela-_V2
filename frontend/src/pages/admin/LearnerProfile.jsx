import { Link, useParams } from "react-router-dom";
import DataTable from "../../components/AdminUI/DataTable.jsx";
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
      <h3 className="dash-section-title" style={{ margin: "8px 0 16px", fontSize: 18, color: "#1a1a1a" }}>Learning history</h3>
      <DataTable
        columns={[
          { key: "title", header: "Course", render: (x) => <span className="adm-user__name">{x.title}</span> },
          {
            key: "progress", header: "Progress", render: (x) => (
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 150 }}>
                <div className="dash-bar" style={{ maxWidth: 110 }}><i style={{ width: `${x.progress}%` }} /></div>
                <span style={{ fontSize: 13, color: "#8a8a8a" }}>{x.progress}%</span>
              </div>
            ),
          },
          { key: "status", header: "Status", render: (x) => <span className={`adm-badge ${x.status === "Completed" ? "adm-badge--green" : x.status === "Not Started" ? "adm-badge--gray" : "adm-badge--blue"}`}>{x.status}</span> },
          { key: "score", header: "Score", sortAccessor: (x) => x.score ?? -1, render: (x) => (x.score == null ? "—" : `${x.score}%`) },
        ]}
        rows={learner.courses}
        searchKeys={["title", "status"]}
        searchPlaceholder="Search courses"
        pageSize={8}
        minWidth={480}
      />
    </div>
  );
}

export default LearnerProfile;
