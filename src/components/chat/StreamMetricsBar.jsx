import { Gauge, Clock, Hash } from 'lucide-react'

export default function StreamMetricsBar({ tps, ttft, tokens, streaming }) {
  return (
    <div className="smetrics mono">
      <span className="smetric"><Gauge size={12} /> <span className="tnum">{tps?.toFixed(0) ?? '—'}</span> tok/s</span>
      <span className="smetric"><Clock size={12} /> <span className="tnum">{ttft != null ? `${(ttft / 1000).toFixed(2)}s` : '—'}</span> ttft</span>
      <span className="smetric"><Hash size={12} /> <span className="tnum">{tokens ?? 0}</span> tok</span>
      {streaming && <span className="smetric smetric--live"><span className="smetric__dot" /> live</span>}
    </div>
  )
}
