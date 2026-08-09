import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

/**
 * Gate for the whole /admin area. In real mode only staff/admin may enter:
 * signed-out -> admin login; signed-in students -> their own dashboard.
 * In demo mode (no Supabase keys) access is open so the portal stays explorable.
 */
function RequireStaff({ children }) {
  const { loading, isAuthenticated, profile, demo } = useAuth();

  if (demo) return children;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#8a8a8a" }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (!["staff", "admin"].includes(profile?.role)) return <Navigate to="/dashboard" replace />;

  return children;
}

export default RequireStaff;
