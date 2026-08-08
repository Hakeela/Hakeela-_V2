import { useState } from "react";
import PhoneField from "../../components/PhoneField/PhoneField.jsx";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import "../dashboard/dashboard-pages.css";

/** Shared account settings — both admins and staff edit their own account here. */
function Settings() {
  const { isAdmin } = useAdminRole();
  const [phone, setPhone] = useState("");

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Settings</h2>
          <p className="adm-page-head__sub">Manage your account information and password.</p>
        </div>
      </div>

      <div className="dash-card settings-card">
        <div className="settings-user">
          <div className="settings-user__photo">
            <img src="/avatar-146.png" alt="" />
            <span className="settings-user__cam">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </span>
          </div>
          <div>
            <h2 className="settings-user__name">Imaobong Akpan</h2>
            <p className="settings-user__role">{isAdmin ? "Admin" : "Staff"}</p>
          </div>
        </div>

        <div className="settings-sec">
          <h3 className="settings-sec__title">Account Information</h3>
          <p className="settings-sec__hint">Edit your personal account information.</p>

          <div className="settings-field">
            <label>Full Name</label>
            <input className="settings-input" defaultValue="Imaobong Akpan" />
          </div>
          <div className="settings-field">
            <label>Phone Number</label>
            <PhoneField value={phone} onChange={setPhone} variant="settings" />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input className="settings-input" type="email" defaultValue="imaobong@hakeela.org" />
          </div>
          <button className="dash-btn dash-btn--solid">Update</button>
        </div>

        <hr className="settings-divider" />

        <div className="settings-sec">
          <h3 className="settings-sec__title">Security Information</h3>
          <p className="settings-sec__hint">Edit your security account information.</p>

          <div className="settings-field">
            <label>Password</label>
            <input className="settings-input" type="password" placeholder="Enter password" />
          </div>
          <div className="settings-field">
            <label>Confirm Password</label>
            <input className="settings-input" type="password" placeholder="Re-enter password" />
          </div>
          <button className="dash-btn dash-btn--solid">Update</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
