import { createContext, useContext, useEffect, useState } from 'react'

// Mock auth — no real Privy. Persists a fake signed-in user to localStorage so
// gated surfaces (billing, keys, link) behave realistically.
const AuthContext = createContext(null)
const KEY = 'darkbloom-auth'

const MOCK_USER = { email: 'you@eigenlabs.com', name: 'you@eigenlabs.com' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null')
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  }, [user])

  const value = {
    authenticated: !!user,
    user,
    login: () => setUser(MOCK_USER),
    logout: () => setUser(null),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
