// Mock data for the admin/staff portal (no backend yet).

// --- Country lookup from a phone's dialing code ---------------------------
const DIAL_CODES = [
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
];

export function countryFromPhone(phone) {
  const clean = (phone || "").replace(/[\s-]/g, "");
  const match = DIAL_CODES.find((d) => clean.startsWith(d.code));
  return match || { country: "Unknown", flag: "🏳️" };
}

// --- Learners -------------------------------------------------------------
export const learners = [
  {
    id: "L-1042", name: "Victor Eyo", email: "victor.eyo@gmail.com", gender: "Male",
    phone: "+234 802 341 5566", status: "Active", joined: "Jan 2026",
    courses: [{ title: "Data Analysis", progress: 65, status: "In Progress", score: 92 }],
  },
  {
    id: "L-1043", name: "Maxe Emmanuel", email: "maxe.e@gmail.com", gender: "Male",
    phone: "+233 24 118 9042", status: "Active", joined: "Feb 2026",
    courses: [{ title: "Product Design", progress: 40, status: "In Progress", score: null }],
  },
  {
    id: "L-1044", name: "Aisha Bello", email: "aisha.bello@yahoo.com", gender: "Female",
    phone: "+234 811 552 7781", status: "Graduated", joined: "Sep 2025",
    courses: [{ title: "Web Development", progress: 100, status: "Completed", score: 88 }],
  },
  {
    id: "L-1045", name: "Chidi Okafor", email: "chidi.okafor@gmail.com", gender: "Male",
    phone: "+254 712 664 205", status: "Active", joined: "Mar 2026",
    courses: [{ title: "Data Analysis", progress: 12, status: "In Progress", score: null }],
  },
  {
    id: "L-1046", name: "Grace Musa", email: "grace.musa@gmail.com", gender: "Female",
    phone: "+27 82 447 1180", status: "Active", joined: "Feb 2026",
    courses: [{ title: "Excel for Beginners", progress: 78, status: "In Progress", score: 74 }],
  },
  {
    id: "L-1047", name: "Tunde Adeyemi", email: "tunde.a@outlook.com", gender: "Male",
    phone: "+44 7700 900321", status: "Suspended", joined: "Dec 2025",
    courses: [{ title: "Everyone a Changemaker", progress: 0, status: "Not Started", score: null }],
  },
  {
    id: "L-1048", name: "Ngozi Eze", email: "ngozi.eze@gmail.com", gender: "Female",
    phone: "+234 803 220 9911", status: "Active", joined: "Apr 2026",
    courses: [{ title: "Product Design", progress: 55, status: "In Progress", score: 81 }],
  },
  {
    id: "L-1049", name: "Ibrahim Sani", email: "ibrahim.sani@gmail.com", gender: "Male",
    phone: "+234 706 771 3320", status: "Active", joined: "Mar 2026",
    courses: [{ title: "Web Development", progress: 33, status: "In Progress", score: null }],
  },
  {
    id: "L-1050", name: "Blessing Udo", email: "blessing.udo@yahoo.com", gender: "Female",
    phone: "+233 20 559 8842", status: "Active", joined: "May 2026",
    courses: [{ title: "Data Analysis", progress: 90, status: "In Progress", score: 95 }],
  },
  {
    id: "L-1051", name: "Samuel Ade", email: "samuel.ade@gmail.com", gender: "Male",
    phone: "+234 815 003 2277", status: "Graduated", joined: "Aug 2025",
    courses: [{ title: "Product Design", progress: 100, status: "Completed", score: 90 }],
  },
  {
    id: "L-1052", name: "Fatima Yusuf", email: "fatima.yusuf@gmail.com", gender: "Female",
    phone: "+254 733 118 664", status: "Active", joined: "Jun 2026",
    courses: [{ title: "Excel for Beginners", progress: 20, status: "In Progress", score: null }],
  },
  {
    id: "L-1053", name: "Kwame Mensah", email: "kwame.mensah@gmail.com", gender: "Male",
    phone: "+233 24 990 1123", status: "Active", joined: "Jul 2026",
    courses: [{ title: "Web Development", progress: 48, status: "In Progress", score: 70 }],
  },
];

export const genderSplit = [
  { label: "Male", value: 662, color: "#1a13d6" },
  { label: "Female", value: 512, color: "#e5679a" },
  { label: "Other", value: 30, color: "#ffc21a" },
];

