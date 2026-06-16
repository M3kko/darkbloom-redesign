import { useState } from 'react'
import { Check } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import { windows } from '../../data/keys.js'
import { chatModels } from '../../data/chat.js'

export default function KeyForm({ open, onClose, onSubmit, editing }) {
  const [form, setForm] = useState(() => ({
    name: editing?.name || '',
    spendCap: editing?.spendCap ?? '',
    window: editing?.window || 'monthly',
    rpm: editing?.rpm ?? '',
    itpm: editing?.itpm ?? '',
    otpm: editing?.otpm ?? '',
    expires: editing?.expires || '',
    models: editing?.models || [],
    selfRoute: editing?.selfRoute || false,
  }))
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggleModel = (id) =>
    set('models', form.models.includes(id) ? form.models.filter((m) => m !== id) : [...form.models, id])

  function submit() {
    if (!form.name.trim()) return
    onSubmit({
      name: form.name.trim(),
      spendCap: form.spendCap === '' ? null : Number(form.spendCap),
      window: form.window,
      rpm: form.rpm === '' ? null : Number(form.rpm),
      itpm: form.itpm === '' ? null : Number(form.itpm),
      otpm: form.otpm === '' ? null : Number(form.otpm),
      expires: form.expires || null,
      models: form.models,
      selfRoute: form.selfRoute,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Edit API key' : 'Create API key'}
      width={520}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={submit}>{editing ? 'Save changes' : 'Create key'}</Button>
        </>
      }
    >
      <div className="formrow">
        <label className="formrow__label">Name</label>
        <div className="field"><input className="field__input" placeholder="e.g. Production server" value={form.name} maxLength={80} onChange={(e) => set('name', e.target.value)} /></div>
      </div>

      <div className="formgrid">
        <div className="formrow">
          <label className="formrow__label">Spend cap (USD)</label>
          <div className="field"><input className="field__input mono" type="number" step="0.01" placeholder="Unlimited" value={form.spendCap} onChange={(e) => set('spendCap', e.target.value)} /></div>
        </div>
        <div className="formrow">
          <label className="formrow__label">Reset window</label>
          <div className="field field--select">
            <select className="field__input" value={form.window} onChange={(e) => set('window', e.target.value)}>
              {windows.map((w) => <option key={w} value={w}>{w === 'none' ? 'Lifetime' : w}</option>)}
            </select>
            <span className="field__caret">▾</span>
          </div>
        </div>
      </div>

      <div className="formgrid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {['rpm', 'itpm', 'otpm'].map((f) => (
          <div className="formrow" key={f}>
            <label className="formrow__label">{f}</label>
            <div className="field"><input className="field__input mono" type="number" placeholder="—" value={form[f]} onChange={(e) => set(f, e.target.value)} /></div>
          </div>
        ))}
      </div>
      <p className="formrow__help" style={{ marginTop: -8, marginBottom: 16 }}>Optional per-minute overrides: requests (RPM), input tokens (ITPM), output tokens (OTPM).</p>

      <div className="formrow">
        <label className="formrow__label">Expires</label>
        <div className="field"><input className="field__input mono" type="date" value={form.expires} onChange={(e) => set('expires', e.target.value)} /></div>
      </div>

      <div className="formrow">
        <label className="formrow__label">Allowed models</label>
        <div className="keyform__models">
          {chatModels.map((m) => (
            <label key={m.id} className="keyform__model mono">
              <input type="checkbox" checked={form.models.includes(m.id)} onChange={() => toggleModel(m.id)} />
              {m.id}
            </label>
          ))}
        </div>
        <p className="formrow__help">{form.models.length ? `${form.models.length} model(s) selected.` : 'Leave empty to allow all models.'}</p>
      </div>

      <button className={`keyform__selfroute${form.selfRoute ? ' is-on' : ''}`} onClick={() => set('selfRoute', !form.selfRoute)}>
        {form.selfRoute && <Check size={14} />}
        <div>
          <strong>My Machine only — free</strong>
          <span className="mono dim"> Every request routes only to a node you run. Never spends balance or reaches the public fleet.</span>
        </div>
      </button>
    </Modal>
  )
}
