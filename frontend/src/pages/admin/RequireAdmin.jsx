import { Link } from "react-router-dom";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";

/** Wraps admin-only pages. Staff see an access-denied notice instead. */
function RequireAdmin({ children }) {
  const { isAdmin } = useAdminRole();
  if (isAdmin) return children;

  return (
    <div className="adm-denied">
      <span className="adm-denied__icon">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </span>
      <h2>Admin access required</h2>
      <p>This area is limited to administrators. Ask an admin if you need access, or switch back to an allowed section.</p>
      <Link to="/admin" className="dash-btn dash-btn--solid">Back to Overview</Link>
    </div>
  );
}

export default RequireAdmin;
