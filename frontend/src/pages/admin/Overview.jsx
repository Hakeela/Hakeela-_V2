import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import { getOverview } from "../../lib/admin.js";
import { naira, initials } from "./adminData.js";

const icons = {
  learners: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 21c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M17 8.5a3 3 0 0 0 0-1M18 21c0-2.6-1-4.3-2.7-5.2"/></svg>,
  courses: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 4h2v5l-1-.75L9 9zm9 16H6V4h1v9l3-2.25L13 13V4h5z"/></svg>,
  pending: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  revenue: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>,
};

function GenderPie({ genderSplit }) {
  const total = genderSplit.reduce((s, g) => s + g.value, 0) || 1;
  let acc = 0;
  const stops = genderSplit.map((g) => {
    const start = (acc / total) * 360;
    acc += g.value;
    return `${g.color} ${start}deg ${(acc / total) * 360}deg`;
  });
  return (
    <div className="adm-pie-wrap">
      <div className="adm-pie" style={{ background: `conic-gradient(${stops.join(",")})` }}>
        <div className="adm-pie__hole">
          <span className="adm-pie__total">{total.toLocaleString()}</span>
          <span className="adm-pie__cap">learners</span>
        </div>
      </div>
      <ul className="adm-legend">
        {genderSplit.map((g) => (
          <li key={g.label}>
            <span className="adm-legend__dot" style={{ background: g.color }} />
            {g.label}
            <b>{Math.round((g.value / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Overview() {
  const { isAdmin } = useAdminRole();
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    getOverview().then((d) => active && setData(d)).catch(() => active && setData(null));
    return () => { active = false; };
  }, []);

  const trend = data?.trend || [];
  const activity = data?.activity || [];
  const max = Math.max(1, ...trend.map((d) => d.v));

  const kpis = [
    { value: data ? data.learners.toLocaleString() : "…", label: "Total Learners", bg: "#eceafd", color: "#1a13d6", icon: icons.learners },
    { value: data ? data.courses : "…", label: "Active Courses", bg: "#e4f6ec", color: "#1e9e5a", icon: icons.courses },
    { value: data ? data.pending : "…", label: "Pending Applications", bg: "#fff4d6", color: "#c99700", icon: icons.pending },
    { value: naira(1240000), label: "Revenue (30d)", bg: "#f0eafd", color: "#7a3ff2", adminOnly: true, icon: icons.revenue },
  ].filter((k) => !k.adminOnly || isAdmin);

  const pendingList = data?.pendingList || [];
  const genderSplit = data?.genderSplit || [];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Welcome back 👋</h2>
          <p className="adm-page-head__sub">Here&apos;s what&apos;s happening across the HakPortal today.</p>
        </div>
      </div>

      <div className="adm-kpis">
        {kpis.map((k) => (
          <div className="stat-card adm-kpi" key={k.label}>
            <span className="stat-card__icon" style={{ background: k.bg, color: k.color }}>{k.icon}</span>
            <div>
              <div className="stat-card__value">{k.value}</div>
              <div className="stat-card__label">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="adm-grid-2">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Enrollments trend</h3></div>
          <div className="adm-chart">
            {trend.map((d, i) => (
              <div className="adm-chart__col" key={`${d.m}-${i}`}>
                <div className="adm-chart__bar" style={{ height: `${(d.v / max) * 100}%` }} title={`${d.v} enrollments`} />
                <span className="adm-chart__x">{d.m}</span>
              </div>
            ))}
            {trend.length === 0 && <p className="ce-empty" style={{ margin: "auto" }}>No enrollment data yet.</p>}
          </div>
        </div>

        <div className="dash-card">
          <div className="adm-card-head"><h3>Learners by gender</h3></div>
          {genderSplit.length ? <GenderPie genderSplit={genderSplit} /> : <p className="ce-empty">No learner data yet.</p>}
        </div>
      </div>

      <div className="adm-grid-2 adm-grid-2--rev">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Recent activity</h3></div>
          <div className="adm-feed">
            {activity.map((a, i) => (
              <div className="adm-feed__item" key={i}>
                <span className="adm-feed__dot">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>
                </span>
                <div>
                  <div className="adm-feed__text"><b>{a.who}</b> {a.what}</div>
                  <div className="adm-feed__time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          <div className="adm-card-head" style={{ padding: "18px 20px 0" }}>
            <h3>Applications awaiting review</h3>
            <Link className="adm-link" to="/admin/enrollments">View all</Link>
          </div>
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead><tr><th>Applicant</th><th>Program</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {pendingList.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="adm-user">
                        <span className="adm-user__ph">{initials(e.name)}</span>
                        <div><div className="adm-user__name">{e.name}</div></div>
                      </div>
                    </td>
                    <td>{e.program}</td>
                    <td>{e.date}</td>
                    <td><span className="adm-badge adm-badge--yellow">{e.status}</span></td>
                  </tr>
                ))}
                {pendingList.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: "center", color: "#9a9a9a", padding: 24 }}>No pending applications.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
