import { useState, useRef, useEffect } from 'react'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { useVerificationMode } from '../../lib/verification-mode.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { guarantees, receipt, verifySteps } from '../../data/attestation.js'
import Button from '../ui/Button.jsx'

function ReceiptRow({ k, v, mono = true }) {
  return (
    <div className="vp__row">
      <span className="label vp__k">{k}</span>
      <span className={`vp__v${mono ? ' mono' : ''}`}>{v}</span>
    </div>
  )
}

export default function VerificationPanel({ onExplain }) {
  const { technical } = useVerificationMode()
  const reduced = useReducedMotion()
  const [step, setStep] = useState(-1)
  const [done, setDone] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  function verify() {
    setDone(false)
    setStep(0)
    if (reduced) {
      setStep(verifySteps.length - 1)
      setDone(true)
      return
    }
    clearInterval(timer.current)
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      if (i >= verifySteps.length) {
        clearInterval(timer.current)
        setStep(verifySteps.length - 1)
        setDone(true)
      } else {
        setStep(i)
      }
    }, 520)
  }

  const verifying = step >= 0 && !done

  return (
    <div className="vp">
      {!technical ? (
        <div className="vp__guarantees">
          {guarantees.map((g) => (
            <div className="vp__guarantee" key={g.key}>
              <span className="vp__glyph" aria-hidden>{g.glyph}</span>
              <div>
                <div className="vp__gtitle mono">{g.title}</div>
                <p className="vp__gbody mono dim">{g.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vp__tech">
          <div className="vp__group">
            <span className="eyebrow">Secure Enclave</span>
            <ReceiptRow k="Identity" v="P-256 · sealed in SE" />
            <ReceiptRow k="ECDSA signature" v="valid ✓" />
            <ReceiptRow k="SE public key" v={receipt.sePublicKey} />
          </div>
          <div className="vp__group">
            <span className="eyebrow">OS security · MDM verified</span>
            <ReceiptRow k="SIP" v={receipt.sip ? 'enabled' : 'off'} />
            <ReceiptRow k="Secure Boot" v={receipt.secureBoot ? 'enabled' : 'off'} />
            <ReceiptRow k="Authenticated root" v={receipt.authRoot ? 'enabled' : 'off'} />
          </div>
          <div className="vp__group">
            <span className="eyebrow">Runtime protection</span>
            <ReceiptRow k="PT_DENY_ATTACH" v="active" />
            <ReceiptRow k="Hardened Runtime" v="active" />
          </div>
          <div className="vp__group">
            <span className="eyebrow">Attestation receipt</span>
            <ReceiptRow k="Response hash" v={receipt.responseHash} />
            <ReceiptRow k="SE signature" v={receipt.seSignature} />
            <ReceiptRow k="macOS / SepOS" v={`${receipt.macos} / ${receipt.sepos}`} />
            <ReceiptRow k="Certificates" v={`${receipt.certCount} · chain to Apple Root CA`} />
          </div>
        </div>
      )}

      <div className="vp__actions">
        <Button variant={done ? 'secondary' : 'primary'} size="sm" onClick={verify} disabled={verifying}>
          {verifying ? <Loader2 size={13} className="spin" /> : <ShieldCheck size={13} />}
          {done ? 'Verified' : verifying ? 'Verifying' : 'Verify device'}
        </Button>
        {onExplain && (
          <button className="vp__learn mono" onClick={onExplain}>
            Learn how the trust chain works ↗
          </button>
        )}
      </div>

      {step >= 0 && (
        <ol className="vp__steps mono">
          {verifySteps.slice(0, step + 1).map((s, i) => (
            <li key={i} className={i === step && done ? 'is-final' : 'is-done'}>
              <span className="vp__steptick">{i === step && done ? '✶' : '✓'}</span> {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