// --- Courses --------------------------------------------------------------
export const courses = [
  { id: "data-analysis", title: "Data Analysis", category: "Courses", price: 5000, modules: 6, lessons: 24, students: 312, status: "Published" },
  { id: "product-design", title: "Product Design", category: "Courses", price: 5000, modules: 5, lessons: 20, students: 208, status: "Published" },
  { id: "web-development", title: "Web Development", category: "Courses", price: 5000, modules: 7, lessons: 30, students: 174, status: "Published" },
  { id: "intro-computer", title: "Introduction to Computer", category: "Special Needs & Tech", price: 0, modules: 4, lessons: 12, students: 96, status: "Published" },
  { id: "excel", title: "Excel for Beginners", category: "Special Needs & Tech", price: 0, modules: 3, lessons: 10, students: 121, status: "Published" },
  { id: "changemaker", title: "Everyone a Changemaker", category: "Leadership", price: 5000, modules: 4, lessons: 16, students: 64, status: "Draft" },
];

export const courseCategories = ["Courses", "Special Needs & Tech", "Leadership"];

// A starter curriculum used by the course editor
export const sampleCurriculum = {
  modules: [
    {
      id: "m1", name: "Module 1: Introduction to Data Science",
      lessons: [
        { id: "l1", title: "What is Data Science?", duration: "25 min", video: "intro.mp4", transcript: "" },
        { id: "l2", title: "Data Science Tools Overview", duration: "30 min", video: "", transcript: "" },
      ],
    },
    {
      id: "m2", name: "Module 2: Python for Data Science",
      lessons: [{ id: "l3", title: "Getting started with Python", duration: "45 min", video: "", transcript: "" }],
    },
  ],
  tests: [
    { id: "t1", title: "Module 1 Quiz", questions: [{ id: "q1", question: "Which is a programming language?", options: "Python, Excel, Word", answer: "Python" }] },
  ],
  assignments: [
    { id: "a1", title: "First Data Analysis Project", description: "Analyse the provided dataset and submit a short report.", due: "2 weeks" },
  ],
};

// --- Enrollments / applications ------------------------------------------
export const enrollments = [
  { id: "AP-3301", name: "Chidi Okafor", program: "Data Analysis", date: "Aug 5, 2026", status: "Pending" },
  { id: "AP-3302", name: "Grace Musa", program: "Excel for Beginners", date: "Aug 5, 2026", status: "Pending" },
  { id: "AP-3303", name: "Ibrahim Sani", program: "Web Development", date: "Aug 4, 2026", status: "Approved" },
  { id: "AP-3304", name: "Ngozi Eze", program: "Product Design", date: "Aug 4, 2026", status: "Pending" },
  { id: "AP-3305", name: "Peter Obi", program: "Everyone a Changemaker", date: "Aug 3, 2026", status: "Rejected" },
  { id: "AP-3306", name: "Blessing Udo", program: "Data Analysis", date: "Aug 3, 2026", status: "Approved" },
  { id: "AP-3307", name: "Kwame Mensah", program: "Web Development", date: "Aug 2, 2026", status: "Pending" },
  { id: "AP-3308", name: "Fatima Yusuf", program: "Excel for Beginners", date: "Aug 2, 2026", status: "Approved" },
];

export const assessments = [
  { id: "SB-901", name: "Victor Eyo", course: "Data Analysis", module: "Module 1", type: "Quiz", score: 92, status: "Auto-graded" },
  { id: "SB-902", name: "Maxe Emmanuel", course: "Product Design", module: "Module 2", type: "Assignment", score: null, status: "Needs grading" },
  { id: "SB-903", name: "Aisha Bello", course: "Web Development", module: "Module 5", type: "Project", score: null, status: "Needs grading" },
  { id: "SB-904", name: "Grace Musa", course: "Excel for Beginners", module: "Module 2", type: "Quiz", score: 74, status: "Auto-graded" },
  { id: "SB-905", name: "Ngozi Eze", course: "Product Design", module: "Module 3", type: "Assignment", score: null, status: "Needs grading" },
  { id: "SB-906", name: "Blessing Udo", course: "Data Analysis", module: "Module 4", type: "Quiz", score: 95, status: "Auto-graded" },
  { id: "SB-907", name: "Ibrahim Sani", course: "Web Development", module: "Module 2", type: "Project", score: null, status: "Needs grading" },
];

export const certificates = [
  { id: "CT-551", name: "Aisha Bello", course: "Web Development", payment: "Paid", status: "Ready to issue" },
  { id: "CT-552", name: "Victor Eyo", course: "Data Analysis", payment: "Unpaid", status: "Awaiting payment" },
  { id: "CT-553", name: "Samuel Ade", course: "Product Design", payment: "Paid", status: "Issued" },
  { id: "CT-554", name: "Grace Musa", course: "Excel for Beginners", payment: "Waived", status: "Ready to issue" },
  { id: "CT-555", name: "Blessing Udo", course: "Data Analysis", payment: "Paid", status: "Ready to issue" },
  { id: "CT-556", name: "Kwame Mensah", course: "Web Development", payment: "Unpaid", status: "Awaiting payment" },
];

