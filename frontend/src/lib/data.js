import { supabase, isSupabaseConfigured } from "./supabase.js";

/**
 * Data-service layer for the student dashboard.
 * Each function queries Supabase when configured, otherwise returns demo mock
 * data so the app keeps working locally before keys are added.
 */

// ---------------- demo mock data ----------------
const MOCK_CATALOG = [
  { id: "data-analysis", title: "Data Analysis", category: "Courses", price: 5000, thumbnail_url: "/course-1.png", description: "Unlock the power of data to make smart, informed decisions. This course equips you with analytical tools and techniques to interpret, visualize, and communicate data effectively." },
  { id: "product-design", title: "Product Design", category: "Courses", price: 5000, thumbnail_url: "/course-2.png", description: "Learn how to create user-centered products that solve real problems. This hands-on course walks you through the design thinking process, UI/UX principles, and the tools top designers use." },
  { id: "web-development", title: "Web Development", category: "Courses", price: 5000, thumbnail_url: "/course-3.png", description: "Start from the basics and grow into a full-stack web developer. This course takes you from writing your first line of code to deploying real-world applications." },
  { id: "intro-computer", title: "Introduction to Computer", category: "Special Needs & Tech", price: 0, thumbnail_url: "/gain-1.png", description: "Begin your tech career by understanding Computer essentials" },
  { id: "excel", title: "Excel for Beginners", category: "Special Needs & Tech", price: 0, thumbnail_url: "/gain-2.png", description: "Welcome to a world of charts & tables." },
  { id: "changemaker", title: "Everyone a Changemaker", category: "Leadership", price: 5000, thumbnail_url: "/gain-2.png", description: "Unlock skills, knowledge and insight on how to lead a change in your community." },
  { id: "peace-building", title: "Peace building and development", category: "Leadership", price: 5000, thumbnail_url: "/hero-collage.png", description: "Unlock knowledge and skills to drive peace in your community." },
];

const MOCK_MY_COURSES = [
  { id: "data-analysis", title: "Data Science", description: "Introduction to Data analytics", thumbnail_url: "/gain-1.png", lessons: 12, duration: "8h 30m", progress: 65 },
  { id: "changemaker", title: "Everyone a Changemaker", description: "Unlock skills, knowledge and insight on how to lead a change in your community.", thumbnail_url: "/gain-2.png", lessons: 8, duration: "6h 15m", progress: 65 },
];

const MOCK_STATS = { enrolled: 3, completedLessons: 14, studyTime: "24h", avgScore: "85%" };

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

// ---------------- catalog / courses ----------------
export async function getCatalog() {
  if (!isSupabaseConfigured) return groupByCategory(MOCK_CATALOG);
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, category, price, thumbnail_url")
    .eq("status", "published")
    .order("title");
  if (error) throw error;
  return groupByCategory(data || []);
}

export async function getMyCourses(userId) {
  if (!isSupabaseConfigured) return MOCK_MY_COURSES;
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

// ---------------- certificates ----------------
export async function getMyCertificates(userId) {
  if (!isSupabaseConfigured) return MOCK_CERTIFICATES;
  const { data, error } = await supabase
    .from("certificates")
    .select("id, payment_status, status, course:courses(title)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((c) => ({ id: c.id, course: c.course?.title, payment_status: c.payment_status, status: c.status }));
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
