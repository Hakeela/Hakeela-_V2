import { assessments } from "./adminData.js";

const badge = { "Auto-graded": "adm-badge--green", "Needs grading": "adm-badge--yellow" };

function Assessments() {
  const needsGrading = assessments.filter((a) => a.status === "Needs grading").length;

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Assessments &amp; Submissions</h2>
          <p className="adm-page-head__sub">
            {needsGrading} submission{needsGrading === 1 ? "" : "s"} waiting to be graded.
          </p>
        </div>
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Learner</th><th>Course</th><th>Module</th><th>Type</th><th>Score</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {assessments.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="adm-user">
                      <span className="adm-user__ph">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className="adm-user__name">{a.name}</div>
                    </div>
                  </td>
                  <td>{a.course}</td>
                  <td>{a.module}</td>
                  <td>{a.type}</td>
                  <td>{a.score == null ? "—" : `${a.score}%`}</td>
                  <td><span className={`adm-badge ${badge[a.status]}`}>{a.status}</span></td>
                  <td>
                    <button className={`adm-btn-sm ${a.status === "Needs grading" ? "adm-btn-sm--primary" : ""}`}>
                      {a.status === "Needs grading" ? "Grade" : "Review"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Assessments;
