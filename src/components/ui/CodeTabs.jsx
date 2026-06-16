import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'

// tabs: [{ label, code, filename? }]
export default function CodeTabs({ tabs = [] }) {
  const [active, setActive] = useState(0)
  const tab = tabs[active] || {}
  return (
    <div className="codetabs">
      <div className="codetabs__bar" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === active}
            className={`codetabs__tab${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={tab.code} filename={tab.filename} />
    </div>
  )
}
