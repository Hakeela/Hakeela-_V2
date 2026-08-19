import { useEffect, useState } from "react";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import Modal from "../../components/AdminUI/Modal.jsx";
import { getStaff, changeStaffRole, removeStaff, inviteStaff } from "../../lib/admin.js";
import { permissionAreas, rolePermissions, initials } from "./adminData.js";

const roleBadge = { Admin: "adm-badge--blue", Staff: "adm-badge--gray" };
const Tick = () => <span className="adm-tick">✓</span>;
const Cross = () => <span className="adm-cross">—</span>;

function InviteModal({ open, onClose, onInvite, error }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Staff" });
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    await onInvite(form);
    setSending(false);
  };
  return (
    <Modal
      open={open}
      title="Invite staff"
      subtitle="Send an invitation to join the HakPortal team."
      onClose={onClose}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={submit} disabled={sending}>{sending ? "Sending…" : "Send invite"}</button>
        </>
      }
    >
      {error && <div className="help-warning" style={{ marginBottom: 14 }}>{error}</div>}
      <div className="adm-form-grid">
        <div className="adm-field adm-field--full">
          <label>Full name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Jane Doe" />
        </div>
        <div className="adm-field adm-field--full">
          <label>Work email</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@hakeela.org" />
        </div>
        <div className="adm-field adm-field--full">
          <label>Role</label>
          <select value={form.role} onChange={(e) => set("role", e.target.value)}>
            <option>Staff</option><option>Admin</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}

function RoleModal({ member, onClose, onSave }) {
  const [role, setRole] = useState(member?.role || "Staff");
  if (!member) return null;
  return (
    <Modal
      open={!!member}
      title="Change role"
      subtitle={`${member.name} — ${member.email}`}
      onClose={onClose}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={() => onSave(member.id, role)}>Save role</button>
        </>
      }
    >
      <div className="adm-field">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Staff</option><option>Admin</option>
        </select>
        <p style={{ fontSize: 13, color: "#8a8a8a", marginTop: 8 }}>
          Admins can access every area, including Payments and Staff &amp; Roles. Staff are limited to day-to-day operations.
        </p>
      </div>
    </Modal>
  );
}

function RemoveModal({ member, onClose, onConfirm }) {
  if (!member) return null;
  return (
    <Modal
      open={!!member}
      title="Remove team member"
      onClose={onClose}
      width={440}
      footer={
        <>
          <button className="dash-btn dash-btn--outline" onClick={onClose}>Cancel</button>
          <button className="adm-btn-sm adm-btn-sm--danger" style={{ padding: "12px 20px" }} onClick={() => onConfirm(member.id)}>Remove {member.name.split(" ")[0]}</button>
        </>
      }
    >
      <p style={{ fontSize: 14, color: "#4a4a4a", margin: 0 }}>
        Are you sure you want to remove <b>{member.name}</b> ({member.email})? They will immediately lose access to the portal. This can&apos;t be undone.
      </p>
    </Modal>
  );
}

function Staff() {
  const [rows, setRows] = useState([]);
  const [inviting, setInviting] = useState(false);
  const [roleFor, setRoleFor] = useState(null);
  const [removeFor, setRemoveFor] = useState(null);

  useEffect(() => {
    let active = true;
    getStaff().then((r) => active && setRows(r)).catch(() => active && setRows([]));
    return () => { active = false; };
  }, []);

  const [inviteError, setInviteError] = useState("");

  const invite = async (form) => {
    setInviteError("");
    const { error } = await inviteStaff(form); // sends a real invite via the admin-users Edge Function
    if (error) return setInviteError(error);
    setRows((r) => [...r, { id: `pending-${r.length + 1}`, name: form.name, email: form.email, role: form.role, status: "Invited" }]);
    setInviting(false);
  };

  const changeRole = async (id, role) => {
    setRows((r) => r.map((s) => (s.id === id ? { ...s, role } : s)));
    setRoleFor(null);
    await changeStaffRole(id, role);
  };
  const removeMember = async (id) => {
    setRows((r) => r.filter((s) => s.id !== id));
    setRemoveFor(null);
    await removeStaff(id);
  };
  const bulkDelete = async (ids) => {
    setRows((r) => r.filter((s) => !ids.includes(s.id)));
    await Promise.all(ids.map((id) => removeStaff(id)));
  };

  const columns = [
    {
      key: "name", header: "Member",
      render: (s) => (
        <div className="adm-user">
          <span className="adm-user__ph">{initials(s.name)}</span>
          <div>
            <div className="adm-user__name">{s.name}</div>
            <div className="adm-user__sub">{s.email}</div>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (s) => <span className={`adm-badge ${roleBadge[s.role]}`}>{s.role}</span> },
    { key: "status", header: "Status", render: (s) => <span className={`adm-badge ${s.status === "Active" ? "adm-badge--green" : "adm-badge--yellow"}`}>{s.status}</span> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (s) => (
        <div className="adm-rowactions">
          <button className="adm-btn-sm" onClick={() => setRoleFor(s)}>Change role</button>
          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => setRemoveFor(s)}>Remove</button>
        </div>
      ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Staff &amp; Roles</h2>
          <p className="adm-page-head__sub">Manage team members. There are two roles: Admin and Staff. Admin only.</p>
        </div>
        <button className="dash-btn dash-btn--solid" onClick={() => setInviting(true)}>+ Invite Staff</button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={["name", "email", "role"]}
        searchPlaceholder="Search team members"
        initialSort={{ key: "name", dir: "asc" }}
        pageSize={8}
        selectable
        onBulkDelete={bulkDelete}
        bulkNoun="member"
      />

      <div className="dash-card" style={{ marginTop: 24 }}>
        <div className="adm-card-head"><h3>What each role can access</h3></div>
        <div className="adm-table-scroll">
          <table className="adm-perm">
            <thead>
              <tr>
                <th>Role</th>
                {permissionAreas.map((a) => <th key={a} style={{ textAlign: "center" }}>{a}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(rolePermissions).map(([role, allowed]) => (
                <tr key={role}>
                  <td><span className={`adm-badge ${roleBadge[role]}`}>{role}</span></td>
                  {permissionAreas.map((a) => (
                    <td className="tick" key={a}>{allowed.includes(a) ? <Tick /> : <Cross />}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InviteModal open={inviting} onClose={() => { setInviting(false); setInviteError(""); }} onInvite={invite} error={inviteError} />
      <RoleModal member={roleFor} onClose={() => setRoleFor(null)} onSave={changeRole} />
      <RemoveModal member={removeFor} onClose={() => setRemoveFor(null)} onConfirm={removeMember} />
    </div>
  );
}

export default Staff;
