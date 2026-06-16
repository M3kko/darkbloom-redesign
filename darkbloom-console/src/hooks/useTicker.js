import { useEffect, useRef, useState } from 'react'
import useReducedMotion from './useReducedMotion.js'

// Deterministic-ish wobble without Math.random in render: a seeded sine walk.
function wobble(seed, t) {
  return (
    Math.sin(t * 0.0013 + seed) * 0.6 +
    Math.sin(t * 0.0041 + seed * 2.3) * 0.3 +
    Math.sin(t * 0.011 + seed * 5.1) * 0.1
  )
}

/**
 * useLiveValue — gently drifts a number around `base` to feel live.
 * `amp` is the fraction of `base` it may swing (default 0.4%).
 * Respects prefers-reduced-motion (returns static base).
 */
export function useLiveValue(base, { amp = 0.004, seed = 1 } = {}) {
  const reduced = useReducedMotion()
  const [val, setVal] = useState(base)
  const start = useRef(null)

  useEffect(() => {
    if (reduced || base == null) {
      setVal(base)
      return
    }
    let raf
    const tick = (ts) => {
      if (start.current == null) start.current = ts
      const t = ts - start.current
      setVal(base * (1 + wobble(seed, t) * amp))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [base, amp, seed, reduced])

  return val
}

/**
 * useCountUp — animates 0 → target once on mount.
 */
export function useCountUp(target, { duration = 900, delay = 0 } = {}) {
  const reduced = useReducedMotion()
  const [val, setVal] = useState(reduced ? target : 0)

  useEffect(() => {
    if (reduced || target == null) {
      setVal(target)
      return
    }
    let raf
    let startTs = null
    const run = (ts) => {
      if (startTs == null) startTs = ts
      const p = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(run)
    }
    const id = setTimeout(() => {
      raf = requestAnimationFrame(run)
    }, delay)
    return () => {
      clearTimeout(id)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay, reduced])

  return val
}

// Format a number with thousands separators + optional decimals.
export function fmtNum(n, decimals = 0) {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
