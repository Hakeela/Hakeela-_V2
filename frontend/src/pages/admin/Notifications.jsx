import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyNotifications, setNotificationRead, deleteNotification } from "../../lib/data.js";
import { notifications as seed } from "./adminData.js";

const typeStyle = {
  Enrollment: { badge: "adm-badge--blue", icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /> },
  Submission: { badge: "adm-badge--yellow", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></> },
  Payment: { badge: "adm-badge--green", icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></> },
  Certificate: { badge: "adm-badge--blue", icon: <><circle cx="12" cy="9" r="4" /><path d="M9 12l-1 8 4-2 4 2-1-8" /></> },
  System: { badge: "adm-badge--gray", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></> },
};

function Notifications() {
  const { user, demo } = useAuth();
  const [items, setItems] = useState(demo ? seed : []);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let active = true;
    getMyNotifications(user?.id).then((r) => active && setItems(r)).catch(() => active && setItems([]));
    return () => { active = false; };
  }, [user?.id]);

  const unread = items.filter((n) => !n.read).length;
  const filters = ["All", "Unread", "Enrollment", "Submission", "Payment", "Certificate", "System"];
  const view = items.filter((n) => filter === "All" || (filter === "Unread" ? !n.read : n.type === filter));

  const markAllRead = () => {
    items.filter((n) => !n.read).forEach((n) => setNotificationRead(n.id, true));
    setItems((it) => it.map((n) => ({ ...n, read: true })));
  };
  const toggleRead = (id) => {
    const next = !items.find((n) => n.id === id)?.read;
    setItems((it) => it.map((n) => (n.id === id ? { ...n, read: next } : n)));
    setNotificationRead(id, next);
  };
  const remove = (id) => {
    setItems((it) => it.filter((n) => n.id !== id));
    deleteNotification(id);
  };

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Notifications</h2>
          <p className="adm-page-head__sub">{unread} unread notification{unread === 1 ? "" : "s"}.</p>
        </div>
        <button className="dash-btn dash-btn--outline" onClick={markAllRead}>Mark all as read</button>
      </div>

      <div className="adm-toolbar">
        {filters.map((f) => (
          <button key={f} className={`adm-btn-sm ${filter === f ? "adm-btn-sm--primary" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="dash-card" style={{ padding: 0 }}>
        <div className="adm-notes">
          {view.map((n) => {
            const st = typeStyle[n.type] || typeStyle.System;
            return (
              <div className={`adm-note ${n.read ? "" : "is-unread"}`} key={n.id}>
                <span className={`adm-note__icon ${st.badge}`}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{st.icon}</svg>
                </span>
                <div className="adm-note__body">
                  <div className="adm-note__top">
                    <span className="adm-note__title">{n.title}</span>
                    <span className={`adm-badge ${st.badge}`}>{n.type}</span>
                  </div>
                  <p className="adm-note__text">{n.body}</p>
                  <span className="adm-note__time">{n.time}</span>
                </div>
                <div className="adm-note__actions">
                  <button className="adm-btn-sm adm-btn-sm--ghost" onClick={() => toggleRead(n.id)}>
                    {n.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button className="ce-trash" data-tip="Delete" aria-label="Delete notification" onClick={() => remove(n.id)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
          {view.length === 0 && <p className="ce-empty" style={{ padding: 32 }}>Nothing here.</p>}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
