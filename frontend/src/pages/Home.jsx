import HeroAbility from '../components/HeroAbility/HeroAbility.jsx'
import CTA from '../components/CTA/CTA.jsx'
import Donate from '../components/Donate/Donate.jsx'
import Prodigy from '../components/Prodigy/Prodigy.jsx'
import Fellowship from '../components/Fellowship/Fellowship.jsx'
import ImpactHighlights from '../components/ImpactHighlights/ImpactHighlights.jsx'

function Home() {
  return (
    <>
      <HeroAbility />
      <CTA
        title="“Building a world where specially assisted individuals can learn tech skills, and be relevant in the socio-economic technological space”."
        buttonLabel="Learn more"
        href="https://hakeela.org/about"
      />
      <Donate />
      <Prodigy />
      <Fellowship />
      <ImpactHighlights />
    </>
  )
}

export default Home
