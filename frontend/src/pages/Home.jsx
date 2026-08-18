import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Banner from '../components/Banner/Banner.jsx'
import Gain from '../components/Gain/Gain.jsx'
import Courses from '../components/Courses/Courses.jsx'
import Footer from '../components/Footer/Footer.jsx'

// Pre-filled "invite a friend" share email.
const INVITE_MAILTO =
  'mailto:?subject=' +
  encodeURIComponent('Join me on HakPortal') +
  '&body=' +
  encodeURIComponent(
    "Hi,\n\nI'm learning in-demand tech skills for free on HakPortal and thought you'd love it too — we can learn and earn together.\n\nJoin here: https://hakportal.hakeela.org/signup\n\nSee you there!"
  )

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Banner
        title="Learn and Earn you first $100 with AI. Sign up on our AI Side Hustle program today."
        buttonLabel="Get Started"
        to="/signup"
      />
      <Gain />
      <Courses />
      <Banner
        title="Invite a friend to be learn and earn on HakPortal"
        buttonLabel="Invite friends"
        href={INVITE_MAILTO}
      />
      <Footer />
    </>
  )
}

export default Home
