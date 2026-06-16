// Simulated token streaming. Emits a thinking trace then the answer,
// chunk by chunk, driving live TPS / TTFT counters. Returns a cancel fn.
export function fakeStream({ thinking, answer }, handlers, { reduced = false } = {}) {
  const { onThinking, onToken, onFirstToken, onDone } = handlers
  const thinkChunks = chunk(thinking, 4)
  const answerChunks = chunk(answer, 3)
  let cancelled = false
  let timers = []

  if (reduced) {
    onThinking(thinking)
    onFirstToken?.()
    onToken(answer)
    onDone()
    return () => {}
  }

  const start = performance.now()
  let i = 0
  const step = () => {
    if (cancelled) return
    if (i < thinkChunks.length) {
      onThinking(thinkChunks.slice(0, i + 1).join(''))
      i += 1
      timers.push(setTimeout(step, 16))
      return
    }
    // switch to answer
    const ai = i - thinkChunks.length
    if (ai === 0) onFirstToken?.(performance.now() - start)
    if (ai < answerChunks.length) {
      onToken(answerChunks.slice(0, ai + 1).join(''))
      i += 1
      timers.push(setTimeout(step, 18 + (ai % 5) * 4))
      return
    }
    onDone(performance.now() - start)
  }
  timers.push(setTimeout(step, 280)) // initial TTFT delay

  return () => {
    cancelled = true
    timers.forEach(clearTimeout)
    onDone()
  }
}

function chunk(text, size) {
  const words = text.split(/(\s+)/)
  const out = []
  let buf = ''
  let n = 0
  for (const w of words) {
    buf += w
    if (w.trim()) n += 1
    if (n >= size) {
      out.push(buf)
      buf = ''
      n = 0
    }
  }
  if (buf) out.push(buf)
  return out
}
