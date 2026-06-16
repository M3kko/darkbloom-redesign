import { memo, useMemo, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { viewBox, dots, pins } from '../../data/worldmap.js'

const [, , VBW, VBH] = viewBox.split(' ').map(Number)

// Static land-dot layer — generated from real country geometry (dotted-map).
// Memoized with no props so it renders once and never reconciles per-frame.
const LandDots = memo(function LandDots() {
  return (
    <g className="map__land">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.34" />
      ))}
    </g>
  )
})

function arc(a, b) {
  const [x1, y1] = a
  const [x2, y2] = b
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1) || 1
  const lift = Math.min(dist * 0.28, 14)
  const cx = mx
  const cy = my - lift
  return `M${x1} ${y1} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x2} ${y2}`
}

export default function NetworkFlowMap({ nodes = [], routes = [], mode = 'flow' }) {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState(null)

  const placed = useMemo(
    () => nodes.filter((n) => pins[n.id]).map((n) => ({ ...n, p: pins[n.id] })),
    [nodes],
  )
  const byId = useMemo(() => Object.fromEntries(placed.map((n) => [n.id, n])), [placed])

  const arcs = useMemo(
    () =>
      routes
        .map((r, i) => {
          const a = byId[r.from]
          const b = byId[r.to]
          if (!a || !b) return null
          return { d: arc(a.p, b.p), i, key: `${r.from}-${r.to}` }
        })
        .filter(Boolean),
    [routes, byId],
  )

  const hovered = hover ? byId[hover] : null

  return (
    <div className="map">
      <svg viewBox={viewBox} className="map__svg" preserveAspectRatio="xMidYMid meet">
        <LandDots />

        {mode === 'flow' &&
          arcs.map((a) => (
            <g key={a.key}>
              <path d={a.d} className="map__arc" fill="none" vectorEffect="non-scaling-stroke" />
              {!reduced && (
                <circle r="0.7" className="map__packet">
                  <animateMotion
                    dur={`${3 + (a.i % 4) * 0.55}s`}
                    begin={`${a.i * 0.45}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                    path={a.d}
                  />
                </circle>
              )}
            </g>
          ))}

        {placed.map((n) => {
          const provider = n.type === 'provider'
          const r = provider ? 0.9 + Math.min(0.9, (n.nodes || 1) * 0.12) : 0.62
          const delay = `${(Math.abs(n.p[0]) % 7) * 0.22}s`
          return (
            <g
              key={n.id}
              className={`map__node map__node--${n.type}`}
              transform={`translate(${n.p[0]} ${n.p[1]})`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
            >
              {!reduced && (
                <circle r={r} className="map__halo">
                  <animate attributeName="r" values={`${r};${r * 3.4};${r * 3.4}`} dur="2.8s" begin={delay} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0" dur="2.8s" begin={delay} repeatCount="indefinite" />
                </circle>
              )}
              {provider ? (
                <circle r={r * 0.66} className="map__core" vectorEffect="non-scaling-stroke" />
              ) : (
                <circle r={r * 0.8} className="map__ring" vectorEffect="non-scaling-stroke" />
              )}
              <circle r="2.4" fill="transparent" />
            </g>
          )
        })}
      </svg>

      {hovered && (
        <div
          className="map__tip mono"
          style={{ left: `${(hovered.p[0] / VBW) * 100}%`, top: `${(hovered.p[1] / VBH) * 100}%` }}
        >
          <span className="hi">{hovered.city}</span>
          <span className="dim">
            {hovered.type === 'provider' ? ` · ${hovered.nodes} nodes` : ' · demand origin'}
          </span>
        </div>
      )}

      <div className="map__legend mono">
        <span className="map__lk">
          <i className="map__sw map__sw--provider" /> providers
        </span>
        <span className="map__lk">
          <i className="map__sw map__sw--consumer" /> {mode === 'flow' ? 'live demand' : 'request origins'}
        </span>
      </div>
    </div>
  )
}
