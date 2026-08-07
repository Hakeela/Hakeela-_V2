import './dashboard-pages.css'

function Portfolio() {
  return (
    <div className="dashpg">
      <div className="pf">
        <div className="pf__badges">
          <img src="/logo51.png" alt="Hakeela x Hack51" />
        </div>

        <h2>Learn and Build</h2>

        <p>
          At Hakeela, we are committed to not only providing you with top-notch
          tech skills but also ensuring that you are fully prepared for your
          career journey.
        </p>
        <p>
          That&apos;s why we&apos;ve partnered with{' '}
          <a href="#" className="pf__link">Hack51</a>, a leading portfolio
          building platform, to help our learners build their skills and
          experiences.
        </p>
        <p><strong>Start building your professional portfolio now</strong></p>

        <a href="#" className="dash-btn dash-btn--solid">Get Started →</a>
      </div>
    </div>
  )
}

export default Portfolio
