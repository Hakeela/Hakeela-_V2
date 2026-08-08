import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses, courseCategories, sampleCurriculum } from "./adminData.js";

let _id = 1000;
const uid = () => `x${++_id}`;

function FileField({ label, hint, accept, value, onChange }) {
  return (
    <label className="ce-file">
      <span className="ce-file__label">{label}</span>
      <span className="ce-file__drop">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>{value ? value : hint}</span>
      </span>
      <input type="file" accept={accept} onChange={(e) => onChange(e.target.files[0]?.name || "")} hidden />
    </label>
  );
}

function Collapse({ open, title, badge, onToggle, onDelete, children }) {
  return (
    <div className={`ce-item ${open ? "is-open" : ""}`}>
      <div className="ce-item__head">
        <button type="button" className="ce-item__toggle" onClick={onToggle}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }}><polyline points="9 6 15 12 9 18"/></svg>
          <span className="ce-item__title">{title}</span>
          {badge != null && <span className="ce-item__badge">{badge}</span>}
        </button>
        <button type="button" className="adm-btn-sm adm-btn-sm--danger" onClick={onDelete}>Delete</button>
      </div>
      {open && <div className="ce-item__body">{children}</div>}
    </div>
  );
}

function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id && id !== "new" ? courses.find((c) => c.id === id) : null;

  const [details, setDetails] = useState({
    title: existing?.title || "",
    category: existing?.category || courseCategories[0],
    price: existing?.price ?? 5000,
    status: existing?.status || "Draft",
    description: "",
    thumbnail: "",
  });

  const [modules, setModules] = useState(() =>
    existing ? sampleCurriculum.modules.map((m) => ({ ...m, _open: false })) : []
  );
  const [tests, setTests] = useState(() =>
    existing ? sampleCurriculum.tests.map((t) => ({ ...t, _open: false })) : []
  );
  const [assignments, setAssignments] = useState(() =>
    existing ? sampleCurriculum.assignments.map((a) => ({ ...a, _open: false })) : []
  );

  const set = (k, v) => setDetails((d) => ({ ...d, [k]: v }));

  // ---- modules & lessons ----
  const addModule = () => setModules((m) => [...m, { id: uid(), name: `Module ${m.length + 1}`, lessons: [], _open: true }]);
  const delModule = (mid) => setModules((m) => m.filter((x) => x.id !== mid));
  const toggleModule = (mid) => setModules((m) => m.map((x) => (x.id === mid ? { ...x, _open: !x._open } : x)));
  const patchModule = (mid, patch) => setModules((m) => m.map((x) => (x.id === mid ? { ...x, ...patch } : x)));
  const addLesson = (mid) => patchModuleLessons(mid, (ls) => [...ls, { id: uid(), title: "New lesson", duration: "", video: "", transcript: "" }]);
  const delLesson = (mid, lid) => patchModuleLessons(mid, (ls) => ls.filter((l) => l.id !== lid));
  const patchLesson = (mid, lid, patch) => patchModuleLessons(mid, (ls) => ls.map((l) => (l.id === lid ? { ...l, ...patch } : l)));
  const patchModuleLessons = (mid, fn) => setModules((m) => m.map((x) => (x.id === mid ? { ...x, lessons: fn(x.lessons) } : x)));

  // ---- tests & questions ----
  const addTest = () => setTests((t) => [...t, { id: uid(), title: "New test", questions: [], _open: true }]);
  const delTest = (tid) => setTests((t) => t.filter((x) => x.id !== tid));
  const toggleTest = (tid) => setTests((t) => t.map((x) => (x.id === tid ? { ...x, _open: !x._open } : x)));
  const patchTest = (tid, patch) => setTests((t) => t.map((x) => (x.id === tid ? { ...x, ...patch } : x)));
  const addQuestion = (tid) => patchTestQs(tid, (qs) => [...qs, { id: uid(), question: "", options: "", answer: "" }]);
  const delQuestion = (tid, qid) => patchTestQs(tid, (qs) => qs.filter((q) => q.id !== qid));
  const patchQuestion = (tid, qid, patch) => patchTestQs(tid, (qs) => qs.map((q) => (q.id === qid ? { ...q, ...patch } : q)));
  const patchTestQs = (tid, fn) => setTests((t) => t.map((x) => (x.id === tid ? { ...x, questions: fn(x.questions) } : x)));

  // ---- assignments ----
  const addAssignment = () => setAssignments((a) => [...a, { id: uid(), title: "New assignment", description: "", due: "", _open: true }]);
  const delAssignment = (aid) => setAssignments((a) => a.filter((x) => x.id !== aid));
  const toggleAssignment = (aid) => setAssignments((a) => a.map((x) => (x.id === aid ? { ...x, _open: !x._open } : x)));
  const patchAssignment = (aid, patch) => setAssignments((a) => a.map((x) => (x.id === aid ? { ...x, ...patch } : x)));

  const deleteCourse = () => {
    if (window.confirm("Delete this entire course? All modules, lessons, tests and assignments will be removed.")) {
      navigate("/admin/courses");
    }
  };

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/courses")} style={{ marginBottom: 16 }}>← Back to courses</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">{existing ? "Edit course" : "New course"}</h2>
          <p className="adm-page-head__sub">{existing ? existing.title : "Set up a new course, its curriculum and assessments."}</p>
        </div>
        <div className="adm-rowactions">
          <button className="dash-btn dash-btn--outline" onClick={() => navigate("/admin/courses")}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/courses")}>Save course</button>
        </div>
      </div>

      {/* Details */}
      <div className="dash-card ce-section">
        <div className="adm-card-head"><h3>Course details</h3></div>
        <div className="adm-form-grid">
          <div className="adm-field adm-field--full">
            <label>Title</label>
            <input value={details.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Data Analysis" />
          </div>
          <div className="adm-field">
            <label>Category</label>
            <select value={details.category} onChange={(e) => set("category", e.target.value)}>
              {courseCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="adm-field">
            <label>Price (₦, 0 = free)</label>
            <input type="number" value={details.price} onChange={(e) => set("price", e.target.value)} />
          </div>
          <div className="adm-field">
            <label>Status</label>
            <select value={details.status} onChange={(e) => set("status", e.target.value)}>
              <option>Draft</option><option>Published</option>
            </select>
          </div>
          <div className="adm-field">
            <FileField label="Thumbnail" hint="Upload cover image" accept="image/*" value={details.thumbnail} onChange={(v) => set("thumbnail", v)} />
          </div>
          <div className="adm-field adm-field--full">
            <label>Description</label>
            <textarea value={details.description} onChange={(e) => set("description", e.target.value)} placeholder="What will learners gain from this course?" />
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="dash-card ce-section">
        <div className="adm-card-head">
          <h3>Curriculum — modules &amp; lessons</h3>
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={addModule}>+ Add module</button>
        </div>
        {modules.length === 0 && <p className="ce-empty">No modules yet. Add your first module.</p>}
        {modules.map((m) => (
          <Collapse key={m.id} open={m._open} title={m.name} badge={`${m.lessons.length} lessons`} onToggle={() => toggleModule(m.id)} onDelete={() => delModule(m.id)}>
            <div className="adm-field" style={{ marginBottom: 14 }}>
              <label>Module name</label>
              <input value={m.name} onChange={(e) => patchModule(m.id, { name: e.target.value })} />
            </div>
            <div className="ce-sub-head">
              <span>Lessons</span>
              <button className="adm-btn-sm" onClick={() => addLesson(m.id)}>+ Add lesson</button>
            </div>
            {m.lessons.map((l) => (
              <div className="ce-lesson" key={l.id}>
                <div className="adm-form-grid">
                  <div className="adm-field">
                    <label>Lesson title</label>
                    <input value={l.title} onChange={(e) => patchLesson(m.id, l.id, { title: e.target.value })} />
                  </div>
                  <div className="adm-field">
                    <label>Duration</label>
                    <input value={l.duration} onChange={(e) => patchLesson(m.id, l.id, { duration: e.target.value })} placeholder="e.g. 25 min" />
                  </div>
                  <div className="adm-field">
                    <FileField label="Lesson video" hint="Upload video" accept="video/*" value={l.video} onChange={(v) => patchLesson(m.id, l.id, { video: v })} />
                  </div>
                  <div className="adm-field">
                    <label>&nbsp;</label>
                    <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => delLesson(m.id, l.id)}>Delete lesson</button>
                  </div>
                  <div className="adm-field adm-field--full">
                    <label>Transcript</label>
                    <textarea value={l.transcript} onChange={(e) => patchLesson(m.id, l.id, { transcript: e.target.value })} placeholder="Lesson transcript / notes" />
                  </div>
                </div>
              </div>
            ))}
            {m.lessons.length === 0 && <p className="ce-empty">No lessons in this module yet.</p>}
          </Collapse>
        ))}
      </div>

      {/* Tests */}
      <div className="dash-card ce-section">
        <div className="adm-card-head">
          <h3>Tests &amp; quizzes</h3>
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={addTest}>+ Add test</button>
        </div>
        {tests.length === 0 && <p className="ce-empty">No tests yet.</p>}
        {tests.map((t) => (
          <Collapse key={t.id} open={t._open} title={t.title} badge={`${t.questions.length} questions`} onToggle={() => toggleTest(t.id)} onDelete={() => delTest(t.id)}>
            <div className="adm-field" style={{ marginBottom: 14 }}>
              <label>Test title</label>
              <input value={t.title} onChange={(e) => patchTest(t.id, { title: e.target.value })} />
            </div>
            <div className="ce-sub-head">
              <span>Questions</span>
              <button className="adm-btn-sm" onClick={() => addQuestion(t.id)}>+ Add question</button>
            </div>
            {t.questions.map((qn, i) => (
              <div className="ce-lesson" key={qn.id}>
                <div className="adm-form-grid">
                  <div className="adm-field adm-field--full">
                    <label>Question {i + 1}</label>
                    <input value={qn.question} onChange={(e) => patchQuestion(t.id, qn.id, { question: e.target.value })} placeholder="Enter the question" />
                  </div>
                  <div className="adm-field">
                    <label>Options (comma separated)</label>
                    <input value={qn.options} onChange={(e) => patchQuestion(t.id, qn.id, { options: e.target.value })} placeholder="A, B, C, D" />
                  </div>
                  <div className="adm-field">
                    <label>Correct answer</label>
                    <input value={qn.answer} onChange={(e) => patchQuestion(t.id, qn.id, { answer: e.target.value })} />
                  </div>
                  <div className="adm-field adm-field--full">
                    <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => delQuestion(t.id, qn.id)}>Delete question</button>
                  </div>
                </div>
              </div>
            ))}
            {t.questions.length === 0 && <p className="ce-empty">No questions yet.</p>}
          </Collapse>
        ))}
      </div>

      {/* Assignments */}
      <div className="dash-card ce-section">
        <div className="adm-card-head">
          <h3>Assignments</h3>
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={addAssignment}>+ Add assignment</button>
        </div>
        {assignments.length === 0 && <p className="ce-empty">No assignments yet.</p>}
        {assignments.map((a) => (
          <Collapse key={a.id} open={a._open} title={a.title} onToggle={() => toggleAssignment(a.id)} onDelete={() => delAssignment(a.id)}>
            <div className="adm-form-grid">
              <div className="adm-field">
                <label>Assignment title</label>
                <input value={a.title} onChange={(e) => patchAssignment(a.id, { title: e.target.value })} />
              </div>
              <div className="adm-field">
                <label>Due</label>
                <input value={a.due} onChange={(e) => patchAssignment(a.id, { due: e.target.value })} placeholder="e.g. 2 weeks" />
              </div>
              <div className="adm-field adm-field--full">
                <label>Instructions</label>
                <textarea value={a.description} onChange={(e) => patchAssignment(a.id, { description: e.target.value })} placeholder="Describe what learners must submit" />
              </div>
            </div>
          </Collapse>
        ))}
      </div>

      {/* Danger zone */}
      {existing && (
        <div className="dash-card ce-danger">
          <div>
            <h3>Delete course</h3>
            <p>Permanently remove this course and all of its modules, lessons, tests and assignments.</p>
          </div>
          <button className="adm-btn-sm adm-btn-sm--danger" onClick={deleteCourse}>Delete course</button>
        </div>
      )}
    </div>
  );
}

export default CourseEditor;
