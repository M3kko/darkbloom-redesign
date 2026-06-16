export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((t) => {
        const key = typeof t === 'string' ? t : t.value
        const label = typeof t === 'string' ? t : t.label
        const active = key === value
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            className={`tab${active ? ' is-active' : ''}`}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
