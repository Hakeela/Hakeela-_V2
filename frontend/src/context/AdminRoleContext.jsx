import { createContext, useContext, useEffect, useState } from "react";

/**
 * Admin & staff share one portal. The logged-in user has a role:
 *   - "admin" : full access
 *   - "staff" : operational access; admin-only areas are hidden
 *
 * There is no backend yet, so the role is kept in localStorage and can be
 * switched from the header ("View as") to preview what staff can see.
 */
const AdminRoleContext = createContext(null);

const STORAGE_KEY = "hakadmin_role";

export function AdminRoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "admin";
    return window.localStorage.getItem(STORAGE_KEY) || "admin";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, role);
  }, [role]);

  const isAdmin = role === "admin";

  return (
    <AdminRoleContext.Provider value={{ role, setRole, isAdmin }}>
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
