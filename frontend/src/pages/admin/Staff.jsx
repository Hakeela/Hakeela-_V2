import { staff, permissionAreas, rolePermissions, initials } from "./adminData.js";

const roleBadge = { Admin: "adm-badge--blue", Staff: "adm-badge--gray" };
const Tick = () => <span className="adm-tick">✓</span>;
const Cross = () => <span className="adm-cross">—</span>;

function Staff() {
  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Staff &amp; Roles</h2>
          <p className="adm-page-head__sub">Manage team members. There are two roles: Admin and Staff. Admin only.</p>
        </div>
        <button className="dash-btn dash-btn--solid">+ Invite Staff</button>
      </div>

      <div className="adm-table-wrap" style={{ marginBottom: 24 }}>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Member</th><th>Role</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="adm-user">
                      <span className="adm-user__ph">{initials(s.name)}</span>
                      <div>
                        <div className="adm-user__name">{s.name}</div>
                        <div className="adm-user__sub">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`adm-badge ${roleBadge[s.role]}`}>{s.role}</span></td>
                  <td><span className={`adm-badge ${s.status === "Active" ? "adm-badge--green" : "adm-badge--yellow"}`}>{s.status}</span></td>
                  <td>
                    <div className="adm-rowactions">
                      <button className="adm-btn-sm">Change role</button>
                      <button className="adm-btn-sm adm-btn-sm--danger">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dash-card">
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
    </div>
  );
}

export default Staff;
