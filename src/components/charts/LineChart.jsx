import { useMemo } from 'react'
import EChart from './EChart.jsx'
import useThemeColors from '../../hooks/useThemeColors.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { base, MONO } from './chartBase.js'
import { getPalette } from './palette.js'

export default function LineChart({ data = [], height = 200 }) {
  const c = useThemeColors()
  const reduced = useReducedMotion()

  const option = useMemo(() => {
    const pal = getPalette(c)
    const n = data.length
    const labels = data.map((_, i) => {
      const back = n - 1 - i
      if (i === 0) return '−30m'
      if (back === 0) return 'now'
      if (back === 10) return '−10m'
      if (back === 20) return '−20m'
      return ''
    })
    const lastIdx = n - 1

    const series = [
      {
        type: 'line',
        data,
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 0,
        showSymbol: false,
        lineStyle: { color: pal.line, width: pal.lineWidth, cap: 'round' },
        areaStyle: { color: pal.area },
        emphasis: { focus: 'series' },
        z: 2,
      },
      // static endpoint marker
      {
        type: 'scatter',
        data: [[lastIdx, data[lastIdx]]],
        symbolSize: 7,
        itemStyle: { color: pal.line, borderColor: c.surface, borderWidth: 2 },
        z: 4,
        silent: true,
      },
    ]

    // live pulsing endpoint
    if (!reduced) {
      series.push({
        type: 'effectScatter',
        data: [[lastIdx, data[lastIdx]]],
        symbolSize: 7,
        showEffectOn: 'render',
        rippleEffect: { scale: 4, brushType: 'stroke', period: 3 },
        itemStyle: { color: pal.line },
        z: 3,
        silent: true,
      })
    }

    const b = base(c, reduced)
    return {
      ...b,
      grid: { ...b.grid, top: 22, bottom: 24 },
      tooltip: {
        ...b.tooltip,
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: { color: c.line3, width: 1, type: [4, 4] },
          z: 1,
        },
        formatter: (p) => {
          const v = p[0]
          return `<span style="font-family:${MONO};font-size:10px;color:${c.textDim}">${v.axisValue === '' ? `t−${n - 1 - v.dataIndex}m` : v.axisValue}</span><br/><span style="font-family:${MONO};font-weight:600;color:${c.textHi};font-size:14px">${v.data}</span> <span style="color:${c.textMid};font-size:11px">req/min</span>`
        },
      },
      xAxis: { ...b.xAxis, data: labels, axisLabel: { ...b.xAxis.axisLabel, interval: 0 } },
      yAxis: { ...b.yAxis, max: (v) => Math.ceil(v.max / 20) * 20 },
      series,
    }
  }, [data, c, reduced])

  return <EChart option={option} height={height} />
}
