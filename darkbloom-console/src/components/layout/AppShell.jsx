import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import InviteCodeBanner from '../community/InviteCodeBanner.jsx'

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isChat = pathname === '/'

  return (
    <div className="appshell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="appshell__main">
        <TopBar onMenu={() => setMenuOpen(true)} />
        <main className={`appshell__content${isChat ? ' is-chat' : ''}`} key={pathname}>
          <Outlet />
        </main>
      </div>
      <InviteCodeBanner />
    </div>
  )
}
