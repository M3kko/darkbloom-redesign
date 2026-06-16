import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ShieldCheck } from 'lucide-react'
import Avatar from '../ui/Avatar.jsx'
import CodeBlock from '../ui/CodeBlock.jsx'
import TrustBadge from '../trust/TrustBadge.jsx'
import VerificationPanel from '../trust/VerificationPanel.jsx'
import TrustExplainerModal from '../trust/TrustExplainerModal.jsx'
import ThinkingBlock from './ThinkingBlock.jsx'
import StreamMetricsBar from './StreamMetricsBar.jsx'

const MD = {
  code({ inline, className, children }) {
    const text = String(children).replace(/\n$/, '')
    if (inline) return <code className="md-inline">{children}</code>
    const lang = /language-(\w+)/.exec(className || '')?.[1]
    return <CodeBlock code={text} lang={lang} dots />
  },
}

function UserMessage({ msg }) {
  return (
    <div className="msg msg--user">
      <div className="msg__bubble">
        {msg.images?.length > 0 && (
          <div className="msg__images">
            {msg.images.map((src, i) => (
              <img key={i} src={src} alt="" className="msg__img" />
            ))}
          </div>
        )}
        <div className="msg__text mono">{msg.content}</div>
      </div>
    </div>
  )
}

function AssistantMessage({ msg }) {
  const [showVerify, setShowVerify] = useState(false)
  const [explain, setExplain] = useState(false)
  return (
    <div className="msg msg--assistant">
      <Avatar icon={<ShieldCheck size={15} />} size={30} />
      <div className="msg__main">
        <div className="msg__head">
          <span className="msg__name mono">Darkbloom</span>
          <button className="msg__trust" onClick={() => setShowVerify((v) => !v)}>
            <TrustBadge trust={msg.trust || 'hardware'} />
          </button>
        </div>

        {showVerify && <VerificationPanel onExplain={() => setExplain(true)} />}

        <ThinkingBlock text={msg.thinking} streaming={msg.streaming && !msg.content} />

        {msg.content && (
          <div className="msg__md prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>
              {msg.content}
            </ReactMarkdown>
            {msg.streaming && <span className="streaming-cursor" aria-hidden />}
          </div>
        )}

        {(msg.streaming || msg.metrics) && (
          <StreamMetricsBar
            tps={msg.metrics?.tps}
            ttft={msg.metrics?.ttft}
            tokens={msg.metrics?.tokens}
            streaming={msg.streaming}
          />
        )}
      </div>
      <TrustExplainerModal open={explain} onClose={() => setExplain(false)} />
    </div>
  )
}

export default function ChatMessage({ msg }) {
  return msg.role === 'user' ? <UserMessage msg={msg} /> : <AssistantMessage msg={msg} />
}
