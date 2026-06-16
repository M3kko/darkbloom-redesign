import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import { explainerSteps } from '../../data/attestation.js'
import { useVerificationMode } from '../../lib/verification-mode.jsx'

function Step({ n, step, technical }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="tx__step">
      <span className="tx__num serif">{n}</span>
      <div className="tx__main">
        <div className="tx__title mono">{step.title}</div>
        <p className="tx__body mono dim">{step.body}</p>
        {technical && (
          <button className="tx__toggle mono" onClick={() => setOpen((o) => !o)}>
            Technical details <ChevronDown size={12} className={open ? 'rot' : ''} />
          </button>
        )}
        {technical && open && <p className="tx__detail mono">{step.detail}</p>}
      </div>
    </li>
  )
}

export default function TrustExplainerModal({ open, onClose }) {
  const { technical, toggle } = useVerificationMode()
  return (
    <Modal open={open} onClose={onClose} title="How your privacy is protected" width={560}>
      <div className="tx">
        <div className="tx__modebar">
          <span className="mono dim">Encrypted in, verified out — every request.</span>
          <button className={`vmode${technical ? ' is-on' : ''}`} onClick={toggle}>
            <span className="vmode__dot" />
            {technical ? 'Technical' : 'Normal'}
          </button>
        </div>
        <ol className="tx__steps">
          {explainerSteps.map((s, i) => (
            <Step key={s.title} n={i + 1} step={s} technical={technical} />
          ))}
        </ol>
      </div>
    </Modal>
  )
}
