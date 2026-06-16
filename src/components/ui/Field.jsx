export function Field({ icon, className = '', ...rest }) {
  return (
    <div className={`field ${className}`}>
      {icon && <span className="field__icon" aria-hidden>{icon}</span>}
      <input className="field__input" {...rest} />
    </div>
  )
}

export function Select({ options = [], className = '', ...rest }) {
  return (
    <div className={`field field--select ${className}`}>
      <select className="field__input" {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="field__caret" aria-hidden>▾</span>
    </div>
  )
}
