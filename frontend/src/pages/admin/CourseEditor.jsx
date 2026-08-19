import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isSupabaseConfigured } from "../../lib/supabase.js";
import { getCourseForEdit, saveCourse, deleteCourse } from "../../lib/admin.js";
import { getCategories } from "../../lib/data.js";
import { LESSON_TYPES, lessonTypeAccept, lessonTypeLabel } from "../../lib/lessonTypes.js";
import { courses, courseCategories, sampleCurriculum } from "./adminData.js";

let _id = 2000;
const uid = () => `x${++_id}`;

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);

/** Upload field with live preview + remove. Handles image/video/audio inline;
 *  other file kinds (pdf/slides/document) show a file chip. value: {name,url}|null */
function UploadField({ label, kind, accept, value, onChange, onRemove }) {
  return (
    <div>
      <span className="ce-file__label">{label}</span>
      {value ? (
        <div className="ce-upload__preview">
          {value.url && kind === "image" && <img src={value.url} alt="preview" />}
          {value.url && kind === "video" && <video src={value.url} controls />}
          {value.url && kind === "audio" && <audio src={value.url} controls style={{ width: "100%" }} />}
          {value.url && !["image", "video", "audio"].includes(kind) && (
            <div className="ce-file-chip"><UploadIcon /> {value.name}</div>
          )}
          {!value.url && (
            <div style={{ padding: 18, color: "#c9c9d4", display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
              <UploadIcon /> {value.name} <span style={{ fontSize: 12 }}>· preview appears after re-upload</span>
            </div>
          )}
          <button type="button" className="ce-upload__remove" onClick={onRemove}>
            <TrashIcon /> Remove
          </button>
        </div>
      ) : (
        <label className="ce-file__drop">
          <UploadIcon />
          <span>Click to upload {kind}</span>
          <input
            type="file"
            accept={accept}
            hidden
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) onChange({ name: f.name, url: URL.createObjectURL(f), type: f.type, file: f });
            }}
          />
        </label>
      )}
    </div>
  );
}

function ModuleHead({ open, name, count, onToggle, onDelete }) {
  return (
    <div className="ce-item__head">
      <button type="button" className="ce-item__toggle" onClick={onToggle}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }}><polyline points="9 6 15 12 9 18"/></svg>
        <span className="ce-item__title">{name}</span>
        <span className="ce-item__badge">{count} lessons</span>
      </button>
      <button type="button" className="adm-btn-sm adm-btn-sm--danger" onClick={onDelete}>Delete module</button>
    </div>
  );
}

