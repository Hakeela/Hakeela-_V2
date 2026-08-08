import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import { learners, countryFromPhone, initials } from "./adminData.js";

function Learners() {
  const { isAdmin } = useAdminRole();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [gender, setGender] = useState("All");

  const rows = learners.filter(
    (l) =>
      (gender === "All" || l.gender === gender) &&
      (l.name.toLowerCase().includes(q.toLowerCase()) || l.email.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Learners</h2>
          <p className="adm-page-head__sub">{learners.length} enrolled learners.</p>
        </div>
        <button className="dash-btn dash-btn--solid">Export CSV</button>
      </div>

      <div className="adm-toolbar">
        <div className="adm-searchbox">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="adm-select" value={gender} onChange={(e) => setGender(e.target.value)}>
          {["All", "Male", "Female", "Other"].map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Gender</th><th>Country</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const c = countryFromPhone(l.phone);
                return (
                  <tr key={l.id}>
                    <td>
                      <div className="adm-user">
                        <span className="adm-user__ph">{initials(l.name)}</span>
                        <div className="adm-user__name">{l.name}</div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.gender}</td>
                    <td>{c.flag} {c.country}</td>
                    <td>
                      <div className="adm-rowactions">
                        <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => navigate(`/admin/learners/${l.id}`)}>View</button>
                        {isAdmin && (
                          <button className={`adm-btn-sm ${l.status === "Suspended" ? "" : "adm-btn-sm--danger"}`}>
                            {l.status === "Suspended" ? "Reinstate" : "Suspend"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#9a9a9a", padding: 32 }}>No learners match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Learners;
