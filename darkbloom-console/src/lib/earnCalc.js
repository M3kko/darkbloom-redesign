import { chipSpecs, earnModels } from '../data/earn.js'

// Simplified provider earnings model. Returns per-model + aggregate estimates.
export function computeEarnings({ chip, mem, selectedModels, hours, electricity }) {
  const spec = chipSpecs[chip]
  if (!spec) return null
  const usableMem = mem * 0.85 // headroom
  const models = earnModels.filter((m) => selectedModels.includes(m.id) && m.weights <= usableMem)
  if (models.length === 0) return { spec, models: [], monthlyNet: 0, valid: false }

  const sharedHours = hours / models.length
  const marginalW = spec.infer - spec.idle

  let monthlyRevenue = 0
  let monthlyElec = 0
  const perModel = models.map((m) => {
    // single-stream decode tok/s ≈ bandwidth / weights * efficiency
    const single = (spec.bw / m.weights) * 0.6
    const batched = single * 8 * 0.85
    const tokPerHr = batched * 3600
    const revHr = (tokPerHr / 1e6) * m.revPerMtok
    const elecHr = (marginalW / 1000) * electricity
    const monthlyRev = revHr * sharedHours * 30
    const monthlyE = elecHr * sharedHours * 30
    monthlyRevenue += monthlyRev
    monthlyElec += monthlyE
    return { ...m, batched, tokPerHr, revHr, elecHr, monthlyRev, monthlyNet: monthlyRev - monthlyE }
  })

  const monthlyNet = monthlyRevenue - monthlyElec
  const avgTps = perModel.reduce((s, m) => s + m.batched, 0) / perModel.length
  const revHr = perModel.reduce((s, m) => s + m.revHr, 0)
  const elecHr = (marginalW / 1000) * electricity

  return {
    spec,
    models: perModel,
    valid: true,
    monthlyRevenue,
    monthlyElec,
    monthlyNet,
    annualNet: monthlyNet * 12,
    avgTps,
    revHr,
    elecHr,
    netHr: revHr - elecHr,
    elecPct: monthlyRevenue ? (monthlyElec / monthlyRevenue) * 100 : 0,
    marginalW,
  }
}

// best single model for a given memory budget
export function bestSoloModel(mem) {
  const usable = mem * 0.85
  const fits = earnModels.filter((m) => m.weights <= usable)
  return fits.length ? fits[fits.length - 1].id : null
}
