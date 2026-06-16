import { useEffect, useRef, useState } from 'react'
import { Plus, Trash2, MessageSquare, Mail } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'
import { useNavigate } from 'react-router-dom'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { cannedReply, chatModels } from '../../data/chat.js'
import { fakeStream } from '../../lib/fakeStream.js'
import ChatMessage from './ChatMessage.jsx'
import ChatInput from './ChatInput.jsx'
import SuggestedPrompts from './SuggestedPrompts.jsx'
import PreSendTrustBanner from '../trust/PreSendTrustBanner.jsx'

let mid = 0
const newId = () => `m${Date.now()}_${++mid}`

const SEED_CHATS = [
  { id: 'c1', title: 'Attestation trust chain', messages: [] },
  { id: 'c2', title: 'OpenAI-compatible client', messages: [] },
]

export default function ChatView() {
  const { authenticated, login } = useAuth()
  const reduced = useReducedMotion()
  const navigate = useNavigate()

  const [chats, setChats] = useState(SEED_CHATS)
  const [activeId, setActiveId] = useState('c1')
  const [input, setInput] = useState('')
  const [model, setModel] = useState(chatModels[0].id)
  const [useMyMachine, setUseMyMachine] = useState(false)
  const [images, setImages] = useState([])
  const [streaming, setStreaming] = useState(false)
  const cancelRef = useRef(null)
  const scrollRef = useRef(null)

  const active = chats.find((c) => c.id === activeId) || chats[0]
  const messages = active?.messages || []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, reduced])

  function patchActive(fn) {
    setChats((cs) => cs.map((c) => (c.id === activeId ? fn(c) : c)))
  }
  function setMessages(updater) {
    patchActive((c) => ({ ...c, messages: typeof updater === 'function' ? updater(c.messages) : updater }))
  }

  function createChat() {
    const id = `c${Date.now()}`
    setChats((cs) => [{ id, title: 'New chat', messages: [] }, ...cs])
    setActiveId(id)
  }
  function deleteChat(id, e) {
    e.stopPropagation()
    setChats((cs) => {
      const next = cs.filter((c) => c.id !== id)
      return next.length ? next : SEED_CHATS
    })
    if (id === activeId) setActiveId((prev) => chats.find((c) => c.id !== id)?.id || 'c1')
  }

  function send(textArg) {
    const text = (textArg ?? input).trim()
    if ((!text && images.length === 0) || streaming) return

    const userMsg = { id: newId(), role: 'user', content: text, images }
    const aId = newId()
    const asstMsg = { id: aId, role: 'assistant', content: '', thinking: '', trust: 'hardware', streaming: true, metrics: { tps: 0, ttft: null, tokens: 0 } }

    patchActive((c) => ({
      ...c,
      title: c.messages.length === 0 && text ? text.slice(0, 38) : c.title,
      messages: [...c.messages, userMsg, asstMsg],
    }))
    setInput('')
    setImages([])
    setStreaming(true)

    const start = performance.now()
    const update = (patch) =>
      setMessages((ms) => ms.map((m) => (m.id === aId ? { ...m, ...patch } : m)))

    cancelRef.current = fakeStream(
      cannedReply,
      {
        onThinking: (t) => update({ thinking: t }),
        onFirstToken: (ttft) => update({ metrics: { tps: 0, ttft: ttft || 280, tokens: 0 } }),
        onToken: (content) => {
          const elapsed = (performance.now() - start) / 1000
          const tokens = Math.round(content.length / 4)
          update({ content, metrics: { tps: tokens / Math.max(elapsed, 0.1), ttft: 280, tokens } })
        },
        onDone: () => {
          setStreaming(false)
          setMessages((ms) =>
            ms.map((m) => (m.id === aId ? { ...m, streaming: false } : m)),
          )
        },
      },
      { reduced },
    )
  }

  function stop() {
    cancelRef.current?.()
    setStreaming(false)
  }

  const empty = messages.length === 0

  return (
    <div className="chat">
      <aside className="chat__rail">
        <button className="chat__new" onClick={createChat}>
          <Plus size={14} /> New chat
        </button>
        <div className="chat__history">
          {chats.map((c) => (
            <button
              key={c.id}
              className={`chat__hitem${c.id === activeId ? ' is-active' : ''}`}
              onClick={() => setActiveId(c.id)}
            >
              <MessageSquare size={13} className="chat__hicon" />
              <span className="chat__htitle mono">{c.title}</span>
              <span className="chat__hdel" onClick={(e) => deleteChat(c.id, e)} aria-label="Delete chat">
                <Trash2 size={12} />
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="chat__main">
        <div className="chat__stream" ref={scrollRef}>
          {empty ? (
            <div className="chat__empty">
              <div className="chat__hero">
                <span className="brand__mark chat__heromark" aria-hidden>✶</span>
                <h2 className="display chat__herotitle">Darkbloom</h2>
                <p className="mono dim chat__herosub">
                  Private inference on verified hardware. Your prompts stay encrypted, your data stays yours.
                </p>
              </div>
              {authenticated ? (
                <SuggestedPrompts onPick={(p) => send(p)} />
              ) : (
                <button className="btn btn--primary chat__signin" onClick={login}>
                  <Mail size={14} /> Sign in to start
                </button>
              )}
              <p className="mono dim chat__herofoot">End-to-end encrypted · Apple Silicon · Decentralized</p>
            </div>
          ) : (
            <div className="chat__messages">
              {messages.map((m) => (
                <ChatMessage key={m.id} msg={m} />
              ))}
            </div>
          )}
        </div>

        <div className="chat__inputwrap">
          {authenticated && empty && <PreSendTrustBanner />}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => send()}
            onStop={stop}
            streaming={streaming}
            model={model}
            setModel={setModel}
            useMyMachine={useMyMachine}
            setUseMyMachine={setUseMyMachine}
            images={images}
            setImages={setImages}
          />
        </div>
      </div>
    </div>
  )
}
