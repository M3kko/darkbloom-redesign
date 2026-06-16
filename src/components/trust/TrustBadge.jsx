import { ShieldCheck, Shield } from 'lucide-react'
import { useVerificationMode } from '../../lib/verification-mode.jsx'

// trust: 'hardware' | 'basic' | 'none'
const LABELS = {
  hardware: { normal: 'Apple-verified hardware', tech: 'Hardware Attested · SE · MDA' },
  basic: { normal: 'Basic trust', tech: 'Basic · no MDA' },
  none: { normal: 'Unverified', tech: 'Unverified' },
}

export default function TrustBadge({ trust = 'hardware', compact = false }) {
  const { technical } = useVerificationMode()
  const verified = trust === 'hardware'
  const Icon = verified ? ShieldCheck : Shield
  const label = (LABELS[trust] || LABELS.none)[technical ? 'tech' : 'normal']

  return (
    <span className={`trustbadge trustbadge--${trust}`} title={label}>
      <Icon size={13} className="trustbadge__icon" />
      {!compact && <span className="trustbadge__label">{label}</span>}
    </span>
  )
}
