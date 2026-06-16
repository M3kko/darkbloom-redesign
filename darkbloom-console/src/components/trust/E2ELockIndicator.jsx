import { useState } from 'react'
import { Lock } from 'lucide-react'
import { useVerificationMode } from '../../lib/verification-mode.jsx'
import { receipt } from '../../data/attestation.js'
import TrustExplainerModal from './TrustExplainerModal.jsx'

export default function E2ELockIndicator() {
  const { technical } = useVerificationMode()
  const [open, setOpen] = useState(false)
  const [explain, setExplain] = useState(false)
  const serial = technical ? receipt.serialFull : receipt.serial

  return (
    <div className="e2e">
      <button className="e2e__btn" onClick={() => setOpen((o) => !o)}>
        <Lock size={13} />
        <span className="e2e__label">End-to-end encrypted</span>
      </button>
      {open && (
        <>
          <div className="e2e__scrim" onClick={() => setOpen(false)} />
          <div className="e2e__pop">
            <div className="e2e__pophead">
              <Lock size={14} className="blue" />
              <span className="mono hi">End-to-End Encrypted</span>
            </div>
            <p className="e2e__text mono dim">
              Messages are sealed so only the verified provider hardware can decrypt your prompts.
            </p>
            <div className="e2e__chip mono">
              <span className="dim">provider</span> {receipt.chip} · {serial}
            </div>
            <button
              className="e2e__learn mono"
              onClick={() => {
                setOpen(false)
                setExplain(true)
              }}
            >
              Learn how your privacy is protected ↗
            </button>
          </div>
        </>
      )}
      <TrustExplainerModal open={explain} onClose={() => setExplain(false)} />
    </div>
  )
}
