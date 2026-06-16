import { createContext, useContext, useState, useCallback } from 'react'
import { Check, X, Info } from 'lucide-react'

const ToastContext = createContext(null)
let idSeq = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const push = useCallback(
    (message, { tone = 'success', ttl = 3200 } = {}) => {
      const id = ++idSeq
      setToasts((t) => [...t, { id, message, tone }])
      if (ttl) setTimeout(() => dismiss(id), ttl)
      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="toasts" role="region" aria-label="Notifications">
        {toasts.map((t) => {
          const Icon = t.tone === 'error' ? X : t.tone === 'info' ? Info : Check
          return (
            <div key={t.id} className={`toast toast--${t.tone}`} role="status">
              <span className="toast__icon" aria-hidden><Icon size={14} /></span>
              <span className="toast__msg mono">{t.message}</span>
              <button className="toast__close" onClick={() => dismiss(t.id)} aria-label="Dismiss">
                <X size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
