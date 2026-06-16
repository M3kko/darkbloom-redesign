// Inline KPI sparkline stroked in --blue (design system §6 KPI).
export default function Sparkline({ data = [], width = 96, height = 28, fill = true }) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const stepX = width / (data.length - 1)
  const pts = data.map((d, i) => {
    const x = i * stepX
    const y = height - ((d - min) / span) * (height - 4) - 2
    return [x, y]
  })
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width} ${height} L0 ${height} Z`
  const [lx, ly] = pts[pts.length - 1]

  return (
    <svg className="spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {fill && <path d={area} fill="var(--blue)" opacity="0.07" />}
      <path d={line} fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="2" fill="var(--blue)" />
    </svg>
  )
}
