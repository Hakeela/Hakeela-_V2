import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyNotifications, setNotificationRead, deleteNotification } from "../../lib/data.js";
import "./dashboard-pages.css";

const typeColor = {
  Lesson: "snote--blue",
  Grade: "snote--green",
  Certificate: "snote--yellow",
  Enrollment: "snote--blue",
  Reminder: "snote--gray",
};

const icons = {
  Lesson: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />,
  Grade: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
  Certificate: <><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></>,
  Enrollment: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  Reminder: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></>,
};

function Notifications() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    let active = true;
    getMyNotifications(user?.id)
      .then((rows) => active && setItems(rows))
      .catch(() => active && setItems([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [user?.id]);

  const markAllRead = () => {
    setItems((it) => it.map((n) => ({ ...n, read: true })));
    items.filter((n) => !n.read).forEach((n) => setNotificationRead(n.id, true));
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

  if (loading) return <div className="dashpg"><p className="snote-empty">Loading…</p></div>;

  return (
    <div className="dashpg">
      <div className="snote-head">
        <div>
          <h2 className="snote-head__title">Notifications</h2>
          <p className="snote-head__sub">{unread} unread</p>
        </div>
        {items.length > 0 && <button className="dash-btn dash-btn--outline" onClick={markAllRead}>Mark all as read</button>}
      </div>

      <div className="snote-list">
        {items.map((n) => (
          <div className={`snote ${n.read ? "" : "is-unread"}`} key={n.id}>
            <span className={`snote__icon ${typeColor[n.type] || "snote--gray"}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[n.type]}</svg>
            </span>
            <div className="snote__body" onClick={() => toggleRead(n.id)}>
              <div className="snote__title">{n.title}</div>
              <p className="snote__text">{n.body}</p>
              <span className="snote__time">{n.time}</span>
            </div>
            <button className="snote__del" aria-label="Delete notification" title="Delete" onClick={() => remove(n.id)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="snote-empty">You&apos;re all caught up — no notifications.</p>}
      </div>
    </div>
  );
}

export default Notifications;
