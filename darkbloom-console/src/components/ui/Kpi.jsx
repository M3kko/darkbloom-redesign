import Sparkline from './Sparkline.jsx'
import { useLiveValue, useCountUp, fmtNum } from '../../hooks/useTicker.js'

export default function Kpi({ label, value, suffix = '', sub, spark, delta, deltaUp, decimals = 0, seed = 1, live = true }) {
  // Count up once on mount, then drift gently to feel live.
  const counted = useCountUp(value, { duration: 900, delay: seed * 60 })
  const drifted = useLiveValue(value, { amp: live ? 0.0025 : 0, seed })
  // Use counted while it's still climbing toward target; then drift.
  const shown = counted < value - 0.001 ? counted : drifted
  const showDecimals = Math.abs(value % 1) > 0 ? Math.max(decimals, 1) : decimals

  return (
    <div className="kpi rise">
      <div className="kpi__top">
        <span className="label kpi__label">{label}</span>
        {delta && (
          <span className={`kpi__delta${deltaUp ? ' is-up' : ''}`}>{delta}</span>
        )}
      </div>
      <div className="kpi__numrow">
        <span className="kpi-number tnum">
          {fmtNum(shown, showDecimals)}
          {suffix && <span className="kpi__suffix">{suffix}</span>}
        </span>
      </div>
      {spark && (
        <div className="kpi__spark">
          <Sparkline data={spark} />
        </div>
      )}
      {sub && <div className="kpi__sub mono dim tnum">{sub}</div>}
    </div>
  )
}
