import { useEffect, useState } from 'react'

// ECharts (canvas) can't read CSS variables, so resolve the design tokens from
// the document and re-read them whenever the theme attribute flips.
const KEYS = {
  blue: '--blue',
  blueHover: '--blue-hover',
  blueTint: '--blue-tint',
  blue400: '--blue-400',
  blue100: '--blue-100',
  blue800: '--blue-800',
  line: '--line',
  line2: '--line-2',
  line3: '--line-3',
  surface: '--surface',
  surface2: '--surface-2',
  text: '--text',
  textHi: '--text-hi',
  textMid: '--text-mid',
  textDim: '--text-dim',
  textFaint: '--text-faint',
}

function read() {
  const cs = getComputedStyle(document.documentElement)
  const out = {}
  for (const [k, v] of Object.entries(KEYS)) out[k] = cs.getPropertyValue(v).trim()
  out.theme = document.documentElement.getAttribute('data-theme') || 'light'
  return out
}

export default function useThemeColors() {
  const [colors, setColors] = useState(read)

  useEffect(() => {
    const obs = new MutationObserver(() => setColors(read()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  return colors
}
