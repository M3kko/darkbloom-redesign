import { useState } from 'react'
import { Plus, Info, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'
import { useToast } from '../ui/Toast.jsx'
import { seedKeys } from '../../data/keys.js'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import KeyCard from './KeyCard.jsx'
import KeyForm from './KeyForm.jsx'
import SecretReveal from './SecretReveal.jsx'

let seq = 100
const fakeSecret = () => `db_sk_${Math.abs(Math.sin(++seq) * 1e16).toString(36).slice(0, 28)}`

export default function ApiKeysManager() {
  const { authenticated, login } = useAuth()
  const toast = useToast()
  const [keys, setKeys] = useState(seedKeys)
  const [form, setForm] = useState(null) // { editing } | { create:true }
  const [secret, setSecret] = useState(null)
  const [confirm, setConfirm] = useState(null) // { type, key }

  if (!authenticated) {
    return (
      <div className="keys__signin">
        <p className="mono dim">Sign in to create and manage your API keys.</p>
        <Button variant="primary" size="sm" onClick={login}>Sign in</Button>
      </div>
    )
  }

  function create(data) {
    const k = {
      id: `k${++seq}`,
      status: 'active',
      isConsoleKey: false,
      used: 0,
      label: data.selfRoute ? 'self-route only' : '',
      lastUsed: 'never',
      created: 'just now',
      ...data,
    }
    setKeys((ks) => [k, ...ks])
    setForm(null)
    setSecret({ secret: fakeSecret(), name: k.name })
  }
  function save(data) {
    setKeys((ks) => ks.map((k) => (k.id === form.editing.id ? { ...k, ...data } : k)))
    setForm(null)
    toast.push('Key updated')
  }
  function doConfirm() {
    const { type, key } = confirm
    if (type === 'revoke') {
      setKeys((ks) => ks.filter((k) => k.id !== key.id))
      toast.push(`Revoked "${key.name}"`, { tone: 'error' })
    } else {
      setKeys((ks) => ks.map((k) => (k.id === key.id ? { ...k, lastUsed: 'just now' } : k)))
      setConfirm(null)
      setSecret({ secret: fakeSecret(), name: key.name })
      return
    }
    setConfirm(null)
  }
  const toggle = (key) =>
    setKeys((ks) => ks.map((k) => (k.id === key.id ? { ...k, status: k.status === 'active' ? 'disabled' : 'active' } : k)))

  return (
    <div className="keys">
      <div className="keys__head">
        <h3 className="card-title">API keys</h3>
        <Button variant="primary" size="sm" onClick={() => setForm({ create: true })}><Plus size={14} /> New key</Button>
      </div>

      <div className="keys__info">
        <div className="keys__inforow mono dim"><Info size={14} /> All keys draw from your shared account balance. A key's spend cap is a sub-limit on that balance, not extra funds.</div>
        <div className="keys__inforow mono dim"><ShieldCheck size={14} /> This console uses one active key (saved in this browser) for its own chat and test calls.</div>
      </div>

      {keys.length === 0 ? (
        <div className="keys__empty mono dim">No API keys yet. Create a named key to start using the Darkbloom API.</div>
      ) : (
        <div className="keys__list">
          {keys.map((k) => (
            <KeyCard
              key={k.id}
              k={k}
              onEdit={(key) => setForm({ editing: key })}
              onRotate={(key) => setConfirm({ type: 'rotate', key })}
              onRevoke={(key) => setConfirm({ type: 'revoke', key })}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      {form && (
        <KeyForm
          open
          editing={form.editing}
          onClose={() => setForm(null)}
          onSubmit={form.editing ? save : create}
        />
      )}
      {secret && <SecretReveal open secret={secret.secret} name={secret.name} onClose={() => setSecret(null)} />}
      {confirm && (
        <Modal
          open
          onClose={() => setConfirm(null)}
          title={confirm.type === 'revoke' ? 'Revoke API key' : 'Rotate API key'}
          width={420}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setConfirm(null)}>Cancel</Button>
              <Button variant={confirm.type === 'revoke' ? 'destructive' : 'primary'} size="sm" onClick={doConfirm}>
                {confirm.type === 'revoke' ? 'Revoke key' : 'Rotate key'}
              </Button>
            </>
          }
        >
          <p className="mono dim" style={{ fontSize: 13, lineHeight: 1.6 }}>
            {confirm.type === 'revoke'
              ? `Revoke "${confirm.key.name}"? Any application using it will stop working immediately. This cannot be undone.`
              : `Rotate "${confirm.key.name}"? The current secret is revoked immediately and a new one is issued.`}
          </p>
        </Modal>
      )}
    </div>
  )
}
