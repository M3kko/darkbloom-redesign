import { useState } from 'react'
import { Brain, ChevronDown } from 'lucide-react'

export default function ThinkingBlock({ text, streaming }) {
  const [open, setOpen] = useState(false)
  if (!text) return null
  return (
    <div className={`think${open ? ' is-open' : ''}`}>
      <button className="think__head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Brain size={13} className="think__icon" />
        <span className="think__label mono">{streaming ? 'Thinking…' : 'Thinking'}</span>
        {!open && <span className="think__count mono dim tnum">{text.length} chars</span>}
        <ChevronDown size={13} className="think__chev" />
      </button>
      {open && (
        <p className="think__body mono dim">
          {text}
          {streaming && <span className="streaming-cursor" aria-hidden />}
        </p>
      )}
    </div>
  )
}
