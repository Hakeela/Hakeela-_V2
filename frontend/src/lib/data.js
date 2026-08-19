import { supabase, isSupabaseConfigured } from "./supabase.js";

/**
 * Data-service layer for the student dashboard.
 * Each function queries Supabase when configured, otherwise returns demo mock
 * data so the app keeps working locally before keys are added.
 */

// ---------------- demo mock data (no course placeholders — courses are dynamic) ----------------
const MOCK_STATS = { enrolled: 0, completedLessons: 0, studyTime: "—", avgScore: "—" };

const MOCK_CERTIFICATES = [
  { id: "c1", course: "Web Development", payment_status: "paid", status: "issued" },
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "Lesson", title: "New lesson available", body: "“Data Visualization Basics” was added to your Data Analysis course.", time: "20 min ago", read: false },
  { id: "n2", type: "Grade", title: "Assignment graded", body: "You scored 92% on your Module 1 project. Well done!", time: "2 hours ago", read: false },
  { id: "n3", type: "Certificate", title: "Certificate ready", body: "Pay for your certificate to unlock the download.", time: "Yesterday", read: true },
  { id: "n4", type: "Enrollment", title: "Enrollment approved", body: "You’ve been enrolled into Cohort 4 of Data Analysis.", time: "2 days ago", read: true },
];

const groupByCategory = (list) => {
  const g = {};
  for (const c of list) (g[c.category] ||= []).push(c);
  return g;
};

// ---------------- categories ----------------
export const DEFAULT_CATEGORIES = ["Courses", "Special Needs & Tech", "Leadership"];

/** Category names for dropdowns/filters — from the categories table. */
export async function getCategories() {
  if (!isSupabaseConfigured) return DEFAULT_CATEGORIES;
  const { data, error } = await supabase.from("categories").select("name").order("name");
  if (error || !data || data.length === 0) {
    // Fallback if the categories table isn't there yet: derive from courses.
    const { data: cs } = await supabase.from("courses").select("category");
    const set = new Set(DEFAULT_CATEGORIES);
    (cs || []).forEach((c) => c.category && set.add(c.category));
    return [...set];
  }
  return data.map((c) => c.name);
}

/** Published courses for the public landing page (readable without login via RLS). */
export async function getPublishedCourses(limit = 9) {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, thumbnail_url, category")
    .eq("status", "published")
    .limit(limit);
  if (error) return [];
  return data || [];
}

// ---------------- catalog / courses ----------------
export async function getCatalog() {
  if (!isSupabaseConfigured) return {};
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, category, price, thumbnail_url")
    .eq("status", "published")
    .order("title");
  if (error) throw error;
  return groupByCategory(data || []);
}

export async function getMyCourses(userId) {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("enrollments")
    .select("progress:status, course:courses(id, title, description, thumbnail_url)")
    .eq("user_id", userId)
    .in("status", ["active", "approved", "completed"]);
  if (error) throw error;
  return (data || []).map((e) => ({
    id: e.course?.id,
    title: e.course?.title,
    description: e.course?.description,
    thumbnail_url: e.course?.thumbnail_url,
    lessons: 0,
    duration: "",
    progress: e.progress === "completed" ? 100 : 0,
  }));
}

export async function getStats(userId) {
  if (!isSupabaseConfigured) return MOCK_STATS;
  const [{ count: enrolled }, { count: completedLessons }] = await Promise.all([
    supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("completed", true),
  ]);
  return { enrolled: enrolled || 0, completedLessons: completedLessons || 0, studyTime: "—", avgScore: "—" };
}

