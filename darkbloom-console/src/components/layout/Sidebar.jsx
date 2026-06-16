import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Sun, Moon, LogOut, X } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'
import CommunityLinks from '../community/CommunityLinks.jsx'

const PRIMARY = [
  { to: '/', label: 'Chat', end: true },
  { to: '/stats', label: 'Stats' },
  { to: '/providers', label: 'Providers' },
  { to: '/earn', label: 'Earn' },
  { to: '/api', label: 'API' },
]
const SECONDARY = [
  { to: '/models', label: 'Models' },
  { to: '/billing', label: 'Billing' },
  { to: '/settings', label: 'Settings' },
]

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

function NavItem({ to, label, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) => `snav__link${isActive ? ' is-active' : ''}`}
    >
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }) {
  const { authenticated, user, login, logout } = useAuth()
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <div className={`sidebar-scrim${open ? ' is-open' : ''}`} onClick={onClose} />
      <aside className={`sidebar${open ? ' is-open' : ''}`}>
        <div className="sidebar__head">
          <a className="brand" href="/" aria-label="Darkbloom">
            <span className="brand__mark" aria-hidden>✶</span>
            <span className="brand__col">
              <span className="brand__word">DARKBLOOM</span>
              <span className="brand__sub mono dim">Eigen Labs · Public Alpha</span>
            </span>
          </a>
          <button className="iconbtn sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className="snav" aria-label="Primary">
          {PRIMARY.map((n) => (
            <NavItem key={n.to} {...n} onNavigate={onClose} />
          ))}
          <div className="snav__rule" />
          {SECONDARY.map((n) => (
            <NavItem key={n.to} {...n} onNavigate={onClose} />
          ))}
        </nav>

        <div className="sidebar__foot">
          <div className="account">
            {authenticated ? (
              <>
                <span className="account__name mono" title={user.email}>{user.email}</span>
                <button className="iconbtn" onClick={logout} aria-label="Log out" title="Log out">
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <button className="account__signin mono" onClick={login}>Sign in</button>
            )}
            <button
              className="iconbtn"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
          <CommunityLinks />
          <p className="sidebar__alpha mono dim">
            Public alpha. Provided as-is for evaluation. Not for production use.
          </p>
        </div>
      </aside>
    </>
  )
}
