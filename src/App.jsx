import { Outlet } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import { AuthProvider } from './lib/auth.jsx'
import { VerificationModeProvider } from './lib/verification-mode.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'

// Providers wrap everything; child routes choose shell vs full-screen layout.
export default function App() {
  return (
    <AuthProvider>
      <VerificationModeProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </VerificationModeProvider>
    </AuthProvider>
  )
}

// Layout route that renders the chrome (sidebar + topbar) around content pages.
export function ShellLayout() {
  return <AppShell />
}

// Full-screen layout (login, device link) — no sidebar/topbar.
export function BareLayout() {
  return (
    <div className="bare">
      <Outlet />
    </div>
  )
}
