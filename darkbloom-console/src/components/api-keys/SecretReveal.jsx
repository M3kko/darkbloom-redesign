import { useState } from 'react'
import { AlertTriangle, Copy, Check } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'

export default function SecretReveal({ open, onClose, secret, name }) {
  const [copied, setCopied] = useState(false)
  const [adopted, setAdopted] = useState(false)
  function copy() {
    navigator.clipboard?.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Save your API key"
      width={500}
      footer={<Button variant="primary" size="sm" onClick={onClose}>Done</Button>}
    >
      <div className="secret__warn">
        <AlertTriangle size={15} />
        <span className="mono">Copy this secret now and store it safely. For your security, you won't be able to view it again.</span>
      </div>
      <div className="formrow" style={{ marginTop: 16 }}>
        <label className="formrow__label">{name || 'API key'}</label>
        <div className="secret__code">
          <code className="mono">{secret}</code>
          <button className="codeblock__copy" onClick={copy}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
      <button className={`secret__adopt mono${adopted ? ' is-on' : ''}`} onClick={() => setAdopted(true)}>
        {adopted ? <Check size={14} /> : null}
        {adopted ? 'Set as this console’s key' : 'Use as this console’s key'}
      </button>
    </Modal>
  )
}
