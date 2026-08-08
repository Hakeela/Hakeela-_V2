import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";
import PasswordInput from "../../components/AuthLayout/PasswordInput.jsx";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import "../../components/AdminLayout/admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const { role, setRole } = useAdminRole();

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet — the selected role stands in for real authentication.
    navigate("/admin");
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Admin &amp; Staff Login</h1>
      <p className="auth-subtitle">Sign in to the HakPortal console</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label">Sign in as</label>
          <div className="adm-roleswitch adm-roleswitch--login" role="group" aria-label="Sign in as">
            <button
              type="button"
              className={`adm-roleswitch__btn ${role === "admin" ? "is-on" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={`adm-roleswitch__btn ${role === "staff" ? "is-on" : ""}`}
              onClick={() => setRole("staff")}
            >
              Staff
            </button>
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="admin-email">Work Email</label>
          <input id="admin-email" type="email" className="auth-input" placeholder="you@hakeela.org" />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="admin-password">Password</label>
          <PasswordInput id="admin-password" placeholder="Enter password" />
        </div>

        <div className="auth-forgot">
          <Link to="/reset-password">Reset Password</Link>
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <p className="auth-alt">
        Not a team member?{" "}
        <Link to="/login" className="auth-inline-link">Student login</Link>
      </p>
    </AuthLayout>
  );
}

export default AdminLogin;
