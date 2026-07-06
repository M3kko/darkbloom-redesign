import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import E2ELockIndicator from '../trust/E2ELockIndicator.jsx'

// Short, machine-register leaf for the location string. The page hero owns the
// serif title — the bar speaks mono, so the two don't compete.
const SECTIONS = {
  '/': 'Chat',
  '/stats': 'Network',
  '/providers': 'Providers',
  '/earn': 'Earn',
  '/api': 'API',
  '/models': 'Models',
  '/billing': 'Billing',
  '/settings': 'Settings',
}

// Auto-hide on scroll: the bar slides away as you read down a long page and
// returns the moment you scroll back up. Disabled under reduced motion (the bar
// just stays put) and on chat, which manages its own scroll.
function useScrollChrome(pathname, enabled) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    setHidden(false)
    lastY.current = window.scrollY
    if (!enabled) {
      setScrolled(false)
      return
    }
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        setScrolled(y > 4)
        if (y < 72) setHidden(false)
        else if (delta > 6) setHidden(true)
        else if (delta < -6) setHidden(false)
        lastY.current = y
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, enabled])

  return { hidden, scrolled }
}

export default function TopBar({ onMenu }) {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const isChat = pathname === '/'
  const leaf = SECTIONS[pathname] || 'Console'
  const { hidden, scrolled } = useScrollChrome(pathname, !reduced && !isChat)

  return (
    <header
      className={`topbar${hidden ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}
    >
      <button className="iconbtn topbar__menu" onClick={onMenu} aria-label="Open menu">
        <Menu size={16} />
      </button>

      <nav className="topbar__crumb mono" aria-label="Breadcrumb">
        <span className="topbar__crumb-root">console</span>
        <span className="topbar__crumb-sep" aria-hidden>/</span>
        <span className="topbar__crumb-leaf" aria-current="page">{leaf}</span>
      </nav>

      <div className="topbar__right">
        {/* The E2E lock is the one status worth surfacing — it lives only on
            chat, where end-to-end encryption is actually on screen. */}
        {isChat && <E2ELockIndicator />}
      </div>
    </header>
  )
}
