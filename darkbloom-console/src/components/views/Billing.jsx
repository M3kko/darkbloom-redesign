import { useState, useMemo } from 'react'
import { CreditCard, ArrowDownToLine, Ticket, DollarSign, TrendingUp, Clock, Check, Zap } from 'lucide-react'
import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import LineChart from '../charts/LineChart.jsx'
import { useAuth } from '../../lib/auth.jsx'
import { useToast } from '../ui/Toast.jsx'
import { balance, billingStats, spendSeries, usageHistory, payoutStatus, payoutDest } from '../../data/billing.js'

function BuyModal({ open, onClose }) {
  const toast = useToast()
  const [amount, setAmount] = useState(10)
  return (
    <Modal open={open} onClose={onClose} title="Buy credits" width={420}
      footer={<><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => { onClose(); toast.push(`Redirecting to Stripe for $${amount}.00…`) }}>Continue</Button></>}>
      <p className="mono dim" style={{ fontSize: 12, marginBottom: 16 }}>Credits are used to pay for inference requests.</p>
      <div className="formrow">
        <label className="formrow__label">Amount (USD)</label>
        <div className="field"><input className="field__input mono" type="number" min={1} max={20} value={amount} onChange={(e) => setAmount(Math.min(20, Math.max(1, Number(e.target.value) || 0)))} /></div>
      </div>
      <div className="quickpick">
        {[5, 10, 15, 20].map((v) => (
          <button key={v} className={`quickpick__btn${amount === v ? ' is-active' : ''}`} onClick={() => setAmount(v)}>${v}</button>
        ))}
      </div>
      <p className="formrow__help" style={{ marginTop: 12 }}>Powered by Stripe. Secure card payment.</p>
    </Modal>
  )
}

function WithdrawModal({ open, onClose }) {
  const toast = useToast()
  const [amount, setAmount] = useState(5)
  const [speed, setSpeed] = useState('standard')
  const fee = speed === 'instant' ? Math.max(0.5, amount * 0.015) : 0
  return (
    <Modal open={open} onClose={onClose} title={`Withdraw to ${payoutDest}`} width={440}
      footer={<><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => { onClose(); toast.push(`Withdrawal of $${(amount - fee).toFixed(2)} submitted`) }}>Withdraw ${amount.toFixed(2)}</Button></>}>
      <p className="mono dim" style={{ fontSize: 12, marginBottom: 14 }}>Funds go to your linked card {payoutDest}.</p>
      <div className="formrow">
        <label className="formrow__label">Amount (USD)</label>
        <div className="field"><input className="field__input mono" type="number" min={1} max={balance.earningsUsd} value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} /></div>
        <p className="formrow__help">Available: ${balance.earningsUsd.toFixed(2)} · Min: $1.00</p>
      </div>
      <div className="speedsel">
        {[
          { id: 'standard', icon: Clock, label: 'Standard', eta: '1–2 business days', fee: 'Free' },
          { id: 'instant', icon: Zap, label: 'Instant', eta: '~30 minutes', fee: '1.5% (min $0.50)' },
        ].map((s) => (
          <button key={s.id} className={`speedsel__opt${speed === s.id ? ' is-active' : ''}`} onClick={() => setSpeed(s.id)}>
            <s.icon size={14} />
            <span className="speedsel__label mono">{s.label}</span>
            <span className="speedsel__eta mono dim">{s.eta}</span>
            <span className="speedsel__fee mono">{s.fee}</span>
          </button>
        ))}
      </div>
      <div className="feebreak mono">
        <div><span className="dim">Withdrawal</span><span className="tnum">${amount.toFixed(2)}</span></div>
        <div><span className="dim">Fee</span><span className="tnum">-${fee.toFixed(2)}</span></div>
        <div className="feebreak__total"><span>You receive</span><span className="blue tnum">${(amount - fee).toFixed(2)}</span></div>
      </div>
    </Modal>
  )
}

