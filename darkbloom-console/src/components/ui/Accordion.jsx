import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function AccordionItem({ header, meta, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`acc__item${open ? ' is-open' : ''}`}>
      <button className="acc__head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="acc__header-main">{header}</span>
        {meta && <span className="acc__meta">{meta}</span>}
        <ChevronDown size={15} className="acc__chev" />
      </button>
      {open && <div className="acc__body">{children}</div>}
    </div>
  )
}

export default function Accordion({ children }) {
  return <div className="acc">{children}</div>
}
