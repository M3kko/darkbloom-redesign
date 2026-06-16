import { withAlpha, areaGradient } from './chartBase.js'

// Chart color treatment (within the one-blue rule). 'deep' = navy base with a
// bright accent cap, high contrast. A ?p=<name> override is kept for tweaking.
export const DEFAULT_PALETTE = 'deep'

export function paletteName() {
  if (typeof window === 'undefined') return DEFAULT_PALETTE
  const p = new URLSearchParams(window.location.search).get('p')
  return p || DEFAULT_PALETTE
}

// Returns concrete colors for a given theme-color set `c`.
export function getPalette(c, name = paletteName()) {
  switch (name) {
    // Vivid electric base + deep cap. Saturated, premium "Nous" blue.
    case 'twotone':
      return {
        line: c.blue,
        lineWidth: 2.5,
        area: areaGradient(c.blue400, 0.34, 0.02),
        barIn: c.blue400,
        barInEmph: c.blue,
        barOut: areaGradient(c.blue, 1, 0.82),
        barOutEmph: c.blue,
        distIn: `linear-gradient(90deg, ${c.blue400}, ${c.blue})`,
        distOut: withAlpha(c.blue400, 0.3),
        swatchIn: c.blue400,
        swatchOut: c.blue,
      }
    // Restrained: thin line, light fill, translucent base bars. Sophisticated.
    case 'mono':
      return {
        line: c.blue,
        lineWidth: 2,
        area: areaGradient(c.blue, 0.16, 0),
        barIn: withAlpha(c.blue, 0.26),
        barInEmph: withAlpha(c.blue, 0.4),
        barOut: c.blue,
        barOutEmph: c.blueHover,
        distIn: `linear-gradient(90deg, ${c.blue}, ${c.blue})`,
        distOut: withAlpha(c.blue, 0.18),
        swatchIn: withAlpha(c.blue, 0.4),
        swatchOut: c.blue,
      }
    // Deep base, bright accent cap. Dramatic, high-contrast.
    case 'deep':
      return {
        line: c.blue400,
        lineWidth: 2.75,
        area: areaGradient(c.blue, 0.4, 0.04),
        barIn: c.blue800,
        barInEmph: c.blue,
        barOut: c.blue400,
        barOutEmph: c.blue400,
        distIn: `linear-gradient(90deg, ${c.blue800}, ${c.blue})`,
        distOut: c.blue400,
        swatchIn: c.blue800,
        swatchOut: c.blue400,
      }
    // Original (kept for reference).
    default:
      return {
        line: c.blue,
        lineWidth: 2.5,
        area: areaGradient(c.blue, 0.22, 0),
        barIn: c.blueTint,
        barInEmph: c.blue100,
        barOut: areaGradient(c.blue, 1, 0.78),
        barOutEmph: c.blue,
        distIn: `linear-gradient(90deg, ${c.blueHover}, ${c.blue})`,
        distOut: c.blueTint,
        swatchIn: c.blueTint,
        swatchOut: c.blue,
      }
  }
}
