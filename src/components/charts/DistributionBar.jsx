import useThemeColors from '../../hooks/useThemeColors.js'
import { getPalette } from './palette.js'

// Refined input/output ratio: paired stats, a proportional track with a split
// marker, and a percentage scale. Colors follow the active chart palette.
export default function DistributionBar({ dist }) {
  const c = useThemeColors()
  const pal = getPalette(c)
  const { in: ins, out } = dist
  return (
    <div className="dist">
      <div className="dist__cols">
        <div className="dist__col">
          <span className="label">
            <i className="dist__sw" style={{ background: pal.swatchIn }} /> Input tokens
          </span>
          <div className="dist__val">
            <span className="serif tnum dist__num">{ins.value}<span className="dist__unit mono dim">M</span></span>
            <span className="dist__pct blue tnum">{ins.pct}%</span>
          </div>
        </div>
        <div className="dist__col dist__col--r">
          <span className="label">
            Output tokens <i className="dist__sw" style={{ background: pal.swatchOut }} />
          </span>
          <div className="dist__val dist__val--r">
            <span className="dist__pct dim tnum">{out.pct}%</span>
            <span className="serif tnum dist__num">{out.value}<span className="dist__unit mono dim">M</span></span>
          </div>
        </div>
      </div>

      <div className="dist__track">
        <div className="dist__seg dist__seg--in" style={{ width: `${ins.pct}%`, background: pal.distIn }} />
        <div className="dist__seg dist__seg--out" style={{ width: `${out.pct}%`, background: pal.distOut }} />
        <span className="dist__split" style={{ left: `${ins.pct}%`, borderTopColor: pal.line }} />
      </div>

      <div className="dist__scale mono">
        {[0, 25, 50, 75, 100].map((t) => (
          <span key={t} className="dist__tick">{t}</span>
        ))}
      </div>
    </div>
  )
}
