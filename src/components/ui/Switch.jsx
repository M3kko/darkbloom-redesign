export default function Switch({ checked, onChange, label, id }) {
  return (
    <button
      type="button"
      className="switch"
      data-on={!!checked}
      role="switch"
      aria-checked={!!checked}
      onClick={() => onChange(!checked)}
      id={id}
    >
      <span className="switch__track"><span className="switch__knob" /></span>
      {label && <span className="switch__label">{label}</span>}
    </button>
  )
}
