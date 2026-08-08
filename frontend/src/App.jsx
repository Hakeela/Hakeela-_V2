import { Routes, Route, Outlet } from 'react-router-dom'
import CursorFollower from './components/CursorFollower/CursorFollower.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import DashboardLayout from './components/DashboardLayout/DashboardLayout.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Courses from './pages/dashboard/Courses.jsx'
import ContinueLearning from './pages/dashboard/ContinueLearning.jsx'
import Certificate from './pages/dashboard/Certificate.jsx'
import Catalog from './pages/dashboard/Catalog.jsx'
import CourseInfo from './pages/dashboard/CourseInfo.jsx'
import Portfolio from './pages/dashboard/Portfolio.jsx'
import Profile from './pages/dashboard/Profile.jsx'
import StudentNotifications from './pages/dashboard/Notifications.jsx'
import Help from './pages/dashboard/Help.jsx'

// Admin / staff portal
import { AdminRoleProvider } from './context/AdminRoleContext.jsx'
import AdminLayout from './components/AdminLayout/AdminLayout.jsx'
import RequireAdmin from './pages/admin/RequireAdmin.jsx'
import Overview from './pages/admin/Overview.jsx'
import Learners from './pages/admin/Learners.jsx'
import LearnerProfile from './pages/admin/LearnerProfile.jsx'
import AdminCourses from './pages/admin/AdminCourses.jsx'
import CourseEditor from './pages/admin/CourseEditor.jsx'
import Enrollments from './pages/admin/Enrollments.jsx'
import Assessments from './pages/admin/Assessments.jsx'
import AdminCertificates from './pages/admin/AdminCertificates.jsx'
import Notifications from './pages/admin/Notifications.jsx'
import AssessmentGrade from './pages/admin/AssessmentGrade.jsx'
import AssessmentReview from './pages/admin/AssessmentReview.jsx'
import Staff from './pages/admin/Staff.jsx'
import Payments from './pages/admin/Payments.jsx'
import Settings from './pages/admin/Settings.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'

function App() {
  return (
    <>
      <CursorFollower />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard (student portal) — requires a signed-in learner */}
        <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/courses/:id" element={<ContinueLearning />} />
          <Route path="/dashboard/enroll" element={<Catalog />} />
          <Route path="/dashboard/enroll/:id" element={<CourseInfo />} />
          <Route path="/dashboard/certificate" element={<Certificate />} />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/dashboard/notifications" element={<StudentNotifications />} />
          <Route path="/dashboard/help" element={<Help />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* Admin & staff portal (shared, role-gated) */}
        <Route
          element={
            <AdminRoleProvider>
              <Outlet />
            </AdminRoleProvider>
          }
        >
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Overview />} />
          <Route path="/admin/learners" element={<Learners />} />
          <Route path="/admin/learners/:id" element={<LearnerProfile />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/courses/new" element={<CourseEditor />} />
          <Route path="/admin/courses/:id/edit" element={<CourseEditor />} />
          <Route path="/admin/enrollments" element={<Enrollments />} />
          <Route path="/admin/assessments" element={<Assessments />} />
          <Route path="/admin/assessments/:id/grade" element={<AssessmentGrade />} />
          <Route path="/admin/assessments/:id/review" element={<AssessmentReview />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/settings" element={<Settings />} />

            {/* Admin-only */}
            <Route path="/admin/staff" element={<RequireAdmin><Staff /></RequireAdmin>} />
            <Route path="/admin/payments" element={<RequireAdmin><Payments /></RequireAdmin>} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
