import echarts from './echartsCore.js'

export const MONO = "'Geist Mono', ui-monospace, monospace"

// Shared, design-system-aligned pieces for every ECharts option.
export function base(c, reduced) {
  return {
    animation: !reduced,
    animationDuration: 900,
    animationEasing: 'cubicOut',
    textStyle: { fontFamily: MONO, color: c.textMid },
    grid: { top: 18, right: 14, bottom: 22, left: 8, containLabel: true },
    tooltip: {
      backgroundColor: c.surface,
      borderColor: c.line3,
      borderWidth: 1,
      padding: [8, 11],
      textStyle: { fontFamily: MONO, color: c.text, fontSize: 11 },
      extraCssText: 'border-radius:6px; box-shadow:0 6px 20px -8px rgba(17,24,39,.18);',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: { lineStyle: { color: c.line2 } },
      axisTick: { show: false },
      axisLabel: {
        color: c.textDim,
        fontFamily: MONO,
        fontSize: 10,
        margin: 10,
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: c.line, type: [3, 4] } },
      axisLabel: { color: c.textDim, fontFamily: MONO, fontSize: 10 },
    },
  }
}

// Vertical gradient fill for the area under a line.
export function areaGradient(color, top = 0.2, bottom = 0) {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: withAlpha(color, top) },
    { offset: 1, color: withAlpha(color, bottom) },
  ])
}

// Convert a hex / rgb color to an rgba string at the given alpha.
export function withAlpha(color, a) {
  if (!color) return `rgba(28,57,214,${a})`
  if (color.startsWith('#')) {
    const h = color.slice(1)
    const n = h.length === 3 ? h.split('').map((x) => x + x).join('') : h
    const r = parseInt(n.slice(0, 2), 16)
    const g = parseInt(n.slice(2, 4), 16)
    const b = parseInt(n.slice(4, 6), 16)
    return `rgba(${r},${g},${b},${a})`
  }
  const m = color.match(/\d+/g)
  if (m && m.length >= 3) return `rgba(${m[0]},${m[1]},${m[2]},${a})`
  return color
}
