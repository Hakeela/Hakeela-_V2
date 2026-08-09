import { supabase, isSupabaseConfigured } from "./supabase.js";
import * as mock from "../pages/admin/adminData.js";

/**
 * Admin/staff data-service layer.
 * Queries Supabase when configured; otherwise returns the demo mock data from
 * pages/admin/adminData.js so the portal stays explorable without keys.
 */

// ---- display <-> db mappers ----
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const roleToDisplay = (r) => (r === "admin" ? "Admin" : "Staff");
const roleToDb = (d) => (d === "Admin" ? "admin" : "staff");
const enrollToDisplay = (s) => cap(s || "pending");
const enrollToDb = (d) => (d || "Pending").toLowerCase();
const payToDisplay = (p) => cap(p || "unpaid");
const payToDb = (d) => (d || "Unpaid").toLowerCase();
const certStatusToDisplay = (s) =>
  s === "issued" ? "Issued" : s === "ready" ? "Ready to issue" : "Awaiting payment";
const monthYear = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
const dayDate = (iso) => (iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "");

// ---------------- Learners ----------------
export async function getLearners() {
  if (!isSupabaseConfigured) return mock.learners;
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, gender, phone, status, created_at")
    .eq("role", "student")
    .order("full_name");
  if (error) throw error;
  return (data || []).map((p) => ({
    id: p.id, name: p.full_name || "—", email: p.email || "", gender: p.gender || "—",
    phone: p.phone || "", status: cap(p.status || "active"), joined: monthYear(p.created_at), courses: [],
  }));
}

export async function getLearner(id) {
  if (!isSupabaseConfigured) return mock.learners.find((l) => l.id === id);
  const { data: p, error } = await supabase
    .from("profiles").select("id, full_name, email, gender, phone, status, created_at").eq("id", id).single();
  if (error) throw error;
  const { data: enr } = await supabase
    .from("enrollments").select("status, course:courses(title)").eq("user_id", id);
  return {
    id: p.id, name: p.full_name || "—", email: p.email || "", gender: p.gender || "—",
    phone: p.phone || "", status: cap(p.status || "active"), joined: monthYear(p.created_at),
    courses: (enr || []).map((e) => ({
      title: e.course?.title || "—",
      progress: e.status === "completed" ? 100 : 0,
      status: e.status === "completed" ? "Completed" : e.status === "pending" ? "Not Started" : "In Progress",
      score: null,
    })),
  };
}

export async function setLearnerStatus(id, status) {
  if (!isSupabaseConfigured) return;
  await supabase.from("profiles").update({ status }).eq("id", id);
}

export async function deleteLearner(id) {
  if (!isSupabaseConfigured) return;
  await supabase.from("profiles").delete().eq("id", id);
}

export async function updateLearner(id, { name, email, gender, phone }) {
  if (!isSupabaseConfigured) return;
  await supabase.from("profiles").update({ full_name: name, email, gender, phone }).eq("id", id);
}

// Sends a password-reset email to the learner (client can't set another user's
// password directly — that needs a service-role Edge Function).
export async function sendLearnerPasswordReset(email) {
  if (!isSupabaseConfigured || !email) return;
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
}

// ---------------- Staff ----------------
export async function getStaff() {
  if (!isSupabaseConfigured) return mock.staff;
  const { data, error } = await supabase
    .from("profiles").select("id, full_name, email, role, status").in("role", ["staff", "admin"]).order("full_name");
  if (error) throw error;
  return (data || []).map((p) => ({
    id: p.id, name: p.full_name || "—", email: p.email || "", role: roleToDisplay(p.role),
    status: p.status === "suspended" ? "Suspended" : "Active",
  }));
}

export async function changeStaffRole(id, roleDisplay) {
  if (!isSupabaseConfigured) return;
  await supabase.from("profiles").update({ role: roleToDb(roleDisplay) }).eq("id", id);
}

export async function removeStaff(id) {
  // Demotes to student (removing an auth user requires a service-role edge function).
  if (!isSupabaseConfigured) return;
  await supabase.from("profiles").update({ role: "student" }).eq("id", id);
}