// --- Staff (only two roles: Admin, Staff) --------------------------------
export const staff = [
  { id: "ST-01", name: "Imaobong A.", email: "imaobong@hakeela.org", role: "Admin", status: "Active" },
  { id: "ST-02", name: "Daniel K.", email: "daniel@hakeela.org", role: "Staff", status: "Active" },
  { id: "ST-03", name: "Fatima Y.", email: "fatima@hakeela.org", role: "Staff", status: "Active" },
  { id: "ST-04", name: "Joseph M.", email: "joseph@hakeela.org", role: "Staff", status: "Invited" },
];

// areas each role can reach (drives the permission matrix + nav gating)
export const permissionAreas = [
  "Learners", "Courses", "Enrollments", "Assessments", "Certificates", "Notifications", "Payments", "Staff & Roles", "Settings",
];
export const rolePermissions = {
  Admin: permissionAreas,
  Staff: ["Learners", "Courses", "Enrollments", "Assessments", "Certificates", "Notifications", "Settings"],
};

// --- Payments -------------------------------------------------------------
export const transactions = [
  { id: "TXN-88213", name: "Aisha Bello", item: "Certificate — Web Development", method: "Card", amount: 5000, date: "Aug 5, 2026", status: "Success" },
  { id: "TXN-88212", name: "Victor Eyo", item: "Program — Data Analysis", method: "Transfer", amount: 5000, date: "Aug 4, 2026", status: "Success" },
  { id: "TXN-88211", name: "Ngozi Eze", item: "Program — Product Design", method: "Card", amount: 5000, date: "Aug 4, 2026", status: "Pending" },
  { id: "TXN-88210", name: "Peter Obi", item: "Certificate — Leadership", method: "Card", amount: 5000, date: "Aug 3, 2026", status: "Failed" },
  { id: "TXN-88209", name: "Blessing Udo", item: "Certificate — Data Analysis", method: "Transfer", amount: 5000, date: "Aug 2, 2026", status: "Success" },
  { id: "TXN-88208", name: "Samuel Ade", item: "Program — Product Design", method: "Card", amount: 5000, date: "Aug 2, 2026", status: "Success" },
  { id: "TXN-88207", name: "Ibrahim Sani", item: "Program — Web Development", method: "Card", amount: 5000, date: "Aug 1, 2026", status: "Success" },
  { id: "TXN-88206", name: "Kwame Mensah", item: "Program — Web Development", method: "Transfer", amount: 5000, date: "Jul 31, 2026", status: "Pending" },
  { id: "TXN-88205", name: "Fatima Yusuf", item: "Program — Excel", method: "Card", amount: 0, date: "Jul 31, 2026", status: "Success" },
];

// --- Notifications --------------------------------------------------------
export const notifications = [
  { id: "N-1", type: "Enrollment", title: "New application", body: "Chidi Okafor applied for Data Analysis.", time: "12 min ago", read: false },
  { id: "N-2", type: "Submission", title: "Assignment awaiting grading", body: "Maxe Emmanuel submitted an assignment in Product Design.", time: "40 min ago", read: false },
  { id: "N-3", type: "Payment", title: "Payment received", body: "Aisha Bello paid ₦5,000 for a Web Development certificate.", time: "1 hour ago", read: false },
  { id: "N-4", type: "System", title: "New lesson published", body: "Daniel K. published a lesson in Product Design.", time: "3 hours ago", read: true },
  { id: "N-5", type: "Certificate", title: "Certificate ready", body: "Grace Musa's Excel certificate is ready to issue.", time: "Yesterday", read: true },
];

// --- Overview widgets -----------------------------------------------------
export const activity = [
  { who: "Chidi Okafor", what: "applied for Data Analysis", time: "12 min ago" },
  { who: "Aisha Bello", what: "completed Web Development", time: "1 hour ago" },
  { who: "Daniel K.", what: "published a new lesson in Product Design", time: "3 hours ago" },
  { who: "Grace Musa", what: "paid for a certificate", time: "5 hours ago" },
  { who: "Fatima Y.", what: "approved 4 enrollments", time: "Yesterday" },
];

export const enrollTrend = [
  { m: "Feb", v: 42 }, { m: "Mar", v: 61 }, { m: "Apr", v: 55 },
  { m: "May", v: 78 }, { m: "Jun", v: 96 }, { m: "Jul", v: 88 }, { m: "Aug", v: 120 },
];

export const naira = (n) => "₦" + n.toLocaleString("en-NG");

export const initials = (name) => (name || "").split(" ").map((n) => n[0]).join("").slice(0, 2);
