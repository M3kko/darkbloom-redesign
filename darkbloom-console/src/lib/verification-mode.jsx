import { createContext, useContext, useEffect, useState } from 'react'

// normal = user-friendly trust language; technical = SE/MDA/hex detail.
const VModeContext = createContext(null)
const KEY = 'darkbloom-vmode'

export function VerificationModeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(KEY) || 'normal')
  useEffect(() => {
    localStorage.setItem(KEY, mode)
  }, [mode])

  const value = {
    mode,
    technical: mode === 'technical',
    setMode,
    toggle: () => setMode((m) => (m === 'normal' ? 'technical' : 'normal')),
  }
  return <VModeContext.Provider value={value}>{children}</VModeContext.Provider>
}

export function useVerificationMode() {
  const ctx = useContext(VModeContext)
  if (!ctx) throw new Error('useVerificationMode must be used within VerificationModeProvider')
  return ctx
}
