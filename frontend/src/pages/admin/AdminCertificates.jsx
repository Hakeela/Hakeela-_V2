import { useEffect, useState } from "react";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import Modal from "../../components/AdminUI/Modal.jsx";
import { getCertificates, issueCertificate } from "../../lib/admin.js";
import { initials } from "./adminData.js";

const payBadge = { Paid: "adm-badge--green", Unpaid: "adm-badge--red", Waived: "adm-badge--blue" };
const statusBadge = {
  "Ready to issue": "adm-badge--yellow",
  "Awaiting payment": "adm-badge--gray",
  Issued: "adm-badge--green",
};

function IssueModal({ cert, onClose, onIssue }) {
  const [payment, setPayment] = useState(cert?.payment || "Paid");
  const [file, setFile] = useState(null);

  if (!cert) return null;

  return (
    <Modal
      open={!!cert}
      title="Issue certificate"
      subtitle={`${cert.name} — ${cert.course}`}
      onClose={onClose}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={() => onIssue(cert.id, payment)}>Issue certificate</button>
        </>
      }
    >
      <div className="adm-field" style={{ marginBottom: 18 }}>
        <label>Payment status</label>
        <select className="adm-select" value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option>Paid</option><option>Unpaid</option><option>Waived</option>
        </select>
      </div>

      <div className="adm-field">
        <label>Upload certificate (PDF or image)</label>
        {file ? (
          <div className="ce-upload__preview" style={{ background: "#f6f6fa" }}>
            {file.type?.startsWith("image/") ? (
              <img src={file.url} alt="Certificate preview" />
            ) : (
              <div style={{ padding: 24, color: "#4a4a4a", display: "flex", alignItems: "center", gap: 10 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {file.name}
              </div>
            )}
            <button className="ce-upload__remove" onClick={() => setFile(null)}>Remove</button>
          </div>
        ) : (
          <label className="ce-file__drop">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Click to upload certificate</span>
            <input
              type="file"
              accept="image/*,application/pdf"
              hidden
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) setFile({ name: f.name, type: f.type, url: URL.createObjectURL(f) });
              }}
            />
          </label>
        )}
      </div>
    </Modal>
  );
}

function AdminCertificates() {
  const [rows, setRows] = useState([]);
  const [issuing, setIssuing] = useState(null);

  useEffect(() => {
    let active = true;
    getCertificates().then((r) => active && setRows(r)).catch(() => active && setRows([]));
    return () => { active = false; };
  }, []);

  const doIssue = (id, payment) => {
    setRows((r) => r.map((c) => (c.id === id ? { ...c, status: "Issued", payment } : c)));
    setIssuing(null);
    issueCertificate(id, payment);
  };

  const columns = [
    {
      key: "name", header: "Learner",
      render: (c) => (
        <div className="adm-user">
          <span className="adm-user__ph">{initials(c.name)}</span>
          <div>
            <div className="adm-user__name">{c.name}</div>
            <div className="adm-user__sub">{c.id}</div>
          </div>
        </div>
      ),
    },
    { key: "course", header: "Course" },
    { key: "payment", header: "Payment", render: (c) => <span className={`adm-badge ${payBadge[c.payment]}`}>{c.payment}</span> },
    { key: "status", header: "Status", render: (c) => <span className={`adm-badge ${statusBadge[c.status]}`}>{c.status}</span> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (c) => (
        <div className="adm-rowactions">
          {c.status !== "Issued" ? (
            <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => setIssuing(c)}>Issue</button>
          ) : (
            <button className="adm-btn-sm">Download</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Certificates</h2>
          <p className="adm-page-head__sub">Issue and verify certificates once learners complete and pay.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={["name", "course", "id"]}
        searchPlaceholder="Search certificates"
        initialSort={{ key: "name", dir: "asc" }}
      />

      <IssueModal cert={issuing} onClose={() => setIssuing(null)} onIssue={doIssue} />
    </div>
  );
}

export default AdminCertificates;
