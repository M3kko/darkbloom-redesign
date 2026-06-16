import { useState } from 'react'
import { Check } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'

function format(raw) {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8)
  return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4)}` : clean
}

export default function Link() {
  const { authenticated, user, login } = useAuth()
  const [code, setCode] = useState('')
  const [linking, setLinking] = useState(false)
  const [done, setDone] = useState(false)
  const ready = code.replace('-', '').length === 8

  function submit() {
    if (!ready) return
    setLinking(true)
    setTimeout(() => {
      setLinking(false)
      setDone(true)
    }, 900)
  }

  return (
    <div className="link">
      <span className="brand__mark link__mark" aria-hidden>✶</span>
      {done ? (
        <>
          <span className="link__check"><Check size={22} /></span>
          <h1 className="section-title link__title">Device linked</h1>
          <p className="mono dim link__msg">Your provider is now connected to your account. Earnings will be credited automatically.</p>
          <p className="mono dim link__close">You can close this page.</p>
        </>
      ) : (
        <>
          <h1 className="section-title link__title">Link your device</h1>
          <p className="mono dim link__msg">Connect your Mac to your Darkbloom account to receive earnings for providing compute.</p>
          {!authenticated ? (
            <>
              <p className="mono dim">Sign in to link your device.</p>
              <button className="btn btn--primary link__btn" onClick={login}>Sign in</button>
            </>
          ) : (
            <>
              <span className="mono dim link__signed">Signed in as {user.email}</span>
              <label className="label link__label">Enter the code shown in your terminal</label>
              <input
                className="link__input mono"
                placeholder="XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(format(e.target.value))}
                autoFocus
              />
              <button className="btn btn--primary link__btn" disabled={!ready || linking} onClick={submit}>
                {linking ? 'Linking…' : 'Link device'}
              </button>
              <p className="mono dim link__hint">Run <code>darkbloom login</code> on your Mac to get a code.</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
