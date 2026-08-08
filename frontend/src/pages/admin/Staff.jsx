import { useState } from "react";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import Modal from "../../components/AdminUI/Modal.jsx";
import { staff as seed, permissionAreas, rolePermissions, initials } from "./adminData.js";

const roleBadge = { Admin: "adm-badge--blue", Staff: "adm-badge--gray" };
const Tick = () => <span className="adm-tick">✓</span>;
const Cross = () => <span className="adm-cross">—</span>;

function InviteModal({ open, onClose, onInvite }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Staff" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.name || !form.email) return;
    onInvite(form);
    setForm({ name: "", email: "", role: "Staff" });
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
          <button className="dash-btn dash-btn--solid" onClick={submit}>Send invite</button>
        </>
      }
    >
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

function Staff() {
  const [rows, setRows] = useState(seed);
  const [inviting, setInviting] = useState(false);

  const invite = (form) => {
    setRows((r) => [...r, { id: `ST-${String(r.length + 1).padStart(2, "0")}`, name: form.name, email: form.email, role: form.role, status: "Invited" }]);
    setInviting(false);
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
      render: () => (
        <div className="adm-rowactions">
          <button className="adm-btn-sm">Change role</button>
          <button className="adm-btn-sm adm-btn-sm--danger">Remove</button>
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

      <InviteModal open={inviting} onClose={() => setInviting(false)} onInvite={invite} />
    </div>
  );
}

export default Staff;
