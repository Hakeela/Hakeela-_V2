import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses as seed, courseCategories, naira } from "./adminData.js";

function AdminCourses() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(seed);
  const [cat, setCat] = useState("All");

  const cats = ["All", ...courseCategories];
  const view = rows.filter((c) => cat === "All" || c.category === cat);

  const remove = (id) => {
    if (window.confirm("Delete this course? This removes all its modules, lessons, tests and assignments.")) {
      setRows((r) => r.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="dashpg">
      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Courses &amp; Programs</h2>
          <p className="adm-page-head__sub">Manage content, modules, lessons, tests, assignments, pricing and publishing.</p>
        </div>
        <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/courses/new")}>+ New Course</button>
      </div>

      <div className="adm-toolbar">
        {cats.map((c) => (
          <button key={c} className={`adm-btn-sm ${cat === c ? "adm-btn-sm--primary" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr><th>Course</th><th>Category</th><th>Modules</th><th>Lessons</th><th>Students</th><th>Price</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {view.map((c) => (
                <tr key={c.id}>
                  <td className="adm-user__name">{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.modules}</td>
                  <td>{c.lessons}</td>
                  <td>{c.students}</td>
                  <td>{c.price === 0 ? "Free" : naira(c.price)}</td>
                  <td><span className={`adm-badge ${c.status === "Published" ? "adm-badge--green" : "adm-badge--gray"}`}>{c.status}</span></td>
                  <td>
                    <div className="adm-rowactions">
                      <button className="adm-btn-sm adm-btn-sm--primary" onClick={() => navigate(`/admin/courses/${c.id}/edit`)}>Edit</button>
                      <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => remove(c.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#9a9a9a", padding: 32 }}>No courses in this category.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCourses;
