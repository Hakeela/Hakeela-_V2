import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

/**
 * Admin & staff share one portal. In real (Supabase) mode the role comes from
 * the signed-in user's profile (`profiles.role`). In demo mode (no Supabase
 * keys) it falls back to a local "View as" switcher so the UI is explorable.
 */
const AdminRoleContext = createContext(null);
const STORAGE_KEY = "hakadmin_role";

export function AdminRoleProvider({ children }) {
  const { profile, demo } = useAuth();

  const [demoRole, setDemoRole] = useState(() => {
    if (typeof window === "undefined") return "admin";
    return window.localStorage.getItem(STORAGE_KEY) || "admin";
  });
  useEffect(() => {
    if (demo) window.localStorage.setItem(STORAGE_KEY, demoRole);
  }, [demo, demoRole]);

  const role = demo ? demoRole : profile?.role || "student";
  const isAdmin = role === "admin";
  const setRole = demo ? setDemoRole : () => {};

  return (
    <AdminRoleContext.Provider value={{ role, setRole, isAdmin, demo }}>
      {children}
    </AdminRoleContext.Provider>
  );
}

export function useAdminRole() {
  const ctx = useContext(AdminRoleContext);
  if (!ctx) throw new Error("useAdminRole must be used within AdminRoleProvider");
  return ctx;
}

export default AdminRoleContext;
