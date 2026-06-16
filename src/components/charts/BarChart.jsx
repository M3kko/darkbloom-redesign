import { useMemo } from 'react'
import EChart from './EChart.jsx'
import useThemeColors from '../../hooks/useThemeColors.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { base, MONO } from './chartBase.js'
import { getPalette } from './palette.js'

export default function BarChart({ data = [], height = 200 }) {
  const c = useThemeColors()
  const reduced = useReducedMotion()

  const option = useMemo(() => {
    const pal = getPalette(c)
    const n = data.length
    const labels = data.map((_, i) => {
      const back = n - 1 - i
      if (i === 0) return '−30m'
      if (back === 0) return 'now'
      if (back === Math.floor(n / 2)) return '−15m'
      return ''
    })

    const b = base(c, reduced)
    return {
      ...b,
      tooltip: {
        ...b.tooltip,
        trigger: 'axis',
        axisPointer: { type: 'shadow', shadowStyle: { color: c.line } },
        formatter: (p) => {
          const ins = p.find((x) => x.seriesName === 'Input')?.data ?? 0
          const out = p.find((x) => x.seriesName === 'Output')?.data ?? 0
          const total = ((ins + out) * 30).toLocaleString()
          return `<span style="font-family:${MONO};font-weight:600;color:${c.textHi};font-size:14px">${total}</span> <span style="color:${c.textMid};font-size:11px">k tok</span><br/>
            <span style="font-family:${MONO};font-size:11px;color:${c.textMid}"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${pal.swatchIn};margin-right:5px"></span>in ${ins}</span><br/>
            <span style="font-family:${MONO};font-size:11px;color:${c.textMid}"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${pal.swatchOut};margin-right:5px"></span>out ${out}</span>`
        },
      },
      xAxis: { ...b.xAxis, data: labels, axisLabel: { ...b.xAxis.axisLabel, interval: 0 }, axisLine: { show: false } },
      series: [
        {
          name: 'Input',
          type: 'bar',
          stack: 'tok',
          data: data.map((d) => d.in),
          itemStyle: { color: pal.barIn, borderRadius: [0, 0, 2, 2] },
          barCategoryGap: '34%',
          emphasis: { itemStyle: { color: pal.barInEmph } },
        },
        {
          name: 'Output',
          type: 'bar',
          stack: 'tok',
          data: data.map((d) => d.out),
          itemStyle: {
            color: pal.barOut,
            borderRadius: [3, 3, 0, 0],
          },
          emphasis: { itemStyle: { color: pal.barOutEmph } },
        },
      ],
    }
  }, [data, c, reduced])

  return <EChart option={option} height={height} />
}
