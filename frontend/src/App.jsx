import { Routes, Route } from 'react-router-dom'
import CursorFollower from './components/CursorFollower/CursorFollower.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import DashboardLayout from './components/DashboardLayout/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Courses from './pages/dashboard/Courses.jsx'
import ContinueLearning from './pages/dashboard/ContinueLearning.jsx'
import Certificate from './pages/dashboard/Certificate.jsx'
import Catalog from './pages/dashboard/Catalog.jsx'
import CourseInfo from './pages/dashboard/CourseInfo.jsx'
import Portfolio from './pages/dashboard/Portfolio.jsx'
import Profile from './pages/dashboard/Profile.jsx'

function App() {
  return (
    <>
      <CursorFollower />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard (student portal) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/courses/:id" element={<ContinueLearning />} />
          <Route path="/dashboard/enroll" element={<Catalog />} />
          <Route path="/dashboard/enroll/:id" element={<CourseInfo />} />
          <Route path="/dashboard/certificate" element={<Certificate />} />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
