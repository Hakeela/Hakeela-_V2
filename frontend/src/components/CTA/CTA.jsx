import './CTA.css'

function CTA({
  title = '“Learn a Tech Skill with Hakeela today”',
  buttonLabel = 'Get Started',
}) {
  return (
    <section className="cta">
      <div className="cta__panel">
        <img className="cta__mountains" src="/cta-mountains.png" alt="" aria-hidden="true" />
        <div className="cta__content">
          <h2 className="cta__title">{title}</h2>
          <a href="#" className="cta__btn">
            {buttonLabel}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