// ---------------- Enrollments ----------------
export async function getEnrollments() {
  if (!isSupabaseConfigured) return mock.enrollments;
  const { data, error } = await supabase
    .from("enrollments")
    .select("id, status, created_at, profile:profiles(full_name), course:courses(title)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((e) => ({
    id: e.id, name: e.profile?.full_name || "—", program: e.course?.title || "—",
    date: dayDate(e.created_at), status: enrollToDisplay(e.status),
  }));
}

export async function setEnrollmentStatus(id, statusDisplay) {
  if (!isSupabaseConfigured) return;
  await supabase.from("enrollments").update({ status: enrollToDb(statusDisplay) }).eq("id", id);
}

// ---------------- Certificates ----------------
export async function getCertificates() {
  if (!isSupabaseConfigured) return mock.certificates;
  const { data, error } = await supabase
    .from("certificates")
    .select("id, payment_status, status, profile:profiles(full_name), course:courses(title)");
  if (error) throw error;
  return (data || []).map((c) => ({
    id: c.id, name: c.profile?.full_name || "—", course: c.course?.title || "—",
    payment: payToDisplay(c.payment_status), status: certStatusToDisplay(c.status),
  }));
}

export async function issueCertificate(id, paymentDisplay) {
  if (!isSupabaseConfigured) return;
  await supabase.from("certificates")
    .update({ status: "issued", payment_status: payToDb(paymentDisplay), issued_at: new Date().toISOString() })
    .eq("id", id);
}

// ---------------- Courses (list) ----------------
export async function getCourses() {
  if (!isSupabaseConfigured) return mock.courses;
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, category, price, status, modules(count), enrollments(count)")
    .order("title");
  if (error) throw error;
  return (data || []).map((c) => ({
    id: c.id, title: c.title, category: c.category || "—", price: c.price || 0,
    modules: c.modules?.[0]?.count ?? 0, lessons: null, students: c.enrollments?.[0]?.count ?? 0,
    status: cap(c.status || "draft"),
  }));
}

export async function deleteCourse(id) {
  if (!isSupabaseConfigured) return;
  await supabase.from("courses").delete().eq("id", id);
}

