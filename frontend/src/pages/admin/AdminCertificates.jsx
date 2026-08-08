import { useState } from "react";
import { certificates as seed } from "./adminData.js";

const payBadge = { Paid: "adm-badge--green", Unpaid: "adm-badge--red", Waived: "adm-badge--blue" };
const statusBadge = {
  "Ready to issue": "adm-badge--yellow",
  "Awaiting payment": "adm-badge--gray",
  Issued: "adm-badge--green",
};

function AdminCertificates() {
  const [rows, setRows] = useState(seed);
  const issue = (id) => setRows((r) => r.map((c) => (c.id === id ? { ...c, status: "Issued" } : c)));

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Certificates</h2>
          <p className="adm-page-head__sub">Issue and verify certificates once learners complete and pay.</p>
        </div>
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Learner</th><th>Course</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="adm-user">
                      <span className="adm-user__ph">{c.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div>
                        <div className="adm-user__name">{c.name}</div>
                        <div className="adm-user__sub">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.course}</td>
                  <td><span className={`adm-badge ${payBadge[c.payment]}`}>{c.payment}</span></td>
                  <td><span className={`adm-badge ${statusBadge[c.status]}`}>{c.status}</span></td>
                  <td>
                    <div className="adm-rowactions">
                      {c.status === "Ready to issue" && (
                        <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => issue(c.id)}>Issue</button>
                      )}
                      {c.status === "Issued" && <button className="adm-btn-sm">Download</button>}
                      {c.status === "Awaiting payment" && <button className="adm-btn-sm" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Awaiting payment</button>}
                    </div>
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

export default AdminCertificates;
