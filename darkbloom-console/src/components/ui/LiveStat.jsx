import { useLiveValue, fmtNum } from '../../hooks/useTicker.js'

// A compact ticking metric used in the map stat rail.
export default function LiveStat({ label, value, fmt = 'int', sub, seed = 1 }) {
  const live = useLiveValue(value ?? 0, { amp: value ? 0.003 : 0, seed })

  let display
  if (fmt === 'pending' || value == null) display = '—'
  else if (fmt === 'k') display = `${fmtNum(live / 1000, 1)}K`
  else if (fmt === 'm') display = `${fmtNum(live, 1)}M`
  else display = fmtNum(Math.round(live))

  return (
    <div className="lstat">
      <span className="label lstat__label">{label}</span>
      <span className="lstat__value serif tnum">{display}</span>
      {sub && <span className="lstat__sub mono dim tnum">{sub}</span>}
    </div>
  )
}
