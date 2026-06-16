import { useState } from 'react'
import Section from '../layout/Section.jsx'
import Card, { CardHeader } from '../ui/Card.jsx'
import Kpi from '../ui/Kpi.jsx'
import Tabs from '../ui/Tabs.jsx'
import Button from '../ui/Button.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import LiveStat from '../ui/LiveStat.jsx'
import CapacityBar from '../ui/CapacityBar.jsx'
import LineChart from '../charts/LineChart.jsx'
import BarChart from '../charts/BarChart.jsx'
import DistributionBar from '../charts/DistributionBar.jsx'
import NetworkFlowMap from '../charts/NetworkFlowMap.jsx'
import useThemeColors from '../../hooks/useThemeColors.js'
import { getPalette } from '../charts/palette.js'
import {
  kpis,
  secondary,
  requestsSeries,
  tokensSeries,
  tokenDistribution,
  flowNodes,
  flowRoutes,
  flowStats,
  flowSummary,
  providerCapacity,
  capacityFootnote,
  geographySummary,
  topOrigins,
  leaderboard,
} from '../../data/network.js'

function Overview() {
  const c = useThemeColors()
  const pal = getPalette(c)
  return (
    <>
      {/* KPI ROW */}
      <div className="grid grid--kpi">
        {kpis.map((k, i) => (
          <Kpi key={k.label} {...k} decimals={k.suffix === 'M' || k.suffix === 'K' ? 1 : 0} seed={i + 1} />
        ))}
      </div>

      {/* SECONDARY METRICS */}
      <div className="grid grid--metrics">
        {secondary.map((m) => (
          <div className="metric" key={m.label}>
            <span className="metric__value serif tnum">
              {m.value}
              {m.unit && <span className="metric__unit mono dim"> {m.unit}</span>}
            </span>
            <span className="label metric__label">{m.label}</span>
            <span className="metric__sub mono dim">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid--charts">
        <Card>
          <CardHeader>
            <div className="ch-head">
              <span className="eyebrow">Requests / minute</span>
              <span className="mono dim tnum ch-head__meta">3.3K total · peak 106 · 30 min</span>
            </div>
            <StatusBadge tone="online" pulse>Live</StatusBadge>
          </CardHeader>
          <div className="card__body">
            <LineChart data={requestsSeries} />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="ch-head">
              <span className="eyebrow">Tokens / minute</span>
              <span className="mono dim tnum ch-head__meta">2.2M tokens · 30 min</span>
            </div>
            <div className="ch-legend mono dim">
              <span><i className="bc__sw" style={{ background: pal.swatchIn }} />Input</span>
              <span><i className="bc__sw" style={{ background: pal.swatchOut }} />Output</span>
            </div>
          </CardHeader>
          <div className="card__body">
            <BarChart data={tokensSeries} />
          </div>
        </Card>
      </div>

      {/* TOKEN DISTRIBUTION */}
      <Card className="card--pad">
        <div className="ch-head ch-head--row">
          <span className="eyebrow">Token distribution</span>
          <span className="mono dim tnum">1624.5M total</span>
        </div>
        <DistributionBar dist={tokenDistribution} />
      </Card>
    </>
  )
}

function Leaderboard() {
  return (
    <Card className="card--pad">
      <div className="lb">
        <div className="lb__row lb__row--head label">
          <span>#</span>
          <span>Node region</span>
          <span className="lb__r">Tokens served</span>
          <span className="lb__r">Share</span>
          <span className="lb__r">TPS</span>
        </div>
        {leaderboard.map((r) => (
          <div className="lb__row" key={r.rank}>
            <span className="lb__rank serif">{r.rank}</span>
            <span className="lb__node mono hi">{r.node}</span>
            <span className="lb__r mono tnum">{r.tokens}</span>
            <span className="lb__share">
              <CapacityBar pct={r.share * 4} />
              <span className="mono dim tnum">{r.share}%</span>
            </span>
            <span className="lb__r mono blue tnum">{r.tps}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function NetworkStats() {
  const [tab, setTab] = useState('Overview')

  return (
    <Section
      index="01"
      eyebrow="Network"
      title="Network statistics"
      desc="Live metrics from the Darkbloom decentralised inference network — encrypted in, verified out."
      aside={
        <>
          <StatusBadge tone="online" pulse>Live</StatusBadge>
          <Button variant="secondary" size="sm" iconOnly aria-label="Refresh">↻</Button>
        </>
      }
    >
      <div className="tabs-bar">
        <Tabs tabs={['Overview', 'Leaderboard']} value={tab} onChange={setTab} />
      </div>

      {tab === 'Overview' ? <Overview /> : <Leaderboard />}

      {/* LIVE NETWORK FLOW */}
      <div className="block-head">
        <div>
          <h3 className="card-title">Live network flow</h3>
          <p className="mono dim block-head__sub">
            Privacy-bucketed consumer demand flowing into online provider capacity.
          </p>
        </div>
        <div className="flow-summary">
          {flowSummary.map((s) => (
            <div className="flow-summary__item" key={s.label}>
              <span className="serif tnum flow-summary__v">{s.value}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid--flow">
        <Card className="card--map">
          <NetworkFlowMap nodes={flowNodes} routes={flowRoutes} mode="flow" />
        </Card>
        <Card className="card--rail">
          <div className="rail">
            {flowStats.map((s, i) => (
              <LiveStat key={s.label} {...s} seed={i + 3} />
            ))}
          </div>
        </Card>
      </div>

      {/* PROVIDER CAPACITY */}
      <div className="block-head">
        <div>
          <h3 className="card-title">Provider capacity</h3>
          <p className="mono dim block-head__sub">Online hardware grouped by metro region.</p>
        </div>
      </div>
      <Card className="card--pad">
        <ul className="caplist">
          {providerCapacity.map((c) => (
            <li className="caprow" key={c.city}>
              <span className="caprow__city mono hi">{c.city}</span>
              <span className="caprow__meta mono dim tnum">
                {c.attested}% attested · {c.gpu} GPU · {c.ram} GB RAM
              </span>
              <span className="caprow__nodes">
                <span className="serif tnum">{c.nodes}</span>
                <span className="label"> nodes</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="caplist__foot mono dim">{capacityFootnote}</p>
      </Card>

      {/* REQUEST GEOGRAPHY */}
      <div className="block-head">
        <div>
          <h3 className="card-title">Request geography</h3>
          <p className="mono dim block-head__sub">
            Privacy-bucketed demand origins from the last 24 hours.
          </p>
        </div>
        <div className="flow-summary">
          {geographySummary.map((s) => (
            <div className="flow-summary__item" key={s.label}>
              <span className="serif tnum flow-summary__v">{s.value}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid--flow">
        <Card className="card--map">
          <NetworkFlowMap nodes={flowNodes} mode="origins" />
        </Card>
        <Card className="card--rail">
          <div className="origins">
            <span className="label origins__title">Top origins</span>
            {topOrigins.map((o) => (
              <div className="origin" key={o.city}>
                <div className="origin__main">
                  <span className="origin__city mono hi">{o.city}</span>
                  <span className="origin__reg serif tnum">
                    {o.reg}<span className="label"> reg</span>
                  </span>
                </div>
                <div className="origin__meta mono dim tnum">
                  {o.tokens} tokens · {o.io} · {o.nodes} nodes
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}
