import './Banner.css'

function Banner({ title, buttonLabel }) {
  return (
    <section className="banner">
      <div className="banner__panel">
        <img className="banner__mountains" src="/cta-mountains.png" alt="" aria-hidden="true" />
        <div className="banner__content">
          <h2 className="banner__title">{title}</h2>
          <a href="#" className="banner__btn">
            {buttonLabel}
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