function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "new";
  // Demo mode uses the mock course + sample curriculum; real mode fetches below.
  const demoExisting = !isSupabaseConfigured && isEdit ? courses.find((c) => c.id === id) : null;

  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(isEdit && isSupabaseConfigured);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(courseCategories);
  const [addingCat, setAddingCat] = useState(false);

  useEffect(() => {
    let active = true;
    getCategories().then((c) => active && c.length && setCategories(c)).catch(() => {});
    return () => { active = false; };
  }, []);

  const [details, setDetails] = useState({
    title: demoExisting?.title || "",
    category: demoExisting?.category || courseCategories[0],
    price: demoExisting?.price ?? 5000,
    status: demoExisting?.status || "Draft",
    description: "",
    thumbnail: null,
  });

  const [modules, setModules] = useState(() => {
    if (!demoExisting) return [];
    return sampleCurriculum.modules.map((m, mi) => ({
      id: m.id,
      name: m.name,
      _open: mi === 0,
      lessons: m.lessons.map((l, li) => ({
        id: l.id,
        title: l.title,
        duration: l.duration,
        type: "video",
        content: l.video ? { name: l.video, url: "" } : null,
        transcript: l.transcript || "",
        tests: mi === 0 && li === 0 ? sampleCurriculum.tests.map((t) => ({ ...t, questions: t.questions.map((q) => ({ ...q })) })) : [],
        assignments: mi === 0 && li === 0 ? sampleCurriculum.assignments.map((a) => ({ ...a })) : [],
      })),
    }));
  });

  // Real mode: load the existing course from Supabase
  useEffect(() => {
    if (!isEdit || !isSupabaseConfigured) return;
    let active = true;
    getCourseForEdit(id)
      .then((c) => {
        if (!active || !c) return;
        setCourseId(c.courseId);
        setDetails(c.details);
        setModules(c.modules);
      })
      .catch((e) => active && setError(e.message || "Failed to load course"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id, isEdit]);

  const set = (k, v) => setDetails((d) => ({ ...d, [k]: v }));

  // ---- nested state patchers ----
  const patchModule = (mid, patch) => setModules((ms) => ms.map((m) => (m.id === mid ? { ...m, ...patch } : m)));
  const patchLessons = (mid, fn) => setModules((ms) => ms.map((m) => (m.id === mid ? { ...m, lessons: fn(m.lessons) } : m)));
  const patchLesson = (mid, lid, patch) => patchLessons(mid, (ls) => ls.map((l) => (l.id === lid ? { ...l, ...patch } : l)));
  const patchTests = (mid, lid, fn) => patchLessons(mid, (ls) => ls.map((l) => (l.id === lid ? { ...l, tests: fn(l.tests) } : l)));
  const patchAssignments = (mid, lid, fn) => patchLessons(mid, (ls) => ls.map((l) => (l.id === lid ? { ...l, assignments: fn(l.assignments) } : l)));
  const patchQuestions = (mid, lid, tid, fn) => patchTests(mid, lid, (ts) => ts.map((t) => (t.id === tid ? { ...t, questions: fn(t.questions) } : t)));

  const addModule = () => setModules((m) => [...m, { id: uid(), name: `Module ${m.length + 1}`, _open: true, lessons: [] }]);
  const delModule = (mid) => setModules((m) => m.filter((x) => x.id !== mid));
  const toggleModule = (mid) => setModules((ms) => ms.map((m) => (m.id === mid ? { ...m, _open: !m._open } : m)));

  const addLesson = (mid) => patchLessons(mid, (ls) => [...ls, { id: uid(), title: "New lesson", duration: "", type: "video", content: null, transcript: "", tests: [], assignments: [], _open: true }]);
  const delLesson = (mid, lid) => patchLessons(mid, (ls) => ls.filter((l) => l.id !== lid));
  const toggleLessonFlag = (mid, lid, flag) =>
    setModules((ms) => ms.map((m) => (m.id === mid ? { ...m, lessons: m.lessons.map((l) => (l.id === lid ? { ...l, [flag]: !l[flag] } : l)) } : m)));

  const addTest = (mid, lid) => patchTests(mid, lid, (ts) => [...ts, { id: uid(), title: "New test", questions: [] }]);
  const delTest = (mid, lid, tid) => patchTests(mid, lid, (ts) => ts.filter((t) => t.id !== tid));
  const addQuestion = (mid, lid, tid) => patchQuestions(mid, lid, tid, (qs) => [...qs, { id: uid(), question: "", options: "", answer: "" }]);
  const delQuestion = (mid, lid, tid, qid) => patchQuestions(mid, lid, tid, (qs) => qs.filter((q) => q.id !== qid));

  const addAssignment = (mid, lid) => patchAssignments(mid, lid, (as) => [...as, { id: uid(), title: "New assignment", description: "", due: "" }]);
  const delAssignment = (mid, lid, aid) => patchAssignments(mid, lid, (as) => as.filter((a) => a.id !== aid));

  const handleDelete = async () => {
    if (window.confirm("Delete this entire course? All modules, lessons, tests and assignments will be removed.")) {
      if (courseId) await deleteCourse(courseId);
      navigate("/admin/courses");
    }
  };

  const handleSave = async () => {
    if (!details.title.trim()) return setError("Please enter a course title.");
    setError("");
    setBusy(true);
    const { error } = await saveCourse(courseId, details, modules);
    setBusy(false);
    if (error) return setError(error);
    navigate("/admin/courses");
  };

  if (loading) return <div className="dashpg"><p style={{ color: "#8a8a8a" }}>Loading course…</p></div>;

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/courses")} style={{ marginBottom: 16 }}>← Back to courses</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">{isEdit ? "Edit course" : "New course"}</h2>
          <p className="adm-page-head__sub">{isEdit ? details.title : "Set up a new course, its curriculum and assessments."}</p>
        </div>
        <div className="adm-rowactions">
          <button className="dash-btn dash-btn--outline" onClick={() => navigate("/admin/courses")}>Cancel</button>
          <button className="dash-btn dash-btn--solid" onClick={handleSave} disabled={busy}>{busy ? "Saving…" : "Save course"}</button>
        </div>
      </div>

      {error && <div className="help-warning" style={{ marginBottom: 16 }}>{error}</div>}

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
            {addingCat ? (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  autoFocus
                  style={{ flex: 1 }}
                  placeholder="New category name"
                  value={details.category}
                  onChange={(e) => set("category", e.target.value)}
                />
                <button type="button" className="adm-btn-sm" onClick={() => { setAddingCat(false); set("category", categories[0] || ""); }}>Cancel</button>
              </div>
            ) : (
              <select
                value={details.category}
                onChange={(e) => {
                  if (e.target.value === "__new__") { setAddingCat(true); set("category", ""); }
                  else set("category", e.target.value);
                }}
              >
                {!categories.includes(details.category) && details.category && <option value={details.category}>{details.category}</option>}
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                <option value="__new__">➕ Add new category…</option>
              </select>
            )}
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
            <UploadField label="Thumbnail" kind="image" accept="image/*" value={details.thumbnail} onChange={(v) => set("thumbnail", v)} onRemove={() => set("thumbnail", null)} />
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
          <h3>Curriculum — modules, lessons, tests &amp; assignments</h3>
          <button className="adm-btn-sm adm-btn-sm--primary" onClick={addModule}>+ Add module</button>
        </div>
        {modules.length === 0 && <p className="ce-empty">No modules yet. Add your first module.</p>}

        {modules.map((m) => (
          <div className={`ce-item ${m._open ? "is-open" : ""}`} key={m.id}>
            <ModuleHead open={m._open} name={m.name} count={m.lessons.length} onToggle={() => toggleModule(m.id)} onDelete={() => delModule(m.id)} />
            {m._open && (
              <div className="ce-item__body">
                <div className="adm-field" style={{ marginBottom: 14 }}>
                  <label>Module name</label>
                  <input value={m.name} onChange={(e) => patchModule(m.id, { name: e.target.value })} />
                </div>

                <div className="ce-sub-head">
                  <span>Lessons</span>
                  <button className="adm-btn-sm" onClick={() => addLesson(m.id)}>+ Add lesson</button>
                </div>

                {m.lessons.map((l) => (
                  <div className={`ce-item ce-lesson-item ${l._open ? "is-open" : ""}`} key={l.id}>
                    <div className="ce-item__head">
                      <button type="button" className="ce-item__toggle" onClick={() => toggleLessonFlag(m.id, l.id, "_open")}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: l._open ? "rotate(90deg)" : "none", transition: "transform .15s" }}><polyline points="9 6 15 12 9 18" /></svg>
                        <span className="ce-item__title">{l.title || "Untitled lesson"}</span>
                      </button>
                    </div>
                    {l._open && (
                    <div className="ce-item__body">
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
                        <label>Lesson type</label>
                        <select
                          value={l.type || "video"}
                          onChange={(e) => patchLesson(m.id, l.id, { type: e.target.value, content: null })}
                        >
                          {LESSON_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>

                      {(l.type || "video") === "text" ? (
                        <div className="adm-field adm-field--full">
                          <label>Lesson content</label>
                          <textarea value={l.transcript} onChange={(e) => patchLesson(m.id, l.id, { transcript: e.target.value })} placeholder="Write the lesson text here" />
                        </div>
                      ) : (
                        <>
                          <div className="adm-field adm-field--full">
                            <UploadField
                              label={`Lesson ${lessonTypeLabel(l.type).toLowerCase()} file`}
                              kind={l.type || "video"}
                              accept={lessonTypeAccept(l.type)}
                              value={l.content}
                              onChange={(v) => patchLesson(m.id, l.id, { content: v })}
                              onRemove={() => patchLesson(m.id, l.id, { content: null })}
                            />
                          </div>
                          <div className="adm-field adm-field--full">
                            <label>Transcript / notes</label>
                            <textarea value={l.transcript} onChange={(e) => patchLesson(m.id, l.id, { transcript: e.target.value })} placeholder="Lesson transcript / notes (optional)" />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Lesson delete — under the transcript, trash icon + tooltip */}
                    <div className="ce-lesson__foot">
                      <button className="ce-trash" data-tip="Delete lesson" aria-label="Delete lesson" onClick={() => delLesson(m.id, l.id)}>
                        <TrashIcon />
                      </button>
                    </div>

                    {/* Tests under the lesson (collapsible) */}
                    <div className="ce-subblock">
                      <div className="ce-subblock__head">
                        <button type="button" className="ce-subblock__toggle" onClick={() => toggleLessonFlag(m.id, l.id, "_testsOpen")}>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: l._testsOpen ? "rotate(90deg)" : "none", transition: "transform .15s" }}><polyline points="9 6 15 12 9 18" /></svg>
                          Tests &amp; quizzes ({l.tests.length})
                        </button>
                        <button className="adm-btn-sm" onClick={() => { if (!l._testsOpen) toggleLessonFlag(m.id, l.id, "_testsOpen"); addTest(m.id, l.id); }}>+ Add test</button>
                      </div>
                      {l._testsOpen && (<>
                      {l.tests.length === 0 && <p className="ce-empty" style={{ margin: 0 }}>No tests for this lesson.</p>}
                      {l.tests.map((t) => (
                        <div className="ce-mini" key={t.id}>
                          <div className="adm-form-grid">
                            <div className="adm-field adm-field--full">
                              <label>Test title</label>
                              <input value={t.title} onChange={(e) => patchTests(m.id, l.id, (ts) => ts.map((x) => (x.id === t.id ? { ...x, title: e.target.value } : x)))} />
                            </div>
                          </div>
                          <div className="ce-sub-head" style={{ margin: "10px 0 8px" }}>
                            <span>Questions</span>
                            <button className="adm-btn-sm" onClick={() => addQuestion(m.id, l.id, t.id)}>+ Add question</button>
                          </div>
                          {t.questions.map((qn, i) => (
                            <div className="adm-form-grid" key={qn.id} style={{ marginBottom: 8 }}>
                              <div className="adm-field adm-field--full">
                                <label>Question {i + 1}</label>
                                <input value={qn.question} onChange={(e) => patchQuestions(m.id, l.id, t.id, (qs) => qs.map((x) => (x.id === qn.id ? { ...x, question: e.target.value } : x)))} placeholder="Enter the question" />
                              </div>
                              <div className="adm-field">
                                <label>Options (comma separated)</label>
                                <input value={qn.options} onChange={(e) => patchQuestions(m.id, l.id, t.id, (qs) => qs.map((x) => (x.id === qn.id ? { ...x, options: e.target.value } : x)))} placeholder="A, B, C, D" />
                              </div>
                              <div className="adm-field">
                                <label>Correct answer</label>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <input style={{ flex: 1 }} value={qn.answer} onChange={(e) => patchQuestions(m.id, l.id, t.id, (qs) => qs.map((x) => (x.id === qn.id ? { ...x, answer: e.target.value } : x)))} />
                                  <button className="ce-trash" data-tip="Delete question" aria-label="Delete question" onClick={() => delQuestion(m.id, l.id, t.id, qn.id)}><TrashIcon /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => delTest(m.id, l.id, t.id)}>Delete test</button>
                        </div>
                      ))}
                      </>)}
                    </div>

                    {/* Assignments under the lesson (collapsible) */}
                    <div className="ce-subblock">
                      <div className="ce-subblock__head">
                        <button type="button" className="ce-subblock__toggle" onClick={() => toggleLessonFlag(m.id, l.id, "_asgOpen")}>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: l._asgOpen ? "rotate(90deg)" : "none", transition: "transform .15s" }}><polyline points="9 6 15 12 9 18" /></svg>
                          Assignments ({l.assignments.length})
                        </button>
                        <button className="adm-btn-sm" onClick={() => { if (!l._asgOpen) toggleLessonFlag(m.id, l.id, "_asgOpen"); addAssignment(m.id, l.id); }}>+ Add assignment</button>
                      </div>
                      {l._asgOpen && (<>
                      {l.assignments.length === 0 && <p className="ce-empty" style={{ margin: 0 }}>No assignments for this lesson.</p>}
                      {l.assignments.map((a) => (
                        <div className="ce-mini" key={a.id}>
                          <div className="adm-form-grid">
                            <div className="adm-field">
                              <label>Assignment title</label>
                              <input value={a.title} onChange={(e) => patchAssignments(m.id, l.id, (as) => as.map((x) => (x.id === a.id ? { ...x, title: e.target.value } : x)))} />
                            </div>
                            <div className="adm-field">
                              <label>Due</label>
                              <input value={a.due} onChange={(e) => patchAssignments(m.id, l.id, (as) => as.map((x) => (x.id === a.id ? { ...x, due: e.target.value } : x)))} placeholder="e.g. 2 weeks" />
                            </div>
                            <div className="adm-field adm-field--full">
                              <label>Instructions</label>
                              <textarea value={a.description} onChange={(e) => patchAssignments(m.id, l.id, (as) => as.map((x) => (x.id === a.id ? { ...x, description: e.target.value } : x)))} placeholder="Describe what learners must submit" />
                            </div>
                          </div>
                          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => delAssignment(m.id, l.id, a.id)}>Delete assignment</button>
                        </div>
                      ))}
                      </>)}
                    </div>
                    </div>
                    )}
                  </div>
                ))}
                {m.lessons.length === 0 && <p className="ce-empty">No lessons in this module yet.</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Danger zone */}
      {isEdit && (
        <div className="dash-card ce-danger">
          <div>
            <h3>Delete course</h3>
            <p>Permanently remove this course and all of its modules, lessons, tests and assignments.</p>
          </div>
          <button className="adm-btn-sm adm-btn-sm--danger" onClick={handleDelete}>Delete course</button>
        </div>
      )}
    </div>
  );
}

export default CourseEditor;