// ---------------- course detail / player ----------------
export async function getCourseDetail(courseId, userId) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, thumbnail_url, price, modules(id, title, position, lessons(id, title, duration, type, video_url, content_url, transcript, position, assessments(id, title, type, questions)))")
    .eq("id", courseId)
    .single();
  if (error) throw error;

  const [{ data: prog }, { data: enr }] = await Promise.all([
    supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", userId),
    supabase.from("enrollments").select("id").eq("user_id", userId).eq("course_id", courseId).maybeSingle(),
  ]);
  const done = new Set((prog || []).filter((p) => p.completed).map((p) => p.lesson_id));

  let total = 0, completed = 0;
  const modules = (data.modules || []).sort((a, b) => a.position - b.position).map((m) => {
    const lessons = (m.lessons || []).sort((a, b) => a.position - b.position).map((l) => {
      const isDone = done.has(l.id);
      total++; if (isDone) completed++;
      const quiz = (l.assessments || []).find((a) => a.type === "quiz");
      return {
        id: l.id, title: l.title, duration: l.duration || "",
        type: l.type || "video",
        content_url: l.content_url || l.video_url || "",
        video_url: l.video_url || "",
        transcript: l.transcript || "", done: isDone,
        assessment: quiz ? { id: quiz.id, title: quiz.title, questions: quiz.questions || [] } : null,
      };
    });
    const dc = lessons.filter((l) => l.done).length;
    const status = lessons.length && dc === lessons.length ? "Completed" : dc > 0 ? "In Progress" : "Not Started";
    return { id: m.id, name: m.title, status, lessonsCount: lessons.length, duration: "", lessons };
  });

  return {
    id: data.id, title: data.title, description: data.description, thumbnail_url: data.thumbnail_url,
    price: data.price, isEnrolled: !!enr, totalLessons: total, completedLessons: completed,
    progress: total ? Math.round((completed / total) * 100) : 0, modules,
  };
}

export async function enroll(userId, courseId) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase
    .from("enrollments")
    .upsert({ user_id: userId, course_id: courseId, status: "active" }, { onConflict: "user_id,course_id" });
  return { error: error?.message || null };
}

export async function markLessonComplete(userId, lessonId, completed = true) {
  if (!isSupabaseConfigured) return;
  await supabase.from("lesson_progress").upsert(
    { user_id: userId, lesson_id: lessonId, completed, completed_at: completed ? new Date().toISOString() : null },
    { onConflict: "user_id,lesson_id" }
  );
}

/** Create a certificate row (awaiting issuance) the first time a learner finishes a course. */
export async function ensureCertificate(userId, courseId) {
  if (!isSupabaseConfigured) return;
  const { data: existing } = await supabase
    .from("certificates").select("id").eq("user_id", userId).eq("course_id", courseId).maybeSingle();
  if (existing) return;
  await supabase.from("certificates").insert({
    user_id: userId, course_id: courseId, status: "ready", payment_status: "unpaid",
  });
}

export async function submitAssessment(userId, assessmentId, answers, score) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase
    .from("submissions")
    .insert({ assessment_id: assessmentId, user_id: userId, answers, score, status: "graded" });
  return { error: error?.message || null };
}

// ---------------- certificates ----------------
export async function getMyCertificates(userId) {
  if (!isSupabaseConfigured) return MOCK_CERTIFICATES;
  const { data, error } = await supabase
    .from("certificates")
    .select("id, payment_status, status, file_url, course:courses(title)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((c) => ({ id: c.id, course: c.course?.title, payment_status: c.payment_status, status: c.status, file_url: c.file_url }));
}

// ---------------- notifications ----------------
export async function getMyNotifications(userId) {
  if (!isSupabaseConfigured) return MOCK_NOTIFICATIONS;
  const { data, error } = await supabase
    .from("notifications")
    .select("id, type, title, body, read, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((n) => ({ ...n, time: new Date(n.created_at).toLocaleString() }));
}

export async function setNotificationRead(id, read) {
  if (!isSupabaseConfigured) return;
  await supabase.from("notifications").update({ read }).eq("id", id);
}

export async function deleteNotification(id) {
  if (!isSupabaseConfigured) return;
  await supabase.from("notifications").delete().eq("id", id);
}

// ---------------- help / contact ----------------
export async function submitHelpMessage(userId, { name, email, message }) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase.from("help_messages").insert({ user_id: userId, name, email, message });
  return { error: error?.message || null };
}

// ---------------- profile ----------------
export async function updateProfile(userId, patch) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
  return { error: error?.message || null };
}

/** Upload a profile photo to the `avatars` bucket and save profiles.avatar_url. */
export async function uploadAvatar(userId, file) {
  if (!isSupabaseConfigured) return { url: URL.createObjectURL(file), error: null };
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${userId}/${Date.now().toString(36)}-${safe}`;
  const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
  if (upErr) return { error: upErr.message };
  const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
  const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", userId);
  return { url, error: error?.message || null };
}
