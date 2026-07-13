import './Imaobong.css'

function Imaobong() {
  return (
    <section className="imaobong">
      <div className="imaobong__inner">
        <div className="imaobong__text">
          <h2 className="imaobong__title">
            Not Sure Which Tech Skill to Learn?
          </h2>
          <p className="imaobong__body">
            If you&rsquo;re struggling to find the right tech program or don&rsquo;t
            know where to start, chat with Imaobong — our A.I. chatbot ready to
            guide you.
          </p>
          <a href="#" className="imaobong__btn">
            Chat with Imaobong
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        <div className="imaobong__avatar">
          <img src="/imaobong.png" alt="Imaobong, the Hakeela A.I. chatbot" />
        </div>
      </div>
    </section>
  )
}

export default Imaobong
