import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "../DashboardLayout/DashboardLayout.css";
import "../../pages/dashboard/dashboard-pages.css";
import "./admin.css";

const I = {
  vb: "0 0 24 24",
  common: {
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
};

// nav: adminOnly items are hidden from staff
const nav = [
  {
    to: "/admin",
    label: "Overview",
    end: true,
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    to: "/admin/learners",
    label: "Learners",
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 21c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
        <path d="M17 8.5a3 3 0 0 0 0-1M18 21c0-2.6-1-4.3-2.7-5.2" />
      </svg>
    ),
  },
  {
    to: "/admin/courses",
    label: "Courses & Programs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z" />
      </svg>
    ),
  },
  {
    to: "/admin/enrollments",
    label: "Enrollments",
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    to: "/admin/notifications",
    label: "Notifications",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02" />
      </svg>
    ),
  },
  {
    to: "/admin/staff",
    label: "Staff & Roles",
    adminOnly: true,
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 21c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
        <path d="M12 2.5l1.4 1.1h1.8l.5 1.7l1.4 1.1l-.7 1.7" />
      </svg>
    ),
  },
  {
    to: "/admin/payments",
    label: "Payments",
    adminOnly: true,
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: (
      <svg viewBox={I.vb} {...I.common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const titleMap = {
  "/admin": "Overview",
  "/admin/learners": "Learners",
  "/admin/courses": "Courses & Programs",
  "/admin/enrollments": "Enrollments",
  "/admin/notifications": "Notifications",
  "/admin/staff": "Staff & Roles",
  "/admin/payments": "Payments",
  "/admin/settings": "Settings",
};

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, isAdmin, demo } = useAdminRole();
  const { user, profile, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const title =
    titleMap[location.pathname] ||
    (location.pathname.startsWith("/admin/courses")
      ? "Courses & Programs"
      : location.pathname.startsWith("/admin/learners")
      ? "Learners"
      : "Overview");

  const visibleNav = nav.filter((n) => !n.adminOnly || isAdmin);

  return (
    <div className={`dash adm ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <aside className={`dash-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="dash-sidebar__top">
          <div className="dash-sidebar__logo">
            <img src="/logo-full-blue.png" alt="Hakeela" />
          </div>
          <button
            className="dash-sidebar__toggle"
            aria-label={mobileOpen ? "Close menu" : collapsed ? "Expand menu" : "Collapse menu"}
            aria-expanded={mobileOpen || !collapsed}
            onClick={() => (mobileOpen ? setMobileOpen(false) : setCollapsed((c) => !c))}
          >
            <img src="/menu-toggle.png" alt="" />
          </button>
        </div>

        <span className="adm-console-tag dash-nav__label">Admin Console</span>

        <nav className="dash-nav">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={item.label}
              className={({ isActive }) => `dash-nav__item ${isActive ? "is-active" : ""}`}
            >
              <span className="dash-nav__icon">{item.icon}</span>
              <span className="dash-nav__label">{item.label}</span>
              {item.adminOnly && (
                <span className="dash-nav__adminflag dash-nav__label" title="Admin only">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="dash-logout" onClick={async () => { await signOut(); navigate("/admin/login"); }} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="dash-nav__label">Logout</span>
        </button>
      </aside>

      {/* Main */}
      <div className="dash-main">
        <header className="dash-header">
          <div className="dash-mobilebar">
            <button
              className="dash-mobilebar__toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <img src="/menu-toggle.png" alt="" />
            </button>
            <img className="dash-mobilebar__logo" src="/logo-full-blue.png" alt="Hakeela" />
          </div>

          <h1 className="dash-header__title">{title}</h1>

          <div className="dash-search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search learners, courses…" aria-label="Search" />
          </div>

          <div className="dash-header__actions">
            {/* Role preview switcher — only in demo mode (no Supabase keys) */}
            {demo && (
              <div className="adm-roleswitch" role="group" aria-label="View portal as">
                <span className="adm-roleswitch__label">View as</span>
                <button
                  className={`adm-roleswitch__btn ${role === "admin" ? "is-on" : ""}`}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
                <button
                  className={`adm-roleswitch__btn ${role === "staff" ? "is-on" : ""}`}
                  onClick={() => setRole("staff")}
                >
                  Staff
                </button>
              </div>
            )}

            <button className="dash-iconbtn" aria-label="Notifications" onClick={() => navigate("/admin/notifications")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02" />
              </svg>
            </button>

            <button className="dash-welcome adm-account" onClick={() => navigate("/admin/settings")}>
              <img src={profile?.avatar_url || "/avatar-146.png"} alt="" />
              <span className="adm-account__meta">
                <span className="adm-account__name">{profile?.full_name || user?.email?.split("@")[0] || "Account"}</span>
                <span className="adm-account__role">{isAdmin ? "Administrator" : "Staff"}</span>
              </span>
            </button>
          </div>
        </header>

        {/* Mobile full-width search */}
        <div className="dash-searchbar-mobile">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search" aria-label="Search" />
        </div>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <button className="dash-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
}

export default AdminLayout;
