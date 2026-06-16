import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import TrustExplainerModal from './TrustExplainerModal.jsx'

export default function PreSendTrustBanner() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="psb">
        <ShieldCheck size={15} className="psb__icon" />
        <div className="psb__text">
          <span className="mono psb__main">
            End-to-end encrypted — processed on Apple-verified hardware
          </span>
          <span className="mono dim psb__sub tnum">160 providers online · last verified 2m ago</span>
        </div>
        <button className="psb__how mono" onClick={() => setOpen(true)}>How it works</button>
      </div>
      <TrustExplainerModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
