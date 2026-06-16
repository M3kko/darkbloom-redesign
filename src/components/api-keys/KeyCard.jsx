import { Power, Pencil, RefreshCw, Trash2 } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge.jsx'

const STATUS_TONE = { active: 'verified', disabled: 'offline', expired: 'fault', rotated: 'degraded' }

function fmt(n) {
  return n == null ? '∞' : n.toLocaleString()
}

export default function KeyCard({ k, onEdit, onRotate, onRevoke, onToggle }) {
  const util = k.spendCap ? Math.min(100, (k.used / k.spendCap) * 100) : 0
  const utilTone = util >= 80 ? 'var(--text-hi)' : util >= 50 ? 'var(--text-mid)' : 'var(--blue)'
  return (
    <div className={`keycard${k.status !== 'active' ? ' is-dim' : ''}`}>
      <div className="keycard__top">
        <div className="keycard__id">
          <span className="keycard__name mono hi">{k.name || 'Untitled key'}</span>
          <StatusBadge tone={STATUS_TONE[k.status] || 'offline'}>{k.status}</StatusBadge>
          {k.isConsoleKey && <span className="keycard__tag">Console key</span>}
          {k.selfRoute && <span className="keycard__tag keycard__tag--free">My Machine · Free</span>}
        </div>
        <div className="keycard__actions">
          <button className="iconbtn iconbtn--sm" onClick={() => onToggle(k)} title={k.status === 'active' ? 'Disable key' : 'Enable key'}><Power size={14} /></button>
          <button className="iconbtn iconbtn--sm" onClick={() => onEdit(k)} title="Edit limits"><Pencil size={14} /></button>
          <button className="iconbtn iconbtn--sm" onClick={() => onRotate(k)} title="Rotate secret"><RefreshCw size={14} /></button>
          <button className="iconbtn iconbtn--sm keycard__danger" onClick={() => onRevoke(k)} title="Revoke key"><Trash2 size={14} /></button>
        </div>
      </div>

      {k.label && <div className="keycard__label mono dim">{k.label}</div>}

      <div className="keycard__usage">
        <div className="keycard__usagebar">
          <div className="keycard__usagefill" style={{ width: `${util}%`, background: utilTone }} />
        </div>
        <span className="keycard__usagetext mono tnum">
          {k.spendCap ? `$${k.used.toFixed(2)} / $${k.spendCap.toFixed(2)}` : `$${k.used.toFixed(2)} used · Unlimited`}
          <span className="keycard__win">{k.window}</span>
        </span>
      </div>

      <div className="keycard__chips">
        {k.rpm != null && <span className="chip mono"><span className="dim">RPM</span> {fmt(k.rpm)}</span>}
        {k.itpm != null && <span className="chip mono"><span className="dim">ITPM</span> {fmt(k.itpm)}</span>}
        {k.otpm != null && <span className="chip mono"><span className="dim">OTPM</span> {fmt(k.otpm)}</span>}
        {k.models.length > 0 && <span className="chip mono" title={k.models.join(', ')}>{k.models.length} model{k.models.length > 1 ? 's' : ''}</span>}
      </div>

      <div className="keycard__meta mono dim">
        Last used {k.lastUsed} · Created {k.created}{k.expires ? ` · Expires ${k.expires}` : ''}
      </div>
    </div>
  )
}
