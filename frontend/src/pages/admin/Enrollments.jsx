import { useEffect, useState } from "react";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import { getEnrollments, setEnrollmentStatus } from "../../lib/admin.js";
import { initials } from "./adminData.js";

const badge = { Pending: "adm-badge--yellow", Approved: "adm-badge--green", Rejected: "adm-badge--red" };

function Enrollments() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("All");

  useEffect(() => {
    let active = true;
    getEnrollments().then((r) => active && setRows(r)).catch(() => active && setRows([]));
    return () => { active = false; };
  }, []);

  const setStatusFor = (id, s) => {
    setRows((r) => r.map((e) => (e.id === id ? { ...e, status: s } : e)));
    setEnrollmentStatus(id, s);
  };
  const view = rows.filter((e) => status === "All" || e.status === status);

  const columns = [
    {
      key: "name", header: "Applicant",
      render: (e) => (
        <div className="adm-user">
          <span className="adm-user__ph">{initials(e.name)}</span>
          <div>
            <div className="adm-user__name">{e.name}</div>
            <div className="adm-user__sub">{e.id}</div>
          </div>
        </div>
      ),
    },
    { key: "program", header: "Program" },
    { key: "date", header: "Applied" },
    { key: "status", header: "Status", render: (e) => <span className={`adm-badge ${badge[e.status]}`}>{e.status}</span> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (e) => (
        <div className="adm-rowactions">
          {e.status === "Pending" ? (
            <>
              <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => setStatusFor(e.id, "Approved")}>Approve</button>
              <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => setStatusFor(e.id, "Rejected")}>Reject</button>
            </>
          ) : (
            <button className="adm-btn-sm" onClick={() => setStatusFor(e.id, "Pending")}>Reset</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Enrollments &amp; Applications</h2>
          <p className="adm-page-head__sub">Review program applications and approve learners into cohorts.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={view}
        searchKeys={["name", "program", "id"]}
        searchPlaceholder="Search applicants"
        initialSort={{ key: "date", dir: "desc" }}
        filters={
          <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {["All", "Pending", "Approved", "Rejected"].map((s) => <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}
          </select>
        }
      />
    </div>
  );
}

export default Enrollments;
