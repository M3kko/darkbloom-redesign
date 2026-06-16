import { useEffect } from 'react'
import { Mail } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../lib/auth.jsx'

export default function Login() {
  const { authenticated, login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/'

  useEffect(() => {
    if (authenticated) navigate(next, { replace: true })
  }, [authenticated, navigate, next])

  return (
    <div className="login">
      <span className="brand__mark login__mark" aria-hidden>✶</span>
      <h1 className="display login__title">Darkbloom</h1>
      <p className="mono dim login__tag">
        Private inference on verified hardware. Your prompts stay encrypted, your data stays yours.
      </p>
      <button className="btn btn--primary login__btn" onClick={login}><Mail size={14} /> Sign in</button>
      <p className="mono dim login__sub">Sign in with email, wallet, or social account</p>
      <p className="mono dim login__foot">End-to-end encrypted · Apple Silicon · Decentralized</p>
      <p className="mono dim login__alpha">An Eigen Labs project, currently in public alpha. Provided as-is for evaluation.</p>
    </div>
  )
}
