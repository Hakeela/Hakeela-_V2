import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/AdminUI/DataTable.jsx";
import Modal from "../../components/AdminUI/Modal.jsx";
import { getCourses, deleteCourse, getCategoriesFull, addCategory, deleteCategory } from "../../lib/admin.js";
import { naira } from "./adminData.js";

function CategoriesModal({ open, onClose }) {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = () => getCategoriesFull().then(setCats).catch(() => setCats([]));
  useEffect(() => { if (open) load(); }, [open]);

  const add = async () => {
    if (!name.trim()) return;
    setBusy(true); setError("");
    const { error } = await addCategory(name);
    setBusy(false);
    if (error) return setError(error);
    setName("");
    load();
  };
  const remove = async (id) => {
    await deleteCategory(id);
    load();
  };

  return (
    <Modal open={open} title="Manage categories" subtitle="Add or remove the categories courses can belong to." onClose={onClose}
      footer={<button className="dash-btn dash-btn--outline" onClick={onClose}>Done</button>}>
      {error && <div className="help-warning" style={{ marginBottom: 12 }}>{error}</div>}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input style={{ flex: 1, border: "1px solid #e4e4ea", borderRadius: 10, padding: "10px 14px", fontFamily: "inherit", fontSize: 14 }}
          placeholder="New category name" value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()} />
        <button className="dash-btn dash-btn--solid" onClick={add} disabled={busy}>{busy ? "Adding…" : "Add"}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cats.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #ececf0", borderRadius: 10, padding: "10px 14px" }}>
            <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{c.name}</span>
            <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => remove(c.id)}>Delete</button>
          </div>
        ))}
        {cats.length === 0 && <p className="ce-empty" style={{ margin: 0 }}>No categories yet.</p>}
      </div>
    </Modal>
  );
}

function AdminCourses() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [cat, setCat] = useState("All");
  const [managing, setManaging] = useState(false);

  useEffect(() => {
    let active = true;
    getCourses().then((r) => active && setRows(r)).catch(() => active && setRows([]));
    return () => { active = false; };
  }, []);

  const view = rows.filter((c) => cat === "All" || c.category === cat);

  const remove = (id) => {
    if (window.confirm("Delete this course? This removes all its modules, lessons, tests and assignments.")) {
      setRows((r) => r.filter((c) => c.id !== id));
      deleteCourse(id);
    }
  };
  const bulkDelete = async (ids) => {
    setRows((r) => r.filter((c) => !ids.includes(c.id)));
    await Promise.all(ids.map((id) => deleteCourse(id)));
  };

  const columns = [
    { key: "title", header: "Course", render: (c) => <span className="adm-user__name">{c.title}</span> },
    { key: "category", header: "Category" },
    { key: "modules", header: "Modules", align: "center" },
    { key: "lessons", header: "Lessons", align: "center", render: (c) => c.lessons ?? "—" },
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
        <div className="adm-rowactions">
          <button className="dash-btn dash-btn--outline" onClick={() => setManaging(true)}>Manage categories</button>
          <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/courses/new")}>+ New Course</button>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={view}
        searchKeys={["title", "category"]}
        searchPlaceholder="Search courses"
        initialSort={{ key: "title", dir: "asc" }}
        selectable
        onBulkDelete={bulkDelete}
        bulkNoun="course"
        filters={
          <select className="adm-select" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="All">All categories</option>
            {[...new Set(rows.map((c) => c.category).filter(Boolean))].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />

      <CategoriesModal open={managing} onClose={() => setManaging(false)} />
    </div>
  );
}

export default AdminCourses;
