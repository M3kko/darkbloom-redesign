import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CodeBlock({ code, filename, lang, dots = false, className = '' }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className={`codeblock ${className}`}>
      <div className="codeblock__head">
        {dots && (
          <span className="codeblock__dots" aria-hidden>
            <i /><i /><i />
          </span>
        )}
        {(filename || lang) && (
          <span className="codeblock__name mono dim">{filename || lang}</span>
        )}
        <button className="codeblock__copy" onClick={copy} aria-label="Copy code">
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="codeblock__body"><code>{code}</code></pre>
    </div>
  )
}
