import HeroAbility from '../components/HeroAbility/HeroAbility.jsx'
import CTA from '../components/CTA/CTA.jsx'
import Donate from '../components/Donate/Donate.jsx'
import Prodigy from '../components/Prodigy/Prodigy.jsx'
import Fellowship from '../components/Fellowship/Fellowship.jsx'
import FellowshipForm from '../components/FellowshipForm/FellowshipForm.jsx'
import ImpactHighlights from '../components/ImpactHighlights/ImpactHighlights.jsx'

function Home() {
  return (
    <>
      <HeroAbility />
      <CTA
        title="“Creating an all-inclusive, flexible, and adaptable environment that equips people with disabilities with the tech skills they need to thrive in the socio-economic technological space.”"
        buttonLabel="Learn more"
        href="https://hakeela.org/about"
      />
      <Donate />
      <Prodigy />
      <Fellowship />
      <FellowshipForm />
      <ImpactHighlights />
    </>
  )
}

export default Home