// ---- Course editor: load / save (with media upload) ----
const slugify = (s) =>
  (s || "course").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function uploadMedia(folder, file) {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folder}/${Date.now().toString(36)}-${safe}`;
  const { error } = await supabase.storage.from("course-media").upload(path, file, { upsert: false });
  if (error) return null;
  return supabase.storage.from("course-media").getPublicUrl(path).data.publicUrl;
}

export async function getCourseForEdit(id) {
  if (!isSupabaseConfigured) return null; // demo: editor uses its own sample seed
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, category, price, status, thumbnail_url, modules(id, title, position, lessons(id, title, duration, video_url, transcript, position, assessments(id, title, type, questions)))")
    .eq("id", id)
    .single();
  if (error) throw error;
  const modules = (data.modules || [])
    .sort((a, b) => a.position - b.position)
    .map((m, mi) => ({
      id: m.id, name: m.title, _open: mi === 0,
      lessons: (m.lessons || []).sort((a, b) => a.position - b.position).map((l) => ({
        id: l.id, title: l.title, duration: l.duration || "", transcript: l.transcript || "",
        video: l.video_url ? { name: "current video", url: l.video_url, file: null } : null,
        tests: (l.assessments || []).filter((a) => a.type === "quiz").map((a) => ({
          id: a.id, title: a.title, questions: Array.isArray(a.questions) ? a.questions : [],
        })),
        assignments: (l.assessments || []).filter((a) => a.type === "assignment").map((a) => ({
          id: a.id, title: a.title, description: a.questions?.description || "", due: a.questions?.due || "",
        })),
      })),
    }));
  return {
    courseId: data.id,
    details: {
      title: data.title || "", category: data.category || "Courses", price: data.price ?? 0,
      status: data.status === "published" ? "Published" : "Draft", description: data.description || "",
      thumbnail: data.thumbnail_url ? { name: "current", url: data.thumbnail_url, file: null } : null,
    },
    modules,
  };
}

/**
 * Persists the whole course. The course row is upserted (its id is preserved so
 * enrollments/certificates stay intact); the curriculum subtree (modules ->
 * lessons -> assessments) is replaced. NOTE: replacing the subtree resets
 * lesson_progress/submissions for this course — fine pre-launch; swap for a
 * diff-based sync before real learner data accumulates.
 */
export async function saveCourse(courseId, details, modules) {
  if (!isSupabaseConfigured) return { id: courseId || "demo", error: null };

  let thumbnail_url = details.thumbnail && !details.thumbnail.file ? details.thumbnail.url : null;
  if (details.thumbnail?.file) thumbnail_url = await uploadMedia("thumbnails", details.thumbnail.file);

  const payload = {
    title: details.title, description: details.description, category: details.category,
    price: Number(details.price) || 0,
    status: String(details.status).toLowerCase() === "published" ? "published" : "draft",
    thumbnail_url,
  };

  let cid = courseId;
  if (cid) {
    const { error } = await supabase.from("courses").update(payload).eq("id", cid);
    if (error) return { error: error.message };
  } else {
    payload.slug = `${slugify(details.title)}-${Date.now().toString(36)}`;
    const { data, error } = await supabase.from("courses").insert(payload).select("id").single();
    if (error) return { error: error.message };
    cid = data.id;
  }

  // Replace curriculum subtree
  await supabase.from("modules").delete().eq("course_id", cid);
  for (let mi = 0; mi < modules.length; mi++) {
    const m = modules[mi];
    const { data: mod, error: me } = await supabase.from("modules")
      .insert({ course_id: cid, title: m.name, position: mi }).select("id").single();
    if (me) return { error: me.message };
    for (let li = 0; li < (m.lessons || []).length; li++) {
      const l = m.lessons[li];
      let video_url = l.video && !l.video.file ? l.video.url : null;
      if (l.video?.file) video_url = await uploadMedia("videos", l.video.file);
      const { data: les, error: le } = await supabase.from("lessons")
        .insert({ module_id: mod.id, title: l.title, duration: l.duration, video_url, transcript: l.transcript, position: li })
        .select("id").single();
      if (le) return { error: le.message };
      const rows = [];
      (l.tests || []).forEach((t) => rows.push({ lesson_id: les.id, title: t.title, type: "quiz", questions: t.questions || [] }));
      (l.assignments || []).forEach((a) => rows.push({ lesson_id: les.id, title: a.title, type: "assignment", questions: { description: a.description, due: a.due } }));
      if (rows.length) {
        const { error: ae } = await supabase.from("assessments").insert(rows);
        if (ae) return { error: ae.message };
      }
    }
  }
  return { id: cid, error: null };
}

// ---------------- Overview ----------------
export async function getOverview() {
  if (!isSupabaseConfigured) {
    const pending = mock.enrollments.filter((e) => e.status === "Pending");
    return {
      learners: 1204, courses: 6, pending: 18,
      genderSplit: mock.genderSplit, pendingList: pending,
    };
  }
  const [learners, courses, pending, students] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("profiles").select("gender").eq("role", "student"),
  ]);
  // gender split
  const buckets = { Male: 0, Female: 0, Other: 0 };
  (students.data || []).forEach((s) => {
    const g = s.gender === "Male" || s.gender === "Female" ? s.gender : "Other";
    buckets[g]++;
  });
  const colors = { Male: "#1a13d6", Female: "#e5679a", Other: "#ffc21a" };
  const genderSplit = Object.entries(buckets).filter(([, v]) => v > 0).map(([label, value]) => ({ label, value, color: colors[label] }));

  const { data: pend } = await supabase
    .from("enrollments").select("id, created_at, profile:profiles(full_name), course:courses(title)")
    .eq("status", "pending").order("created_at", { ascending: false }).limit(5);

  return {
    learners: learners.count || 0,
    courses: courses.count || 0,
    pending: pending.count || 0,
    genderSplit: genderSplit.length ? genderSplit : mock.genderSplit,
    pendingList: (pend || []).map((e) => ({ id: e.id, name: e.profile?.full_name || "—", program: e.course?.title || "—", date: dayDate(e.created_at), status: "Pending" })),
  };
}
