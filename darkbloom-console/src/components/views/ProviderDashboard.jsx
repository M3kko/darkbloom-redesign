import { useMemo, useState } from 'react'
import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import Segmented from '../ui/Segmented.jsx'
import CapacityBar from '../ui/CapacityBar.jsx'
import { Field, Select } from '../ui/Field.jsx'
import Tabs from '../ui/Tabs.jsx'
import MyFleet from '../providers/MyFleet.jsx'
import {
  nodes,
  providerSummary,
  statusFilters,
  trustFilters,
  sortOptions,
  modelFilters,
} from '../../data/providers.js'

function trustTone(trust) {
  return trust === 'hardware' ? 'verified' : trust === 'basic' ? 'degraded' : 'offline'
}

// Collapse the node's status flags into one labelled badge — a bare dot can't
// say whether a node is serving traffic, idle, or down (design system §6: dot + label).
function nodeStatus(n) {
  if (!n.online) return { tone: 'offline', label: 'Offline' }
  if (n.serving) return { tone: 'online', label: 'Serving', pulse: true }
  return { tone: 'online', label: 'Idle' }
}

function NodeRow({ n, open, onToggle, verified }) {
  const status = nodeStatus(n)
  return (
    <Card className={`node${open ? ' is-open' : ''}`} verify={open && verified}>
      <button className="node__summary" onClick={onToggle} aria-expanded={open}>
        <span className="node__lead">
          <StatusBadge tone={status.tone} pulse={status.pulse}>{status.label}</StatusBadge>
          <span className="node__chip">
            <span className="node__name mono hi">{n.chip}</span>
            <span className="node__id mono dim">{n.machine} · {n.id}</span>
          </span>
        </span>

        <span className="node__metrics">
          <span className="nmetric"><span className="label">RAM</span><span className="mono tnum">{n.ram}</span></span>
          <span className="nmetric"><span className="label">GPU</span><span className="mono tnum">{n.gpuRaw}</span></span>
          <span className="nmetric"><span className="label">Req</span><span className="mono tnum">{n.req}</span></span>
          <span className="nmetric"><span className="label">Tok</span><span className="mono tnum hi">{n.tok}</span></span>
        </span>

        <span className="node__badges">
          {n.routable && <StatusBadge tone="verified">Routable</StatusBadge>}
          <StatusBadge tone={trustTone(n.trust)} outline={n.trust !== 'hardware'}>
            {n.trust === 'hardware' ? 'Hardware' : n.trust === 'basic' ? 'Basic' : 'None'}
          </StatusBadge>
          <span className="node__caret mono dim" aria-hidden>{open ? '–' : '+'}</span>
        </span>
      </button>

      <div className="node__model mono dim">{n.model}</div>
      <CapacityBar pct={n.capacity} height={3} animate={false} />

      {open && (
        <div className="node__detail">
          <div className="node__specs">
            {[
              ['Memory', n.ram],
              ['GPU', n.gpu],
              ['CPU', n.cpu],
              ['Bandwidth', n.bandwidth],
            ].map(([k, v]) => (
              <div className="spec" key={k}>
                <span className="label">{k}</span>
                <span className="mono hi tnum">{v}</span>
              </div>
            ))}
          </div>

          <div className="cert">
            <div className="cert__head">
              <span className="eyebrow">Certificate verification</span>
              <Button variant="secondary" size="sm">Verify ✶</Button>
            </div>
            <div className="cert__grid">
              {[
                ['Trust', n.cert.trust],
                ['Challenge', n.cert.challenge],
                ['Certificates', n.cert.certificates],
                ['Serial', n.cert.serial],
              ].map(([k, v]) => (
                <div className="spec" key={k}>
                  <span className="label">{k}</span>
                  <span className="mono hi">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default function ProviderDashboard() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [trust, setTrust] = useState('All trust')
  const [sort, setSort] = useState(sortOptions[0])
  const [model, setModel] = useState(modelFilters[0])
  const [openId, setOpenId] = useState(nodes[0].id)
  const [tab, setTab] = useState('Network nodes')

  const visible = useMemo(() => {
    let list = nodes.filter((n) => {
      if (query) {
        const q = query.toLowerCase()
        if (!`${n.chip} ${n.machine} ${n.id} ${n.model}`.toLowerCase().includes(q)) return false
      }
      if (status === 'Routable' && !n.routable) return false
      if (status === 'Serving' && !n.serving) return false
      if (status === 'Online' && !n.online) return false
      if (status === 'Needs attention' && !n.needsAttention) return false
      if (trust === 'Hardware' && n.trust !== 'hardware') return false
      if (trust === 'Basic' && n.trust !== 'basic') return false
      if (model !== 'All models' && !n.model.toLowerCase().includes(model.split(' ')[0])) return false
      return true
    })
    const key = {
      'Sort by capacity': (n) => n.capacity,
      'Sort by requests': (n) => n.reqRaw,
      'Sort by tokens': (n) => n.tokRaw,
      'Sort by RAM': (n) => parseInt(n.ram),
    }[sort]
    return [...list].sort((a, b) => key(b) - key(a))
  }, [query, status, trust, sort, model])

  return (
    <Section
      index="03"
      eyebrow="Providers"
      title="Provider dashboard"
      desc="Routability, node health, model coverage, and certificate verification."
      aside={
        <div className="model-summary">
          {providerSummary.map((s) => (
            <div className="model-summary__item" key={s.label}>
              <span className="serif tnum">{s.value}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      }
    >
      <div className="tabs-bar">
        <Tabs tabs={['Network nodes', 'My fleet']} value={tab} onChange={setTab} />
      </div>

      {tab === 'My fleet' ? (
        <MyFleet />
      ) : (
        <>
      <Card className="card--pad toolbar">
        <div className="toolbar__row">
          <Field
            icon="⌕"
            placeholder="Search node, chip, model, id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search nodes"
          />
          <Select options={modelFilters} value={model} onChange={(e) => setModel(e.target.value)} aria-label="Model filter" />
          <Select options={sortOptions} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" />
        </div>
        <div className="toolbar__row toolbar__row--filters">
          <Segmented label="Status" options={statusFilters} value={status} onChange={setStatus} />
          <Segmented label="Trust" options={trustFilters} value={trust} onChange={setTrust} />
        </div>
      </Card>

      <div className="nodelist">
        {visible.map((n) => (
          <NodeRow
            key={n.id}
            n={n}
            verified={n.trust === 'hardware'}
            open={openId === n.id}
            onToggle={() => setOpenId((id) => (id === n.id ? null : n.id))}
          />
        ))}
        {visible.length === 0 && (
          <Card className="card--pad node--empty">
            <span className="mono dim">
              No nodes match this filter. Clear the search or widen status to recover coverage.
            </span>
          </Card>
        )}
      </div>
        </>
      )}
    </Section>
  )
}
