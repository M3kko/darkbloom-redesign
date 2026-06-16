import { useState } from 'react'
import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import CapacityBar from '../ui/CapacityBar.jsx'
import { TrendingDown, Users, HardDrive } from 'lucide-react'
import { models, modelSummary, fleet, deprecatedCount, pricing, pricingBaseline } from '../../data/models.js'

function ModelCard({ m }) {
  const p = pricing[m.id]
  return (
    <Card className="modelcard">
      <div className="modelcard__head">
        <div className="modelcard__id">
          <span className="modelcard__icon" aria-hidden>◇</span>
          <h3 className="card-title modelcard__name">{m.name}</h3>
          <StatusBadge tone="verified">Verified</StatusBadge>
        </div>
        <span className="badge modelcard__badge">{m.badge}</span>
      </div>

      {p && (
        <div className="modelcard__pricing">
          <div className="mprice">
            <span className="mprice__v serif tnum">${p.input.toFixed(2)} <span className="mono dim">/</span> ${p.output.toFixed(2)}</span>
            <span className="label">per 1M tokens · in / out</span>
          </div>
          <span className="mprice__save"><TrendingDown size={12} /> {Math.round((1 - p.output / p.baseline) * 100)}% cheaper</span>
        </div>
      )}

      <div className="modelcard__stats">
        {m.stats.map((s) => (
          <div className="mstat" key={s.label}>
            <span className="serif tnum mstat__v">{s.value}</span>
            <span className="label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="modelcard__meta">
        {m.meta.map(([k, v]) => (
          <span className="chip mono" key={k}>
            <span className="dim">{k}</span> {v}
          </span>
        ))}
      </div>

      <div className="modelcard__perf">
        {m.perf.map((p) => (
          <div className="perf" key={p.label}>
            <span className="perf__v mono hi tnum">{p.value}</span>
            <span className="label">{p.label}</span>
          </div>
        ))}
      </div>

      <div className="modelcard__bars">
        <div className="barlabel">
          <span className="label">Visible model slots</span>
          <span className="mono dim tnum">{m.visibleSlots}%</span>
        </div>
        <CapacityBar pct={m.visibleSlots} variant="tint" height={8} />
        <div className="barlabel">
          <span className="label">Routable coverage</span>
          <span className="mono blue tnum">{m.routableCoverage}%</span>
        </div>
        <CapacityBar pct={m.routableCoverage} variant="solid" height={8} />
      </div>

      {p && (
        <div className="modelcard__foot">
          <span className="mono dim"><Users size={12} /> {p.providers} providers</span>
          {p.attested && <span className="mono blue"><HardDrive size={12} /> Attested</span>}
        </div>
      )}
    </Card>
  )
}

function FleetSidebar() {
  return (
    <Card className="fleet card--pad">
      <div className="fleet__head">
        <span className="label">Fleet</span>
        <span className="mono dim tnum">{fleet.routable} / {fleet.total}</span>
      </div>
      <div className="fleet__bigrow">
        <span className="kpi-number tnum">{fleet.routable}</span>
        <span className="mono dim">routable slots</span>
      </div>

      <div className="fleet__shares">
        {fleet.shares.map((s) => (
          <div className="fleet__share" key={s.id}>
            <div className="barlabel">
              <span className="mono mid">{s.label}</span>
              <span className="mono blue tnum">{s.pct}%</span>
            </div>
            <CapacityBar pct={s.pct} variant={s.id === fleet.shares[0].id ? 'solid' : 'tint'} height={6} />
          </div>
        ))}
      </div>

      <div className="fleet__coverage card--verify">
        <span className="label">Routable coverage</span>
        <span className="kpi-number tnum">{fleet.coverage}%</span>
        <span className="mono dim">of fleet attested &amp; routable</span>
      </div>
    </Card>
  )
}

export default function ActiveModels() {
  const [showDeprecated, setShowDeprecated] = useState(false)

  return (
    <Section
      index="02"
      eyebrow="Models"
      title="Active models"
      desc="Catalog metadata, live capacity, and trusted node coverage across the fleet."
      aside={
        <>
          <div className="model-summary">
            {modelSummary.map((s) => (
              <div className="model-summary__item" key={s.label}>
                <span className="serif tnum">{s.value}</span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div>
          <button
            className="switch"
            data-on={showDeprecated}
            onClick={() => setShowDeprecated((v) => !v)}
            aria-pressed={showDeprecated}
          >
            <span className="switch__track"><span className="switch__knob" /></span>
            Show deprecated ({deprecatedCount})
          </button>
        </>
      }
    >
      <div className="grid grid--models">
        <div className="models-col">
          {models.map((m) => (
            <ModelCard key={m.id} m={m} />
          ))}
          {showDeprecated && (
            <Card className="card--pad modelcard--empty">
              <span className="mono dim">
                {deprecatedCount} deprecated models hidden by default — routing disabled, retained for audit.
              </span>
            </Card>
          )}
        </div>
        <FleetSidebar />
      </div>

      <div className="block-head">
        <div>
          <h3 className="card-title">Pricing vs baseline</h3>
          <p className="mono dim block-head__sub">
            Darkbloom runs on idle Apple Silicon, benchmarked against typical hosted-API list rates.
          </p>
        </div>
      </div>
      <Card className="card--pad">
        <div className="pvb">
          <div className="pvb__row pvb__row--head label">
            <span>Model</span><span className="pvb__r">Darkbloom</span><span className="pvb__r">Baseline</span><span className="pvb__r">Savings</span>
          </div>
          {pricingBaseline.map((r) => (
            <div className="pvb__row" key={r.model}>
              <span className="pvb__model"><span className="mono hi">{r.model}</span><span className="mono dim pvb__unit">{r.unit}</span></span>
              <span className="pvb__r mono blue tnum">{r.darkbloom}</span>
              <span className="pvb__r mono dim tnum pvb__strike">{r.baseline}</span>
              <span className="pvb__r"><span className="pvb__save"><TrendingDown size={11} /> {r.savings}%</span></span>
            </div>
          ))}
        </div>
        <p className="pvb__foot mono dim">Baseline prices reflect typical hosted-API list rates as of April 2026.</p>
      </Card>
    </Section>
  )
}
