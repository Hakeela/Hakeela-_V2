const items = ['Tech Education', 'Remote Learning', 'Inclusive Design', 'Innovation Hub', 'Africa-First']

// Two copies so the track can loop seamlessly (animate -50% = one full copy).
const seq = [...items, ...items]

function Marquee() {
  return (
    <section className="marquee" aria-label="What HakVersity stands for">
      <div className="marquee__track">
        {seq.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}

export default Marquee
