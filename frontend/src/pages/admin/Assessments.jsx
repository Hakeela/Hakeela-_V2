import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import { assessments, initials } from "./adminData.js";

const badge = { "Auto-graded": "adm-badge--green", "Needs grading": "adm-badge--yellow" };

function Assessments() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("All");

  const needsGrading = assessments.filter((a) => a.status === "Needs grading").length;
  const view = assessments.filter((a) => status === "All" || a.status === status);

  const columns = [
    {
      key: "name", header: "Learner",
      render: (a) => (
        <div className="adm-user">
          <span className="adm-user__ph">{initials(a.name)}</span>
          <div className="adm-user__name">{a.name}</div>
        </div>
      ),
    },
    { key: "course", header: "Course" },
    { key: "module", header: "Module" },
    { key: "type", header: "Type" },
    { key: "score", header: "Score", align: "center", sortAccessor: (a) => a.score ?? -1, render: (a) => (a.score == null ? "—" : `${a.score}%`) },
    { key: "status", header: "Status", render: (a) => <span className={`adm-badge ${badge[a.status]}`}>{a.status}</span> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (a) =>
        a.status === "Needs grading" ? (
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => navigate(`/admin/assessments/${a.id}/grade`)}>Grade</button>
        ) : (
          <button className="adm-btn-sm" onClick={() => navigate(`/admin/assessments/${a.id}/review`)}>Review</button>
        ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Assessments &amp; Submissions</h2>
          <p className="adm-page-head__sub">{needsGrading} submission{needsGrading === 1 ? "" : "s"} waiting to be graded.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={view}
        searchKeys={["name", "course", "module", "type"]}
        searchPlaceholder="Search submissions"
        initialSort={{ key: "status", dir: "asc" }}
        filters={
          <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {["All", "Needs grading", "Auto-graded"].map((s) => <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}
          </select>
        }
      />
    </div>
  );
}

export default Assessments;
