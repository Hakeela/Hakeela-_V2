const items = ['Tech Education', 'Remote Learning', 'Inclusive Design', 'Innovation Hub', 'Africa-First']

function Marquee() {
  return (
    <section className="marquee">
      <div className="container marquee__row">
        {items.map((item, i) => (
          <span className="marquee__item" style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }} key={item}>
            {item}
            {i < items.length - 1 && <span className="marquee__dot" />}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Marquee
