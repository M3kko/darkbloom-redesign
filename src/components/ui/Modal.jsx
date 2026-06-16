import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, width = 460 }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal__panel"
        style={{ maxWidth: width }}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className="modal__head">
            <h3 className="modal__title card-title">{title}</h3>
            <button className="iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
