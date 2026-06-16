export default function Segmented({ options, value, onChange, label }) {
  return (
    <div className="seg-wrap">
      {label && <span className="seg-label label">{label}</span>}
      <div className="seg" role="tablist">
        {options.map((opt) => {
          const active = opt === value
          return (
            <button
              key={opt}
              role="tab"
              aria-selected={active}
              className={`seg__item${active ? ' is-active' : ''}`}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
