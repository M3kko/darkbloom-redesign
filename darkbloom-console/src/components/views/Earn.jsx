import { useMemo, useState, useEffect } from 'react'
import { Cpu, Crown, Zap, DollarSign, Terminal, ArrowRight, Coffee, Tv, Wifi, TrendingUp } from 'lucide-react'
import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import CodeBlock from '../ui/CodeBlock.jsx'
import { useAuth } from '../../lib/auth.jsx'
import { macTypes, chipsByType, chipSpecs, earnModels, comparisons } from '../../data/earn.js'
import { computeEarnings, bestSoloModel } from '../../lib/earnCalc.js'

const CMP_ICON = { TrendingUp, Coffee, Tv, Wifi }

function Pills({ options, value, onChange }) {
  return (
    <div className="pills">
      {options.map((o) => (
        <button key={o} className={`pill${o === value ? ' is-active' : ''}`} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  )
}

export default function Earn() {
  const { authenticated, login } = useAuth()
  const [macType, setMacType] = useState('Mac Studio')
  const [chip, setChip] = useState('M3 Ultra')
  const [mem, setMem] = useState(256)
  const [selected, setSelected] = useState(['llama-3.1-70b'])
  const [hours, setHours] = useState(18)
  const [elec, setElec] = useState(0.15)

  const chips = chipsByType[macType] || []
  useEffect(() => {
    if (!chips.includes(chip)) setChip(chips[chips.length - 1])
  }, [macType]) // eslint-disable-line
  const mems = chipSpecs[chip]?.mem || []
  useEffect(() => {
    if (!mems.includes(mem)) setMem(mems[mems.length - 1])
  }, [chip]) // eslint-disable-line

  const best = bestSoloModel(mem)
  const result = useMemo(
    () => computeEarnings({ chip, mem, selectedModels: selected, hours, electricity: elec }),
    [chip, mem, selected, hours, elec],
  )
  const spec = chipSpecs[chip]

  function toggleModel(id) {
    setSelected((s) => (s.includes(id) ? s.filter((m) => m !== id) : [...s, id]))
  }

  const breakdown = result?.valid
    ? `single_tok/s = (${spec.bw} GB/s / ${result.models[0].weights} GB) * 0.60 = ${(result.models[0].batched / 8 / 0.85).toFixed(1)} tok/s
batched_tok/s = ${(result.models[0].batched / 8 / 0.85).toFixed(1)} * 8 * 0.85 = ${result.models[0].batched.toFixed(1)} tok/s
revenue/hr   = (${(result.models[0].tokPerHr / 1000).toFixed(0)}K tok / 1M) * $${result.models[0].revPerMtok.toFixed(2)} = $${result.revHr.toFixed(4)}
marginal_W   = ${spec.infer}W infer - ${spec.idle}W idle = ${result.marginalW}W
elec/hr      = (${result.marginalW}W / 1000) * $${elec.toFixed(2)}/kWh = $${result.elecHr.toFixed(4)}
net/hr       = $${result.revHr.toFixed(4)} - $${result.elecHr.toFixed(4)} = $${result.netHr.toFixed(4)}
monthly      = $${result.netHr.toFixed(4)} * ${hours} hrs/day * 30 = $${result.monthlyNet.toFixed(2)}`
    : ''

  return (
    <Section index="05" eyebrow="Earn" title="Earnings calculator" desc="Estimate how much your Apple Silicon Mac can earn serving inference on the Darkbloom network.">
      <Card className="card--pad earn-cta">
        <span className="earn-cta__icon">{authenticated ? <Cpu size={16} /> : <Terminal size={16} />}</span>
        <div className="earn-cta__text">
          <div className="mono hi">{authenticated ? 'Turn your Mac into a provider' : 'Ready to start earning?'}</div>
          <span className="mono dim">{authenticated ? 'Set up your Apple Silicon Mac to serve inference and earn from the network.' : 'Sign in to set up your provider node and start earning from your Mac.'}</span>
        </div>
        {authenticated
          ? <Button variant="secondary" size="sm">Setup provider <ArrowRight size={13} /></Button>
          : <Button variant="primary" size="sm" onClick={login}>Sign in</Button>}
      </Card>

      <div className="grid grid--earn">
        <div className="earn-col">
          <Card className="card--pad">
            <div className="earn-h"><Cpu size={15} /> <span className="card-title">Select your hardware</span></div>
            <div className="earn-step"><span className="label">Mac</span><Pills options={macTypes} value={macType} onChange={setMacType} /></div>
            <div className="earn-step"><span className="label">Chip</span><Pills options={chips} value={chip} onChange={setChip} /></div>
            <div className="earn-step"><span className="label">Memory</span><Pills options={mems.map((m) => `${m} GB`)} value={`${mem} GB`} onChange={(v) => setMem(parseInt(v))} /></div>
            <div className="earn-spec mono dim">
              {macType} · {chip} · {mem} GB · {spec?.bw} GB/s · {spec?.idle}W idle → {spec?.infer}W infer
            </div>
          </Card>

          <Card className="card--pad">
            <div className="earn-h"><Crown size={15} /> <span className="card-title">Models</span></div>
            <p className="mono dim earn-hint">Auto-selected: most profitable model that fits. Add more if they fit in memory.</p>
            <div className="earn-models">
              {earnModels.map((m) => {
                const fits = m.weights <= mem * 0.85
                const r = result?.models.find((x) => x.id === m.id)
                return (
                  <button key={m.id} className={`earn-model${selected.includes(m.id) ? ' is-on' : ''}${!fits ? ' is-off' : ''}`} disabled={!fits} onClick={() => toggleModel(m.id)}>
                    <span className="earn-model__check" />
                    <span className="earn-model__name mono">{m.name}</span>
                    {m.id === best && <span className="earn-model__best">best solo</span>}
                    <span className="earn-model__net mono tnum">{r ? `$${r.monthlyNet.toFixed(0)}/mo` : fits ? `${m.weights} GB` : 'too large'}</span>
                  </button>
                )
              })}
            </div>
          </Card>

          <div className="grid grid--earn2">
            <Card className="card--pad">
              <div className="earn-h"><Zap size={15} /> <span className="card-title">Inference hours</span></div>
              <div className="earn-hours serif tnum">{hours}<span className="mono dim"> hrs/day</span></div>
              <input className="earn-slider" type="range" min={1} max={24} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
              <div className="earn-slider__labels mono dim"><span>1 hr</span><span>12 hrs</span><span>24 hrs</span></div>
            </Card>
            <Card className="card--pad">
              <div className="earn-h"><DollarSign size={15} /> <span className="card-title">Electricity</span></div>
              <div className="field" style={{ marginTop: 8 }}>
                <span className="field__icon">$</span>
                <input className="field__input mono" type="number" step="0.01" value={elec} onChange={(e) => setElec(Number(e.target.value) || 0)} />
                <span className="mono dim">/kWh</span>
              </div>
              <p className="formrow__help" style={{ marginTop: 8 }}>US avg $0.15 · EU $0.25 · CA $0.22</p>
            </Card>
          </div>
        </div>

        <div className="earn-results">
          <Card className="card--pad earn-net card--verify">
            <span className="label">Monthly net earnings</span>
            <div className={`earn-net__big serif tnum${result?.monthlyNet >= 0 ? ' blue' : ''}`}>
              {result?.valid ? `$${result.monthlyNet.toFixed(0)}` : '—'}
            </div>
            <span className="mono dim">{result?.valid ? `($${result.annualNet.toFixed(0)}/yr)` : 'Select a model that fits'}</span>
          </Card>

          {result?.valid && (
            <>
              <Card className="card--pad earn-detail">
                {[
                  ['Decode speed', `${result.avgTps.toFixed(1)} tok/s`],
                  ['Monthly revenue', `$${result.monthlyRevenue.toFixed(2)}`],
                  ['Monthly electricity', `-$${result.monthlyElec.toFixed(2)}`],
                  ['Electricity % of rev', `${result.elecPct.toFixed(1)}%`],
                  ['Net per hour', `$${result.netHr.toFixed(4)}`],
                  ['Provider share', '100%'],
                ].map(([k, v]) => (
                  <div className="earn-detail__row" key={k}><span className="label">{k}</span><span className="mono hi tnum">{v}</span></div>
                ))}
              </Card>

              <div className="block-head" style={{ marginTop: 24 }}><div><h3 className="card-title">Calculation</h3></div></div>
              <CodeBlock code={breakdown} filename="earnings.txt" />

              {result.monthlyNet > 8 && (
                <Card className="card--pad earn-cmp">
                  <span className="label">Your Mac earns more idle than…</span>
                  <div className="earn-cmp__grid">
                    {comparisons.map((c) => {
                      const Icon = CMP_ICON[c.icon]
                      return (
                        <div className="earn-cmp__item" key={c.label}>
                          <Icon size={14} />
                          <span className="mono"><strong className="tnum">{(result.monthlyNet / c.per).toFixed(1)}×</strong> {c.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              )}
            </>
          )}

          <p className="earn-disclaimer mono dim">
            Estimates only — actual earnings depend on network demand, model popularity, your reputation, and competing providers.
            Idle Macs draw minimal power; electricity costs apply only during active inference.
          </p>
        </div>
      </div>
    </Section>
  )
}
