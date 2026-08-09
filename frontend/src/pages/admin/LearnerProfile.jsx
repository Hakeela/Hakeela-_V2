import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import Modal from "../../components/AdminUI/Modal.jsx";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import { getLearner, updateLearner, deleteLearner, sendLearnerPasswordReset } from "../../lib/admin.js";
import { countryFromPhone, initials } from "./adminData.js";

const statusBadge = {
  Active: "adm-badge--green", Graduated: "adm-badge--blue",
  Suspended: "adm-badge--red", "At risk": "adm-badge--yellow",
};

function EditModal({ open, learner, onClose, onSave }) {
  const [form, setForm] = useState(learner);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  if (!open) return null;
  return (
    <Modal
      open={open}
      title="Edit learner"
      subtitle={learner.id}
      onClose={onClose}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={() => onSave(form)}>Save changes</button>
        </>
      }
    >
      <div className="adm-form-grid">
        <div className="adm-field adm-field--full">
          <label>Full name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="adm-field adm-field--full">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Gender</label>
          <select value={form.gender} onChange={(e) => set("gender", e.target.value)}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="adm-field">
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}

function ResetModal({ open, learner, onClose, onDone }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  if (!open) return null;
  const mismatch = pw && pw2 && pw !== pw2;
  return (
    <Modal
      open={open}
      title="Reset password"
      subtitle={`${learner.name} — ${learner.email}`}
      onClose={onClose}
      width={460}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn--solid" disabled={mismatch} onClick={onDone}>
            {pw ? "Set new password" : "Send reset link"}
          </button>
        </>
      }
    >
      <p style={{ fontSize: 14, color: "#4a4a4a", marginTop: 0 }}>
        Send a password-reset link to the learner&apos;s email, or set a temporary password for them below.
      </p>
      <div className="adm-form-grid">
        <div className="adm-field adm-field--full">
          <label>New password (optional)</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Leave blank to send a reset link" />
        </div>
        <div className="adm-field adm-field--full">
          <label>Confirm password</label>
          <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Re-enter new password" />
        </div>
      </div>
      {mismatch && <p style={{ color: "#d63a3a", fontSize: 13, margin: "8px 0 0" }}>Passwords don&apos;t match.</p>}
    </Modal>
  );
}

function DeleteModal({ open, learner, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <Modal
      open={open}
      title="Delete learner"
      onClose={onClose}
      width={440}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="adm-btn-sm adm-btn-sm--danger" style={{ padding: "12px 20px" }} onClick={onConfirm}>Delete {learner.name.split(" ")[0]}</button>
        </>
      }
    >
      <p style={{ fontSize: 14, color: "#4a4a4a", margin: 0 }}>
        Permanently delete <b>{learner.name}</b> and all of their learning records, enrollments and certificates? This can&apos;t be undone.
      </p>
    </Modal>
  );
}

function LearnerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAdminRole();

  const [learner, setLearner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;
    getLearner(id)
      .then((l) => active && setLearner(l || null))
      .catch(() => active && setLearner(null))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="dashpg"><p style={{ color: "#8a8a8a" }}>Loading…</p></div>;
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

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  return (
    <div className="dashpg">
      <Link className="adm-link" to="/admin/learners" style={{ display: "inline-block", marginBottom: 16 }}>← Back to learners</Link>

      {toast && <div className="adm-toast">{toast}</div>}

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
        {isAdmin && (
          <div className="lp-head__actions">
            <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => setEditOpen(true)}>Edit info</button>
            <button className="adm-btn-sm" onClick={() => setResetOpen(true)}>Reset password</button>
            <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => setDeleteOpen(true)}>Delete</button>
          </div>
        )}
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

      {/* Admin modals */}
      <EditModal
        open={editOpen}
        learner={learner}
        onClose={() => setEditOpen(false)}
        onSave={async (form) => {
          setLearner((l) => ({ ...l, ...form }));
          setEditOpen(false);
          await updateLearner(learner.id, form);
          flash("Learner details updated.");
        }}
      />
      <ResetModal
        open={resetOpen}
        learner={learner}
        onClose={() => setResetOpen(false)}
        onDone={async () => {
          setResetOpen(false);
          await sendLearnerPasswordReset(learner.email);
          flash("Password reset link sent.");
        }}
      />
      <DeleteModal
        open={deleteOpen}
        learner={learner}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          setDeleteOpen(false);
          await deleteLearner(learner.id);
          navigate("/admin/learners");
        }}
      />
    </div>
  );
}

export default LearnerProfile;
