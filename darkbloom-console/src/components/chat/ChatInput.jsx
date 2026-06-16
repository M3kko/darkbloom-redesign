import { useRef, useState, useEffect } from 'react'
import { Send, Square, Cpu, ImagePlus, ChevronDown, X } from 'lucide-react'
import { chatModels } from '../../data/chat.js'

export default function ChatInput({
  value,
  onChange,
  onSend,
  onStop,
  streaming,
  model,
  setModel,
  useMyMachine,
  setUseMyMachine,
  images,
  setImages,
}) {
  const taRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const current = chatModels.find((m) => m.id === model) || chatModels[0]

  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(200, ta.scrollHeight) + 'px'
  }, [value])

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }
  function submit() {
    if (streaming) return
    if (!value.trim() && images.length === 0) return
    onSend()
  }
  function attach(e) {
    const files = Array.from(e.target.files || []).slice(0, 4 - images.length)
    const urls = files.map((f) => URL.createObjectURL(f))
    setImages([...images, ...urls])
    e.target.value = ''
  }

  return (
    <div className="cinput">
      {images.length > 0 && (
        <div className="cinput__images">
          {images.map((src, i) => (
            <div className="cinput__thumb" key={i}>
              <img src={src} alt="" />
              <button onClick={() => setImages(images.filter((_, j) => j !== i))} aria-label="Remove image">
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={taRef}
        className="cinput__ta mono"
        placeholder="Send a message…"
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="cinput__controls">
        <div className="cinput__left">
          <div className="modelsel">
            <button className="modelsel__btn mono" onClick={() => setMenuOpen((o) => !o)}>
              <span className="modelsel__dot" />
              <span className="modelsel__name">{current.name}</span>
              <ChevronDown size={13} />
            </button>
            {menuOpen && (
              <>
                <div className="modelsel__scrim" onClick={() => setMenuOpen(false)} />
                <div className="modelsel__menu">
                  {chatModels.map((m) => (
                    <button
                      key={m.id}
                      className={`modelsel__item mono${m.id === model ? ' is-active' : ''}`}
                      onClick={() => {
                        setModel(m.id)
                        setMenuOpen(false)
                      }}
                    >
                      <span>{m.name}</span>
                      <span className="modelsel__quant mono dim">{m.quant}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            className={`mymachine${useMyMachine ? ' is-on' : ''}`}
            onClick={() => setUseMyMachine((v) => !v)}
            title="Prefer your own machine (free when it serves). Falls back to the paid network."
          >
            <Cpu size={13} />
            <span className="mymachine__label">My Machine</span>
            {useMyMachine && <span className="mymachine__sub mono dim">· free</span>}
          </button>

          {current.vision && (
            <label className="cinput__attach" title="Attach image">
              <ImagePlus size={15} />
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple hidden onChange={attach} disabled={streaming || images.length >= 4} />
            </label>
          )}
        </div>

        {streaming ? (
          <button className="cinput__send cinput__send--stop" onClick={onStop} aria-label="Stop">
            <Square size={14} />
          </button>
        ) : (
          <button
            className="cinput__send"
            onClick={submit}
            disabled={!value.trim() && images.length === 0}
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        )}
      </div>
    </div>
  )
}
