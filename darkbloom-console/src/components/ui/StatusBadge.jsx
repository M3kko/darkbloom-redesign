// Status = blue + neutral severity ladder (design system §2.4). No green/amber/red.
// tone: verified | online | degraded | offline | fault
const TONES = {
  verified: { dot: 'var(--blue)', fill: true },
  online: { dot: 'var(--blue)' },
  degraded: { dot: 'var(--text-mid)' },
  offline: { dot: 'var(--text-dim)' },
  fault: { dot: 'var(--text-hi)', bold: true },
}

export default function StatusBadge({ tone = 'online', children, pulse = false, outline = false }) {
  const t = TONES[tone] || TONES.online
  return (
    <span
      className={`badge${t.fill ? ' badge--fill' : ''}${outline ? ' badge--outline' : ''}`}
      data-bold={t.bold || undefined}
    >
      <span className="badge__dot" style={{ background: t.dot }}>
        {pulse && <span className="badge__pulse" style={{ background: t.dot }} />}
      </span>
      <span className="badge__label">{children}</span>
    </span>
  )
}
