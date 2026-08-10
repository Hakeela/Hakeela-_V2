import { useEffect, useState } from "react";
import PhoneField from "../../components/PhoneField/PhoneField.jsx";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateProfile, uploadAvatar } from "../../lib/data.js";
import "../dashboard/dashboard-pages.css";

/** Shared account settings — both admins and staff edit their own account here. */
function Settings() {
  const { isAdmin } = useAdminRole();
  const { user, profile, updatePassword, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("/avatar-146.png");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      if (profile.avatar_url) setPhoto(profile.avatar_url);
    }
  }, [profile]);

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 3500); };

  const onPhoto = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPhoto(URL.createObjectURL(f)); // instant preview
    const { url, error } = await uploadAvatar(user?.id, f);
    if (error) return flash(`Error: ${error}`);
    if (url) setPhoto(url);
    await refreshProfile();
    flash("Profile photo updated.");
  };

  const saveInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    const { error } = await updateProfile(user?.id, { full_name: fullName, phone });
    setSavingInfo(false);
    await refreshProfile();
    flash(error ? `Error: ${error}` : "Account information updated.");
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.length < 6) return flash("Password must be at least 6 characters.");
    if (pw !== pw2) return flash("Passwords do not match.");
    setSavingPw(true);
    const { error } = await updatePassword(pw);
    setSavingPw(false);
    if (!error) { setPw(""); setPw2(""); }
    flash(error ? `Error: ${error}` : "Password updated.");
  };

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
          <label className="settings-user__photo" title="Upload photo" style={{ cursor: "pointer" }}>
            <img src={photo} alt="" />
            <span className="settings-user__cam">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </span>
            <input type="file" accept="image/*" hidden onChange={onPhoto} />
          </label>
          <div>
            <h2 className="settings-user__name">{fullName || user?.email?.split("@")[0] || "Your account"}</h2>
            <p className="settings-user__role">{isAdmin ? "Admin" : "Staff"}</p>
            <label className="adm-btn-sm" style={{ marginTop: 8, cursor: "pointer" }}>
              Upload image
              <input type="file" accept="image/*" hidden onChange={onPhoto} />
            </label>
          </div>
        </div>

        {msg && <div className="help-success" style={{ marginBottom: 18 }}>{msg}</div>}

        <form className="settings-sec" onSubmit={saveInfo}>
          <h3 className="settings-sec__title">Account Information</h3>
          <p className="settings-sec__hint">Edit your personal account information.</p>

          <div className="settings-field">
            <label>Full Name</label>
            <input className="settings-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
          </div>
          <div className="settings-field">
            <label>Phone Number</label>
            <PhoneField value={phone} onChange={setPhone} variant="settings" />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input className="settings-input" type="email" value={user?.email || ""} readOnly aria-readonly="true" />
          </div>
          <button className="dash-btn dash-btn--solid" disabled={savingInfo}>{savingInfo ? "Saving…" : "Update"}</button>
        </form>

        <hr className="settings-divider" />

        <form className="settings-sec" onSubmit={savePassword}>
          <h3 className="settings-sec__title">Security Information</h3>
          <p className="settings-sec__hint">Edit your security account information.</p>

          <div className="settings-field">
            <label>Password</label>
            <input className="settings-input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter new password" />
          </div>
          <div className="settings-field">
            <label>Confirm Password</label>
            <input className="settings-input" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Re-enter password" />
          </div>
          <button className="dash-btn dash-btn--solid" disabled={savingPw}>{savingPw ? "Saving…" : "Update"}</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
