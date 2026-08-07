import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Banner from '../components/Banner/Banner.jsx'
import Gain from '../components/Gain/Gain.jsx'
import Courses from '../components/Courses/Courses.jsx'
import Footer from '../components/Footer/Footer.jsx'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Banner
        title="Learn and Earn you first $100 with AI. Sign up on our AI Side Hustle program today."
        buttonLabel="Get Started"
      />
      <Gain />
      <Courses />
      <Banner
        title="Invite a friend to be learn and earn on HakPortal"
        buttonLabel="Invite friends"
      />
      <Footer />
    </>
  )
}

export default Home
