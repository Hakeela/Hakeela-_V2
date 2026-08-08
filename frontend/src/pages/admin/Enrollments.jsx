import { useState } from "react";
import { enrollments as seed } from "./adminData.js";

const badge = { Pending: "adm-badge--yellow", Approved: "adm-badge--green", Rejected: "adm-badge--red" };

function Enrollments() {
  const [rows, setRows] = useState(seed);
  const [tab, setTab] = useState("Pending");

  const setStatus = (id, status) =>
    setRows((r) => r.map((e) => (e.id === id ? { ...e, status } : e)));

  const tabs = ["Pending", "Approved", "Rejected", "All"];
  const view = rows.filter((e) => tab === "All" || e.status === tab);
  const counts = Object.fromEntries(tabs.map((t) => [t, t === "All" ? rows.length : rows.filter((e) => e.status === t).length]));

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Enrollments &amp; Applications</h2>
          <p className="adm-page-head__sub">Review program applications and approve learners into cohorts.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        {tabs.map((t) => (
          <button key={t} className={`adm-btn-sm ${tab === t ? "adm-btn-sm--primary" : ""}`} onClick={() => setTab(t)}>
            {t} ({counts[t]})
          </button>
        ))}
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Applicant</th><th>Program</th><th>Applied</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {view.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="adm-user">
                      <span className="adm-user__ph">{e.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div>
                        <div className="adm-user__name">{e.name}</div>
                        <div className="adm-user__sub">{e.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{e.program}</td>
                  <td>{e.date}</td>
                  <td><span className={`adm-badge ${badge[e.status]}`}>{e.status}</span></td>
                  <td>
                    <div className="adm-rowactions">
                      {e.status === "Pending" ? (
                        <>
                          <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => setStatus(e.id, "Approved")}>Approve</button>
                          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => setStatus(e.id, "Rejected")}>Reject</button>
                        </>
                      ) : (
                        <button className="adm-btn-sm" onClick={() => setStatus(e.id, "Pending")}>Reset</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#9a9a9a", padding: 32 }}>Nothing here.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enrollments;
