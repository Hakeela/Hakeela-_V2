import { Link } from 'react-router-dom'
import './dashboard-pages.css'

function Certificate() {
  return (
    <div className="dashpg">
      <section className="cert-banner">
        <img className="dwb__shapes" src="/dash-banner-shapes.png" alt="" aria-hidden="true" />
        <span className="cert-banner__icon" style={{ position: 'relative', zIndex: 1 }}>
          {/* trophy (same as Courses page) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M8.697 3.25h6.606c.18 0 .335 0 .475.017a2.25 2.25 0 0 1 1.958 1.983h.806c.212-.002.677-.006 1.061.251c.497.331.647.9.647 1.499c0 2.726-1.453 4.546-3.308 5.557c-1.035 1.884-2.947 3.193-4.942 3.193c-1.519 0-2.96-.822-3.997-1.959a7 7 0 0 1-.902-1.23C5.247 11.555 3.75 9.737 3.75 7c0-.6.15-1.168.646-1.499c.385-.257.85-.253 1.062-.251h.806l.003-.028a2.25 2.25 0 0 1 1.955-1.955c.14-.017.295-.017.475-.017M7.75 6v.003L7.74 9.5v.001c0 .721.206 1.458.563 2.133l.014.025c.215.402.484.78.795 1.12c.842.924 1.908 1.471 2.889 1.471c1.422 0 2.921-1.028 3.7-2.544a4.8 4.8 0 0 0 .54-2.206l-.002-.002l.012-3.761v-.001c0-.242-.002-.294-.006-.329a.75.75 0 0 0-.651-.651a4 4 0 0 0-.33-.006H8.737c-.243 0-.295.001-.33.006a.75.75 0 0 0-.651.651a4 4 0 0 0-.006.33zm9.998.75l-.009 2.75v.001m-.023.539c.638-.768 1.035-1.77 1.035-3.04c0-.118-.01-.196-.019-.245a3 3 0 0 0-.231-.005h-.753M6.26 9.982a5 5 0 0 1-.022-.482v-.002l.009-2.748H5.5c-.109 0-.178 0-.231.005A1.3 1.3 0 0 0 5.25 7c0 1.237.388 2.22 1.01 2.982M12 16.25a.75.75 0 0 1 .75.75v2.25H16a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1 0-1.5h3.25V17a.75.75 0 0 1 .75-.75" />
            <path fill="currentColor" d="M11.77 6.555a.25.25 0 0 1 .46 0l.505 1.212a.25.25 0 0 0 .21.153l1.309.105a.25.25 0 0 1 .143.439l-.997.854a.25.25 0 0 0-.08.248l.304 1.276a.25.25 0 0 1-.374.272l-1.12-.684a.25.25 0 0 0-.26 0l-1.12.684a.25.25 0 0 1-.374-.272l.305-1.276a.25.25 0 0 0-.08-.248l-.998-.854a.25.25 0 0 1 .143-.44l1.308-.104a.25.25 0 0 0 .211-.153z" />
          </svg>
        </span>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Your Certificate Journey</h2>
          <p>
            Your name, Victor Eyo, will appear on your certificates.{' '}
            <Link to="/dashboard/profile">Click here to change your name</Link> on
            your profile page.
          </p>
        </div>
      </section>

      <div className="dash-card cert-block">
        <span className="cert-block__icon">
          {/* Certificate icon (same as sidebar) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
              <path d="M13 17.5V22l2-1.5l2 1.5v-4.5" />
              <path d="M10 19H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-1 1.73M6 9h12M6 12h3m-3 3h2" />
            </g>
          </svg>
        </span>
        <h3>Certificate Delivery</h3>
        <p>
          Certificates will be sent via email after completion of your registered
          program or course, and after payment for your certificate.
        </p>
        <div className="cert-note cert-note--req">
          <h4>
            {/* task icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 20h12m-12-8h12M12 4h12M1 19l3 3l5-5m-8-6l3 3l5-5m0-8L4 6L1 3" />
            </svg>
            Requirements
          </h4>
          <p>Complete all course modules and submit required assignments before requesting your certificate.</p>
        </div>
      </div>

      <div className="dash-card cert-block">
        <span className="cert-block__icon">
          {/* Briefcase icon (same as sidebar Portfolio) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              <path d="M3.75 9.894a2.5 2.5 0 0 1 2.5-2.5h11.5a2.5 2.5 0 0 1 2.5 2.5V17.5a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5z" />
              <path d="M17.75 7.394H6.25a2.5 2.5 0 0 0-2.5 2.5v.303a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-.303a2.5 2.5 0 0 0-2.5-2.5M8.603 5.5a1.5 1.5 0 0 1 1.5-1.5h3.794a1.5 1.5 0 0 1 1.5 1.5v1.894H8.603z" />
            </g>
          </svg>
        </span>
        <h3>Internship Qualification</h3>
        <p>
          Only those with <strong>verified certificates</strong> can qualify for
          internship placements and advanced career opportunities.
        </p>
        <div className="cert-note cert-note--benefit">
          <h4>
            {/* target icon */}
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
            </svg>
            Benefits
          </h4>
          <p>Certified students get priority access to job placements, mentorship programs, and industry partnerships.</p>
        </div>
      </div>
    </div>
  )
}

export default Certificate
