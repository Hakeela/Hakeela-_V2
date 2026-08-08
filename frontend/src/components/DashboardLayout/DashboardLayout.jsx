import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const nav = [
  {
    to: "/dashboard",
    label: "Dashboard",
    end: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 15 15"
      >
        <path d="M0 0h15v15H0z" fill="none" />
        <path
          fill="currentColor"
          d="M5.25 8c.228 0 .426 0 .6.042a1.5 1.5 0 0 1 1.11 1.107c.04.175.04.373.04.601v2.5c0 .228 0 .426-.041.6a1.5 1.5 0 0 1-1.109 1.11c-.174.04-.372.04-.6.04h-2.5c-.228 0-.426 0-.6-.041a1.5 1.5 0 0 1-1.108-1.108C1 12.676 1 12.478 1 12.25v-2.5c0-.228 0-.426.042-.6a1.5 1.5 0 0 1 1.107-1.108C2.324 8 2.522 8 2.75 8zm7 0c.228 0 .426 0 .6.042a1.5 1.5 0 0 1 1.109 1.107c.042.175.041.373.041.601v2.5c0 .228 0 .426-.041.6a1.5 1.5 0 0 1-1.108 1.109c-.175.042-.373.041-.601.041h-2.5c-.228 0-.426 0-.6-.041a1.5 1.5 0 0 1-1.108-1.108C8 12.676 8 12.478 8 12.25v-2.5c0-.228 0-.426.042-.6a1.5 1.5 0 0 1 1.107-1.108C9.324 8 9.522 8 9.75 8zM2.8 9c-.307 0-.373.003-.416.014a.5.5 0 0 0-.37.37c-.01.043-.014.11-.014.416v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.043.01.11.013.416.013h2.4c.308 0 .374-.003.417-.014a.5.5 0 0 0 .37-.369c.01-.043.013-.11.013-.417V9.8c0-.307-.003-.373-.014-.416a.5.5 0 0 0-.369-.37C5.574 9.004 5.507 9 5.2 9zm7 0c-.307 0-.373.003-.416.014a.5.5 0 0 0-.37.37c-.01.043-.014.11-.014.416v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.043.01.11.013.416.013h2.4c.308 0 .374-.003.417-.014a.5.5 0 0 0 .37-.369c.01-.043.013-.11.013-.417V9.8c0-.307-.004-.373-.014-.416a.5.5 0 0 0-.369-.37c-.043-.01-.11-.014-.417-.014zM5.25 1c.228 0 .426 0 .6.042a1.5 1.5 0 0 1 1.11 1.107c.04.175.04.373.04.601v2.5c0 .228 0 .426-.041.6A1.5 1.5 0 0 1 5.85 6.96c-.174.04-.372.04-.6.04h-2.5c-.228 0-.426 0-.6-.041A1.5 1.5 0 0 1 1.041 5.85C1 5.676 1 5.478 1 5.25v-2.5c0-.228 0-.426.042-.6a1.5 1.5 0 0 1 1.107-1.108C2.324 1 2.522 1 2.75 1zm7 0c.228 0 .426 0 .6.042a1.5 1.5 0 0 1 1.109 1.107c.042.175.041.373.041.601v2.5c0 .228 0 .426-.041.6a1.5 1.5 0 0 1-1.109 1.11c-.174.04-.372.04-.6.04h-2.5c-.228 0-.426 0-.6-.041A1.5 1.5 0 0 1 8.041 5.85C8 5.676 8 5.478 8 5.25v-2.5c0-.228 0-.426.042-.6a1.5 1.5 0 0 1 1.107-1.108C9.324 1 9.522 1 9.75 1zM2.8 2c-.307 0-.373.003-.416.014a.5.5 0 0 0-.37.37c-.01.043-.014.11-.014.416v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.043.01.11.013.416.013h2.4c.308 0 .374-.003.417-.014a.5.5 0 0 0 .37-.369c.01-.043.013-.11.013-.417V2.8c0-.307-.003-.373-.014-.416a.5.5 0 0 0-.369-.37C5.574 2.004 5.507 2 5.2 2zm7 0c-.307 0-.373.003-.416.014a.5.5 0 0 0-.37.37c-.01.043-.014.11-.014.416v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.043.01.11.013.416.013h2.4c.308 0 .374-.003.417-.014a.5.5 0 0 0 .37-.369c.01-.043.013-.11.013-.417V2.8c0-.307-.004-.373-.014-.416a.5.5 0 0 0-.369-.37c-.043-.01-.11-.014-.417-.014z"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard/courses",
    label: "Courses",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="currentColor"
          d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard/certificate",
    label: "Certificate",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
          <path d="M13 17.5V22l2-1.5l2 1.5v-4.5" />
          <path d="M10 19H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-1 1.73M6 9h12M6 12h3m-3 3h2" />
        </g>
      </svg>
    ),
  },
  {
    to: "/dashboard/portfolio",
    label: "Portfolio",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M3.75 9.894a2.5 2.5 0 0 1 2.5-2.5h11.5a2.5 2.5 0 0 1 2.5 2.5V17.5a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5z" />
          <path d="M17.75 7.394H6.25a2.5 2.5 0 0 0-2.5 2.5v.303a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-.303a2.5 2.5 0 0 0-2.5-2.5M8.603 5.5a1.5 1.5 0 0 1 1.5-1.5h3.794a1.5 1.5 0 0 1 1.5 1.5v1.894H8.603z" />
        </g>
      </svg>
    ),
  },
  {
    to: "/dashboard/notifications",
    label: "Notifications",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02" />
      </svg>
    ),
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
  {
    to: "/dashboard/help",
    label: "Help",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
        <line x1="12" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
];

