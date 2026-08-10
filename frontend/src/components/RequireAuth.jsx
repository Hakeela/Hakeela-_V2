import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Gate for the student dashboard. Signed-out -> /login. Staff/admin accounts are
 * sent to the admin console (roles are kept separate from the learner area).
 */
function RequireAuth({ children }) {
  const { isAuthenticated, loading, profile, demo } = useAuth();
  const location = useLocation();

  const spinner = (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#8a8a8a" }}>Loading…</div>
  );

  if (loading) return spinner;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!demo) {
    if (!profile) return spinner; // wait for role
    if (["staff", "admin"].includes(profile.role)) return <Navigate to="/admin" replace />;
  }

  return children;
}

export default RequireAuth;
