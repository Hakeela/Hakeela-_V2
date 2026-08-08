import { useState } from "react";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import { transactions, naira } from "./adminData.js";

const badge = { Success: "adm-badge--green", Pending: "adm-badge--yellow", Failed: "adm-badge--red" };

const stats = [
  { value: naira(1240000), label: "Revenue (30d)", bg: "#e4f6ec", color: "#1e9e5a" },
  { value: naira(85000), label: "Pending payouts", bg: "#fff4d6", color: "#c99700" },
  { value: "248", label: "Transactions", bg: "#eceafd", color: "#1a13d6" },
  { value: "3.1%", label: "Failure rate", bg: "#fdecec", color: "#d63a3a" },
];

function Payments() {
  const [status, setStatus] = useState("All");
  const view = transactions.filter((t) => status === "All" || t.status === status);

  const columns = [
    { key: "id", header: "Reference", render: (t) => <span className="adm-user__sub" style={{ fontFamily: "monospace" }}>{t.id}</span> },
    { key: "name", header: "Payer", render: (t) => <span className="adm-user__name">{t.name}</span> },
    { key: "item", header: "Item" },
    { key: "method", header: "Method" },
    { key: "amount", header: "Amount", render: (t) => naira(t.amount) },
    { key: "date", header: "Date" },
    { key: "status", header: "Status", render: (t) => <span className={`adm-badge ${badge[t.status]}`}>{t.status}</span> },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Payments &amp; Finance</h2>
          <p className="adm-page-head__sub">Program fees and certificate payments. Admin only.</p>
        </div>
        <button className="dash-btn dash-btn--solid">Export report</button>
      </div>

      <div className="adm-kpis">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__icon" style={{ background: s.bg, color: s.color }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>
            </span>
            <div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={view}
        searchKeys={["id", "name", "item"]}
        searchPlaceholder="Search transactions"
        initialSort={{ key: "date", dir: "desc" }}
        minWidth={760}
        filters={
          <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {["All", "Success", "Pending", "Failed"].map((s) => <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}
          </select>
        }
      />
    </div>
  );
}

export default Payments;
