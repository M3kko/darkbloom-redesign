// Horizontal progress in the blue ramp. variant: solid | tint
export default function CapacityBar({ pct = 0, variant = 'solid', height = 6, animate = true }) {
  const clamped = Math.max(0, Math.min(100, pct))
  return (
    <div className="capbar" style={{ height }}>
      <div
        className={`capbar__fill capbar__fill--${variant}${animate ? ' is-animated' : ''}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
