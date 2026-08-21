import CursorFollower from '../components/CursorFollower.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import WhoWeAre from '../components/WhoWeAre.jsx'
import Programs from '../components/Programs.jsx'
import Ecosystem from '../components/Ecosystem.jsx'
import Admissions from '../components/Admissions.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <>
      <CursorFollower />
      <Navbar />
      <Hero />
      <Marquee />
      <WhoWeAre />
      <Programs />
      <Ecosystem />
      <Admissions />
      <Footer />
    </>
  )
}

export default Home
