import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";
import PasswordInput from "../../components/AuthLayout/PasswordInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import "../../components/AdminLayout/admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, demo } = useAuth();
  const { role, setRole } = useAdminRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await signIn({ email, password });
    setBusy(false);
    if (error) return setError(error);
    // Real role comes from the profile; RequireStaff bounces non-staff.
    navigate("/admin");
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Admin &amp; Staff Login</h1>
      <p className="auth-subtitle">Sign in to the HakPortal console</p>

      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {demo && (
          <div className="auth-field">
            <label className="auth-label">Demo — view as</label>
            <div className="adm-roleswitch adm-roleswitch--login" role="group" aria-label="Sign in as">
              <button type="button" className={`adm-roleswitch__btn ${role === "admin" ? "is-on" : ""}`} onClick={() => setRole("admin")}>Admin</button>
              <button type="button" className={`adm-roleswitch__btn ${role === "staff" ? "is-on" : ""}`} onClick={() => setRole("staff")}>Staff</button>
            </div>
          </div>
        )}

        <div className="auth-field">
          <label className="auth-label" htmlFor="admin-email">Work Email</label>
          <input id="admin-email" type="email" className="auth-input" placeholder="you@hakeela.org" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="admin-password">Password</label>
          <PasswordInput id="admin-password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="auth-forgot">
          <Link to="/reset-password">Reset Password</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>{busy ? "Signing in…" : "Login"}</button>
      </form>

      <p className="auth-alt">
        Not a team member?{" "}
        <Link to="/login" className="auth-inline-link">Student login</Link>
      </p>
    </AuthLayout>
  );
}

export default AdminLogin;
