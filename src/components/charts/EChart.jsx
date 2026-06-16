import { useEffect, useRef } from 'react'
import echarts from './echartsCore.js'

// Minimal React wrapper around ECharts: inits once, re-applies option on change,
// and handles container resize via ResizeObserver.
export default function EChart({ option, height = 200, className = '', notMerge = true }) {
  const elRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    chartRef.current = echarts.init(elRef.current, null, { renderer: 'svg' })
    const ro = new ResizeObserver(() => chartRef.current && chartRef.current.resize())
    ro.observe(elRef.current)
    return () => {
      ro.disconnect()
      chartRef.current && chartRef.current.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (chartRef.current) chartRef.current.setOption(option, { notMerge })
  }, [option, notMerge])

  return <div ref={elRef} className={className} style={{ width: '100%', height }} />
}
