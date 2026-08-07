import './Footer.css'

const quickLinks = [
  { label: 'HakPortal', href: '#' },
  { label: 'HakAbilityTech', href: '#' },
  { label: 'HakStudios', href: '#' },
  { label: 'Hakeela Fund', href: '#' },
  { label: 'HakVersity', href: '#' },
  { label: 'Hakeela Tech Hub', href: '#' },
]

const resources = [
  { label: 'Blog', href: '#' },
  { label: 'About us', href: '#' },
  { label: 'Our team', href: '#' },
  { label: 'Donate', href: '#' },
]

const contacts = [
  { label: '+2347040247816', href: 'tel:+2347040247816' },
  { label: '+2349019006751', href: 'tel:+2349019006751' },
  { label: 'hello.wgdtafrica@gmail.com', href: 'mailto:hello.wgdtafrica@gmail.com' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand column */}
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/logo-white.png"
            alt="Hakeela logo"
            width="72"
            height="72"
          />
          <p className="footer__tagline">The Future of Tech Inclusion</p>

          <div className="footer__socials" aria-label="Social links">
            <a href="#" aria-label="Facebook" className="footer__social">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="footer__social">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M23.95 4.57a10 10 0 0 1-2.83.78 4.94 4.94 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.39 4.49A13.98 13.98 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.94 4.94 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.88 9.88 0 0 1 0 19.54 13.94 13.94 0 0 0 7.55 21.75c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63a9.94 9.94 0 0 0 2.46-2.55Z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="footer__social">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="footer__social">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="footer__col" aria-label="Quick Links">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a className="footer__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav className="footer__col" aria-label="Resources">
          <h3 className="footer__heading">Resources</h3>
          <ul className="footer__list">
            {resources.map((item) => (
              <li key={item.label}>
                <a className="footer__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list">
            {contacts.map((item) => (
              <li key={item.label}>
                <a className="footer__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer__copy">
        Hakeela- The Future of Tech Inclusion. Established since 2019
      </p>
    </footer>
  )
}

export default Footer
