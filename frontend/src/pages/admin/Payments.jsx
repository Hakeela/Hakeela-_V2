import { transactions, naira } from "./adminData.js";

const badge = { Success: "adm-badge--green", Pending: "adm-badge--yellow", Failed: "adm-badge--red" };

const stats = [
  { value: naira(1240000), label: "Revenue (30d)", bg: "#e4f6ec", color: "#1e9e5a" },
  { value: naira(85000), label: "Pending payouts", bg: "#fff4d6", color: "#c99700" },
  { value: "248", label: "Transactions", bg: "#eceafd", color: "#1a13d6" },
  { value: "3.1%", label: "Failure rate", bg: "#fdecec", color: "#d63a3a" },
];

function Payments() {
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

      <div className="adm-table-wrap">
        <div className="adm-card-head" style={{ padding: "18px 20px 0" }}>
          <h3>Recent transactions</h3>
        </div>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Reference</th><th>Payer</th><th>Item</th><th>Method</th><th>Amount</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="adm-user__sub" style={{ fontFamily: "monospace" }}>{t.id}</td>
                  <td className="adm-user__name">{t.name}</td>
                  <td>{t.item}</td>
                  <td>{t.method}</td>
                  <td>{naira(t.amount)}</td>
                  <td>{t.date}</td>
                  <td><span className={`adm-badge ${badge[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