export default function Billing() {
  const { authenticated, login } = useAuth()
  const toast = useToast()
  const [buy, setBuy] = useState(false)
  const [withdraw, setWithdraw] = useState(false)
  const [invite, setInvite] = useState('')
  const [sort, setSort] = useState({ key: 'time', dir: 'desc' })

  const rows = useMemo(() => {
    const r = [...usageHistory]
    r.sort((a, b) => {
      const av = sort.key === 'cost' ? a.cost : a.time
      const bv = sort.key === 'cost' ? b.cost : b.time
      return (av < bv ? -1 : av > bv ? 1 : 0) * (sort.dir === 'asc' ? 1 : -1)
    })
    return r
  }, [sort])

  function toggleSort(key) {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))
  }

  if (!authenticated) {
    return (
      <Section index="06" eyebrow="Billing" title="Billing" desc="Balance, credits, payouts, and usage history.">
        <Card className="card--pad" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <p className="mono dim">Sign in to view your balance and usage.</p>
          <Button variant="primary" size="sm" onClick={login}>Sign in</Button>
        </Card>
      </Section>
    )
  }

  return (
    <Section index="06" eyebrow="Billing" title="Billing" desc="Balance, credits, payouts, and usage history.">
      <div className="grid grid--billing">
        <Card className="card--pad bal">
          <span className="label">Balance</span>
          <div className="bal__big serif tnum">${balance.totalUsd.toFixed(2)} <span className="bal__unit mono dim">USD</span></div>
          <div className="bal__split mono dim tnum">
            <span>${balance.creditsUsd.toFixed(2)} credits</span>
            <span className="bal__dot">·</span>
            <span>${balance.earningsUsd.toFixed(2)} earnings</span>
          </div>
          <div className="bal__actions">
            <Button variant="primary" size="sm" onClick={() => setBuy(true)}><CreditCard size={14} /> Buy credits</Button>
            <Button variant="secondary" size="sm" onClick={() => setWithdraw(true)}><ArrowDownToLine size={14} /> Withdraw</Button>
          </div>
        </Card>

        <Card className="card--pad payout">
          <div className="payout__head">
            <span className="label">Withdraw to bank</span>
            <StatusBadge tone={payoutStatus === 'ready' ? 'verified' : 'degraded'}>{payoutStatus === 'ready' ? 'Ready' : 'Pending'}</StatusBadge>
          </div>
          <p className="mono dim payout__dest">{payoutDest} · Instant eligible</p>
          <div className="invite-redeem">
            <span className="invite-redeem__icon"><Ticket size={14} /></span>
            <input className="field__input mono invite-redeem__input" placeholder="INV-XXXXXXXX" value={invite} onChange={(e) => setInvite(e.target.value.toUpperCase())} />
            <Button variant="secondary" size="sm" onClick={() => { if (invite) { toast.push('$5.00 credited to your account'); setInvite('') } }}>Redeem</Button>
          </div>
        </Card>
      </div>

      <div className="grid grid--bstats">
        {billingStats.map((s, i) => {
          const Icon = [DollarSign, TrendingUp, Clock][i]
          return (
            <div className="bstat" key={s.label}>
              <span className="bstat__icon"><Icon size={15} /></span>
              <div>
                <div className="bstat__v serif tnum">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <Card>
        <div className="ch-head ch-head--row" style={{ padding: '16px 18px 0' }}>
          <span className="eyebrow">Spend · last 14 days</span>
          <span className="mono dim tnum">$4.81 total</span>
        </div>
        <div className="card__body"><LineChart data={spendSeries} height={160} /></div>
      </Card>

      <div className="block-head"><div><h3 className="card-title">Usage history</h3></div></div>
      <Card className="card--pad">
        <div className="usage">
          <div className="usage__row usage__row--head label">
            <button className="usage__sort" onClick={() => toggleSort('time')}>Time {sort.key === 'time' && (sort.dir === 'desc' ? '↓' : '↑')}</button>
            <span>Model</span>
            <span className="usage__r">Tokens</span>
            <button className="usage__sort usage__r" onClick={() => toggleSort('cost')}>Cost {sort.key === 'cost' && (sort.dir === 'desc' ? '↓' : '↑')}</button>
          </div>
          {rows.map((r, i) => (
            <div className="usage__row" key={i}>
              <span className="mono dim">{r.time}</span>
              <span className="mono hi">{r.model}</span>
              <span className="usage__r mono tnum">{(r.prompt + r.completion).toLocaleString()} <span className="dim">({r.prompt}p / {r.completion}c)</span></span>
              <span className="usage__r mono blue tnum">${r.cost.toFixed(6)}</span>
            </div>
          ))}
        </div>
      </Card>

      <BuyModal open={buy} onClose={() => setBuy(false)} />
      <WithdrawModal open={withdraw} onClose={() => setWithdraw(false)} />
    </Section>
  )
}
