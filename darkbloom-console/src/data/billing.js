// Billing mock data.
export const balance = {
  totalUsd: 24.18,
  creditsUsd: 19.18,
  earningsUsd: 5.0,
}

export const billingStats = [
  { label: 'Total spent', value: '$4.8112', sub: 'lifetime' },
  { label: 'Total tokens', value: '1,624,500', sub: 'served' },
  { label: 'Requests', value: '420,200', sub: 'lifetime' },
]

// Spend over the last 14 days (usd, scaled for the chart series).
export const spendSeries = [
  18, 24, 21, 30, 27, 35, 31, 29, 38, 42, 36, 44, 40, 47,
]

export const usageHistory = [
  { time: '2026-06-16 14:22', model: 'gpt-oss-20b', prompt: 412, completion: 1840, cost: 0.000392 },
  { time: '2026-06-16 14:05', model: 'gemma-4-26b', prompt: 88, completion: 640, cost: 0.000146 },
  { time: '2026-06-16 13:48', model: 'gpt-oss-20b', prompt: 1203, completion: 2980, cost: 0.000651 },
  { time: '2026-06-16 12:31', model: 'qwen-2.5-32b', prompt: 56, completion: 412, cost: 0.000098 },
  { time: '2026-06-16 11:02', model: 'gpt-oss-20b', prompt: 740, completion: 1520, cost: 0.000341 },
  { time: '2026-06-15 22:19', model: 'llama-3.1-8b', prompt: 220, completion: 880, cost: 0.000072 },
  { time: '2026-06-15 18:44', model: 'gemma-4-26b', prompt: 132, completion: 1010, cost: 0.000218 },
  { time: '2026-06-15 16:10', model: 'gpt-oss-20b', prompt: 2040, completion: 3600, cost: 0.000884 },
]

export const payoutStatus = 'ready' // ready | pending | restricted
export const payoutDest = 'Debit card ••4291'
