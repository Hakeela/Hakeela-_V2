import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hakversity" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/hakversity/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/hakversity/blog" element={<Blog />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/hakversity/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default App
