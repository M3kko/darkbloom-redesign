import { useState } from 'react'
import { Ticket, X, Check } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'

const KEY = 'darkbloom_invite_dismissed'

export default function InviteCodeBanner() {
  const { authenticated } = useAuth()
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(KEY) === '1')
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [claimed, setClaimed] = useState(null)

  if (!authenticated || dismissed) return null

  function dismiss() {
    localStorage.setItem(KEY, '1')
    setDismissed(true)
  }

  function claim() {
    if (!code.trim()) return
    setClaimed('$5.00')
    setTimeout(dismiss, 2600)
  }

  return (
    <div className="invite">
      <button className="invite__x" onClick={dismiss} aria-label="Dismiss"><X size={13} /></button>
      {claimed ? (
        <div className="invite__done">
          <span className="invite__check"><Check size={14} /></span>
          <span className="mono">{claimed} added to your account</span>
        </div>
      ) : open ? (
        <div className="invite__form">
          <span className="label invite__title">Claim invite code</span>
          <div className="invite__row">
            <input
              className="field__input invite__input mono"
              placeholder="INV-XXXXXXXX"
              value={code}
              maxLength={20}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
            <button className="btn btn--primary btn--sm" onClick={claim}>Claim</button>
          </div>
          <p className="invite__note mono dim">
            Codes give you free inference credits. Not required to become a provider.
          </p>
        </div>
      ) : (
        <button className="invite__open" onClick={() => setOpen(true)}>
          <span className="invite__ticket"><Ticket size={14} /></span>
          <span className="mono">Got an invite code?</span>
        </button>
      )}
    </div>
  )
}
