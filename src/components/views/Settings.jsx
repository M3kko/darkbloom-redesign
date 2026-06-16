import { useState } from 'react'
import { Globe, Lock, Server, Check, AlertCircle, Loader2 } from 'lucide-react'
import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import Switch from '../ui/Switch.jsx'
import { useToast } from '../ui/Toast.jsx'
import { useVerificationMode } from '../../lib/verification-mode.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'

export default function Settings() {
  const toast = useToast()
  const { technical, setMode } = useVerificationMode()
  const reduced = useReducedMotion()
  const [url, setUrl] = useState('https://api.darkbloom.dev')
  const [health, setHealth] = useState({ state: 'idle' })
  const [encrypt, setEncrypt] = useState(false)
  const [keyState, setKeyState] = useState({ state: 'idle' })

  function testConnection() {
    setHealth({ state: 'checking' })
    setTimeout(() => setHealth({ state: 'ok', providers: 160 }), reduced ? 0 : 900)
  }
  function toggleEncrypt(on) {
    setEncrypt(on)
    if (!on) return setKeyState({ state: 'idle' })
    setKeyState({ state: 'checking' })
    setTimeout(() => setKeyState({ state: 'ok', kid: 'k2f9a1e7' }), reduced ? 0 : 800)
  }

  return (
    <Section index="07" eyebrow="Settings" title="Settings" desc="Coordinator connectivity and optional end-to-end encryption.">
      <div className="settings">
        <Card className="card--pad">
          <div className="set-h"><Globe size={15} /> <span className="card-title">Coordinator URL</span></div>
          <p className="mono dim set-desc">The base URL of the Darkbloom coordinator that routes your inference requests to attested providers.</p>
          <div className="set-row">
            <div className="field" style={{ flex: 1 }}><input className="field__input mono" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
            <Button variant="secondary" size="sm" onClick={testConnection}>
              {health.state === 'checking' ? <Loader2 size={13} className="spin" /> : <Server size={13} />} Test connection
            </Button>
          </div>
          {health.state === 'ok' && (
            <div className="set-status set-status--ok mono"><Check size={13} /> Connected — {health.providers} providers online</div>
          )}
        </Card>

        <Card className="card--pad">
          <div className="set-h"><Lock size={15} /> <span className="card-title">Encrypt requests to coordinator</span></div>
          <p className="mono dim set-desc">
            When enabled, your prompts are sealed to the coordinator's long-lived X25519 public key (NaCl Box) before leaving this browser.
            The coordinator decrypts inside its TEE, picks a provider, and re-seals to the provider's Secure Enclave key. Optional, off by default.
          </p>
          <Switch checked={encrypt} onChange={toggleEncrypt} label="Seal each request to the coordinator's public key" />
          {encrypt && keyState.state === 'checking' && <div className="set-status mono"><Loader2 size={13} className="spin" /> fetching coordinator key…</div>}
          {encrypt && keyState.state === 'ok' && <div className="set-status set-status--ok mono"><Check size={13} /> coordinator key kid={keyState.kid}</div>}
        </Card>

        <Card className="card--pad">
          <div className="set-h"><AlertCircle size={15} /> <span className="card-title">Verification detail</span></div>
          <p className="mono dim set-desc">Choose how much attestation detail the trust UI shows across chat and providers.</p>
          <div className="seg">
            <button className={`seg__item${!technical ? ' is-active' : ''}`} onClick={() => setMode('normal')}>Normal</button>
            <button className={`seg__item${technical ? ' is-active' : ''}`} onClick={() => setMode('technical')}>Technical</button>
          </div>
        </Card>

        <Card className="card--pad set-about">
          <span className="label">About Darkbloom</span>
          <p className="mono dim">
            Darkbloom is a decentralized private inference network. Requests are routed to hardware-attested Apple Silicon providers
            with Secure Enclave verification, SIP enforcement, and Hardened Runtime protection. Provider trust is independently
            verified through MDM cross-checking with the coordinator.
          </p>
        </Card>

        <Button variant="primary" onClick={() => toast.push('Settings saved')}><Check size={14} /> Save settings</Button>
      </div>
    </Section>
  )
}
