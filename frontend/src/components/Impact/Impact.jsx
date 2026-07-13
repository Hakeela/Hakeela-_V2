import './Impact.css'

function Impact() {
  return (
    <section className="impact">
      <div className="impact__inner">
        <header className="impact__head">
          <h2 className="impact__title">Impact+</h2>
          <p className="impact__subtitle">
            Measuring our global reach and the transformative effect we&apos;re
            having on communities worldwide
          </p>
        </header>

        <div className="impact__globe">
          <img
            src="/impact-globe.png"
            alt="Global impact map showing 250 impacted, 4 countries, 5 global awards, and $10k raised"
          />
        </div>
      </div>
    </section>
  )
}

export default Impact
