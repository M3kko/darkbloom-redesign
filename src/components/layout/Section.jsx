export default function Section({ index, eyebrow, title, desc, aside, children, id }) {
  return (
    <section className="section shell" id={id}>
      <header className="section__head">
        <div className="section__head-main">
          <div className="section__eyebrow eyebrow">
            {index && <span className="section__num">{index}</span>}
            {index && <span className="section__rule" aria-hidden>—</span>}
            {eyebrow}
          </div>
          <h2 className="section-title section__title">{title}</h2>
          {desc && <p className="section__desc mono dim">{desc}</p>}
        </div>
        {aside && <div className="section__aside">{aside}</div>}
      </header>
      {children}
    </section>
  )
}
