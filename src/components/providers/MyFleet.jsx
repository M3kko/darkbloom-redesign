import { useState } from 'react'
import { Cpu, AlertTriangle, ChevronDown } from 'lucide-react'
import Card from '../ui/Card.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import CapacityBar from '../ui/CapacityBar.jsx'
import TrustBadge from '../trust/TrustBadge.jsx'
import { fleetHealth, attention, myMachines } from '../../data/fleet.js'

function FleetHealthStrip() {
  return (
    <Card className="card--pad fhealth">
      <div className="fhealth__verdict">
        <span className="fhealth__dot" />
        <div>
          <div className="mono hi fhealth__title">Fleet healthy</div>
          <span className="mono dim">{fleetHealth.online} of {fleetHealth.total} machines online · {fleetHealth.earning} earning · {fleetHealth.version}</span>
        </div>
      </div>
    </Card>
  )
}

function AttentionFeed() {
  if (!attention.length) return null
  return (
    <div className="afeed">
      {attention.map((a) => (
        <div key={a.id} className={`afeed__item afeed__item--${a.tone}`}>
          <AlertTriangle size={14} className="afeed__icon" />
          <div>
            <div className="mono hi afeed__title">{a.title}</div>
            <span className="mono dim">{a.body}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const THERMAL = { nominal: 1, fair: 2, serious: 3, critical: 4 }

function MachineCard({ m }) {
  const [open, setOpen] = useState(false)
  const earning = m.verdict === 'earning'
  const verdictLabel = m.verdict === 'earning' ? 'Earning' : m.verdict === 'idle' ? 'Idle' : 'Not earning'
  return (
    <Card className="machine" verify={earning}>
      <div className="machine__head">
        <span className="machine__avatar"><Cpu size={15} />{m.serving && <span className="machine__pulse" />}</span>
        <div className="machine__id">
          <span className="mono hi machine__chip">{m.chip}</span>
          <span className="mono dim machine__sub">{m.machine} · {m.serial} · {m.version}</span>
        </div>
        <div className="machine__badges">
          <StatusBadge tone={m.serving ? 'online' : m.online ? 'degraded' : 'offline'} pulse={m.serving}>{m.serving ? 'Serving' : m.online ? 'Online' : 'Offline'}</StatusBadge>
          <TrustBadge trust={m.trust} compact />
        </div>
      </div>

      <div className={`machine__verdict machine__verdict--${m.verdict}`}>
        <span className="machine__verdicttag">{verdictLabel}</span>
        {m.reason && <span className="mono dim machine__reason">{m.reason}</span>}
      </div>

      <div className="machine__vitals">
        <div className="vital">
          <span className="label">Decode</span>
          <span className="mono hi tnum">{m.decodeTps} <span className="dim">tok/s</span></span>
          <CapacityBar pct={(m.decodeTps / m.decodeMax) * 100} height={3} animate={false} />
        </div>
        <div className="vital"><span className="label">CPU</span><span className="mono hi tnum">{m.cpu}%</span></div>
        <div className="vital"><span className="label">Mem</span><span className="mono hi">{m.memPressure}</span></div>
        <div className="vital">
          <span className="label">Thermal</span>
          <span className="thermpips">{[1, 2, 3, 4].map((i) => <i key={i} className={i <= THERMAL[m.thermal] ? 'on' : ''} />)}</span>
        </div>
        <div className="vital"><span className="label">Pending</span><span className="mono hi tnum">{m.pending}</span></div>
      </div>

      <div className="machine__models mono dim">{m.current || 'no model loaded'} · warm: {m.warm.join(', ')}</div>

      <div className="machine__earn">
        <div><span className="label">Lifetime</span><span className="mono hi tnum">{m.lifetimeTokens} tok · {m.lifetimeEarn}</span></div>
        <div><span className="label">Last 24h</span><span className="mono hi tnum">{m.day1Tokens} tok · {m.day1Earn}</span></div>
      </div>

      <button className="machine__disclose mono" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Backend slots & GPU memory <ChevronDown size={13} className={open ? 'rot' : ''} />
      </button>
      {open && (
        <div className="machine__slots">
          {m.slots.map((s) => (
            <div className="slot" key={s.model}>
              <StatusBadge tone={s.state === 'running' ? 'online' : 'offline'}>{s.state.replace('_', ' ')}</StatusBadge>
              <span className="mono">{s.model}</span>
              <span className="mono dim tnum">{s.active} active tok</span>
            </div>
          ))}
          <div className="slot slot--mem mono dim tnum">
            GPU memory: {m.gpuMem.active} GB active · {m.gpuMem.peak} GB peak · {m.gpuMem.cache} GB cache · {m.gpuMem.total} GB total
          </div>
        </div>
      )}
    </Card>
  )
}

export default function MyFleet() {
  return (
    <div className="myfleet">
      <FleetHealthStrip />
      <AttentionFeed />
      <div className="myfleet__grid">
        {myMachines.map((m) => (
          <MachineCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  )
}
