import './Prodigy.css'

function Prodigy() {
  return (
    <section className="prodigy">
      <div className="prodigy__inner">
        <div className="prodigy__figure">
          <img src="/hab-prodigy.png" alt="A 16-year-old speech-impaired design prodigy trained by Hakeela" />
        </div>
        <div className="prodigy__text">
          <h2 className="prodigy__quote">
            &ldquo;Meet 16 year old speech impaired design prodigy. Just like Bright,
            we are training and equipping young people with special needs across 4
            African countries and more with tech skills&rdquo;
          </h2>
          <a href="https://hakeela.org/blog" target="_blank" rel="noopener noreferrer" className="prodigy__btn">
            Read More
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Prodigy
