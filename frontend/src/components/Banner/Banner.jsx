import { Link } from 'react-router-dom'
import './Banner.css'

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

/**
 * Banner CTA. Pass `to` for an internal route (React Router) or `href` for an
 * external link / mailto. http(s) links open in a new tab.
 */
function Banner({ title, buttonLabel, to, href }) {
  const isExternal = href && /^https?:/i.test(href)

  return (
    <section className="banner">
      <div className="banner__panel">
        <img className="banner__mountains" src="/cta-mountains.png" alt="" aria-hidden="true" />
        <div className="banner__content">
          <h2 className="banner__title">{title}</h2>
          {to ? (
            <Link to={to} className="banner__btn">
              {buttonLabel}
              <Arrow />
            </Link>
          ) : (
            <a
              href={href || '#'}
              className="banner__btn"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {buttonLabel}
              <Arrow />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default Banner
