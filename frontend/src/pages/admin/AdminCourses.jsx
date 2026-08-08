import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import { courses as seed, courseCategories, naira } from "./adminData.js";

function AdminCourses() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(seed);
  const [cat, setCat] = useState("All");

  const view = rows.filter((c) => cat === "All" || c.category === cat);

  const remove = (id) => {
    if (window.confirm("Delete this course? This removes all its modules, lessons, tests and assignments.")) {
      setRows((r) => r.filter((c) => c.id !== id));
    }
  };

  const columns = [
    { key: "title", header: "Course", render: (c) => <span className="adm-user__name">{c.title}</span> },
    { key: "category", header: "Category" },
    { key: "modules", header: "Modules", align: "center" },
    { key: "lessons", header: "Lessons", align: "center" },
    { key: "students", header: "Students", align: "center" },
    { key: "price", header: "Price", render: (c) => (c.price === 0 ? "Free" : naira(c.price)) },
    { key: "status", header: "Status", render: (c) => <span className={`adm-badge ${c.status === "Published" ? "adm-badge--green" : "adm-badge--gray"}`}>{c.status}</span> },
    {
      key: "actions", header: "Actions", sortable: false,
      render: (c) => (
        <div className="adm-rowactions">
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => navigate(`/admin/courses/${c.id}/edit`)}>Edit</button>
          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => remove(c.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Courses &amp; Programs</h2>
          <p className="adm-page-head__sub">Manage content, modules, lessons, tests, assignments, pricing and publishing.</p>
        </div>
        <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/courses/new")}>+ New Course</button>
      </div>

      <DataTable
        columns={columns}
        rows={view}
        searchKeys={["title", "category"]}
        searchPlaceholder="Search courses"
        initialSort={{ key: "title", dir: "asc" }}
        filters={
          <select className="adm-select" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="All">All categories</option>
            {courseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />
    </div>
  );
}

export default AdminCourses;
