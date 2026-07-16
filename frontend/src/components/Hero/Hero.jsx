import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      {/* Decorative background shapes */}
      <img
        className="hero__shapes"
        src="/hero-shapes.png"
        alt=""
        aria-hidden="true"
      />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__quote">&ldquo;</span>Building{' '}
          <mark className="hero__mark">the Future</mark> of Tech Inclusion one
          community <mark className="hero__mark">a time</mark>
          <span className="hero__quote">&rdquo;</span>
        </h1>

        <p className="hero__subtitle">using AI + Empathy</p>

        <p className="hero__desc">
          Creating an inclusive and sustainable future of edtech for young
          Africans that are marginalized, underprivileged, and specially
          assisted.
        </p>

        <a className="hero__cta" href="#">
          Learn More
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </a>
      </div>

      <div className="hero__gallery">
        <img
          className="hero__photo hero__photo--left"
          src="/hero-1.png"
          alt="Learners collaborating at a computer"
        />
        <img
          className="hero__photo hero__photo--mid"
          src="/hero-2.png"
          alt="A mentor guiding a student at a keyboard"
        />
        <img
          className="hero__photo hero__photo--right"
          src="/hero-3.png"
          alt="An instructor supporting students in a computer lab"
        />
        <img
          className="hero__photo-mobile"
          src="/init-2.png"
          alt="Learners collaborating at a computer"
        />
      </div>
    </section>
  )
}

export default Hero
