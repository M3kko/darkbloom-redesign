import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NAV = [
  { to: '/', label: 'Network', end: true },
  { to: '/models', label: 'Models' },
  { to: '/providers', label: 'Providers' },
]

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

export default function Header() {
  const [theme, setTheme] = useState(getTheme)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <header className="hdr">
      <div className="hdr__inner shell">
        <a className="brand" href="/" aria-label="Darkbloom console">
          <span className="brand__mark" aria-hidden>✶</span>
          <span className="brand__word">DARKBLOOM</span>
          <span className="brand__sub mono dim">console</span>
        </a>

        <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr__right">
          <span className="hdr__status mono dim" title="Attestation status">
            <span className="hdr__dot" /> ATTEST OK
          </span>
          <button
            className="iconbtn"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          >
            {theme === 'light' ? '◐' : '◑'}
          </button>
          <button
            className="iconbtn nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