const titleMap = {
  "/dashboard": "Dashboard",
  "/dashboard/courses": "Courses",
  "/dashboard/enroll": "Courses",
  "/dashboard/certificate": "Certificate",
  "/dashboard/portfolio": "Portfolio",
  "/dashboard/notifications": "Notifications",
  "/dashboard/help": "Help",
  "/dashboard/profile": "Settings",
};

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Longest matching prefix -> title (so /courses/:id still reads "Courses")
  const title =
    titleMap[location.pathname] ||
    (location.pathname.startsWith("/dashboard/course") ||
    location.pathname.startsWith("/dashboard/enroll")
      ? "Courses"
      : "Dashboard");

  return (
    <div className={`dash ${collapsed ? "is-collapsed" : ""}`}>
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
            onClick={() =>
              mobileOpen ? setMobileOpen(false) : setCollapsed((c) => !c)
            }
          >
            <img src="/menu-toggle.png" alt="" />
          </button>
        </div>

        <nav className="dash-nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={item.label}
              className={({ isActive }) =>
                `dash-nav__item ${isActive ? "is-active" : ""}`
              }
            >
              <span className="dash-nav__icon">{item.icon}</span>
              <span className="dash-nav__label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="dash-logout" onClick={() => navigate("/login")} title="Logout">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
          {/* Mobile / tablet only: menu toggle + logo */}
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
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search" aria-label="Search" />
          </div>

          <div className="dash-header__actions">
            <button className="dash-iconbtn" aria-label="Notifications" onClick={() => navigate("/dashboard/notifications")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02"
                />
              </svg>
            </button>

            <div className="dash-welcome">
              <img src="/user-photo.png" alt="" />
              <span>Welcome, Victor</span>
            </div>

            <img className="dash-avatar" src="/avatar-146.png" alt="Account" />
          </div>
        </header>

        {/* Mobile / tablet only: full-width search below the header */}
        <div className="dash-searchbar-mobile">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search" aria-label="Search" />
        </div>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>

      {/* Backdrop for the mobile off-canvas sidebar */}
      {mobileOpen && (
        <button
          className="dash-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;
