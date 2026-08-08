import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminRole } from "../../context/AdminRoleContext.jsx";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import { learners, countryFromPhone, initials } from "./adminData.js";

function Learners() {
  const { isAdmin } = useAdminRole();
  const navigate = useNavigate();
  const [gender, setGender] = useState("All");

  const rows = learners
    .map((l) => ({ ...l, country: countryFromPhone(l.phone).country, flag: countryFromPhone(l.phone).flag }))
    .filter((l) => gender === "All" || l.gender === gender);

  const columns = [
    {
      key: "name", header: "Name",
      render: (l) => (
        <div className="adm-user">
          <span className="adm-user__ph">{initials(l.name)}</span>
          <div className="adm-user__name">{l.name}</div>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "gender", header: "Gender" },
    { key: "country", header: "Country", render: (l) => <>{l.flag} {l.country}</> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (l) => (
        <div className="adm-rowactions">
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => navigate(`/admin/learners/${l.id}`)}>View</button>
          {isAdmin && (
            <button className={`adm-btn-sm ${l.status === "Suspended" ? "" : "adm-btn-sm--danger"}`}>
              {l.status === "Suspended" ? "Reinstate" : "Suspend"}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Learners</h2>
          <p className="adm-page-head__sub">{learners.length} enrolled learners.</p>
        </div>
        <button className="dash-btn dash-btn--solid">Export CSV</button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={["name", "email", "country"]}
        searchPlaceholder="Search by name, email or country"
        initialSort={{ key: "name", dir: "asc" }}
        filters={
          <select className="adm-select" value={gender} onChange={(e) => setGender(e.target.value)}>
            {["All", "Male", "Female", "Other"].map((g) => <option key={g} value={g}>{g === "All" ? "All genders" : g}</option>)}
          </select>
        }
      />
    </div>
  );
}

export default Learners;
