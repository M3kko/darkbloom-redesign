// Active Models — figures from the live console screenshots.

export const modelSummary = [
  { label: 'Models', value: 2 },
  { label: 'Slots', value: 190 },
  { label: 'Routable slots', value: 157 },
]

export const models = [
  {
    id: 'gpt-oss-20b',
    name: 'GPT-OSS 20B',
    status: 'verified',
    badge: 'gpt-oss · fp8',
    deprecated: false,
    stats: [
      { label: 'Nodes', value: 101 },
      { label: 'Routable', value: 82 },
      { label: 'Hardware', value: 90 },
      { label: 'Share', value: '53%' },
    ],
    meta: [
      ['Precision', 'fp8'],
      ['Disk', '12 GB'],
      ['Min mem', '24 GB'],
      ['Context', '131.1K ctx'],
      ['GPU', '3.2K GPU'],
      ['RAM', '9.1K GB'],
    ],
    perf: [
      { label: 'Capacity TPS', value: '2246' },
      { label: 'p99 est', value: '5.0s' },
      { label: 'Warm / cold', value: '9 / 10' },
      { label: 'Warm / total', value: '17 / 54' },
      { label: 'Token budget', value: '99%' },
    ],
    visibleSlots: 53,
    routableCoverage: 81,
    share: 53,
  },
  {
    id: 'gemma-4-26b',
    name: 'Gemma 4 26B',
    status: 'verified',
    badge: 'gemma · 4bit',
    deprecated: false,
    stats: [
      { label: 'Nodes', value: 89 },
      { label: 'Routable', value: 75 },
      { label: 'Hardware', value: 84 },
      { label: 'Share', value: '47%' },
    ],
    meta: [
      ['Precision', '4bit'],
      ['Disk', '13 GB'],
      ['Min mem', '28 GB'],
      ['Context', '131.1K ctx'],
      ['GPU', '2.8K GPU'],
      ['RAM', '9.0K GB'],
    ],
    perf: [
      { label: 'Capacity TPS', value: '1418' },
      { label: 'ttft est', value: '4.4s' },
      { label: 'Warm / cold', value: '36 / 10' },
      { label: 'Warm / total', value: '38 / 29' },
      { label: 'Token budget', value: '100%' },
    ],
    visibleSlots: 47,
    routableCoverage: 79,
    share: 47,
  },
]

export const fleet = {
  routable: 157,
  total: 198,
  coverage: 83,
  shares: [
    { id: 'gpt-oss-20b', label: 'gpt oss 20b', pct: 53 },
    { id: 'gemma-4-26b', label: 'gemma 4 26b', pct: 47 },
  ],
}

export const deprecatedCount = 3

// Pricing per 1M tokens (USD), provider count, attested marker, capacity.
export const pricing = {
  'gpt-oss-20b': { input: 0.05, output: 0.2, providers: 101, attested: true, baseline: 0.6, capTps: 2246, ttft: '5.0s', queue: '3 / 64', tokenBudget: 99 },
  'gemma-4-26b': { input: 0.06, output: 0.24, providers: 89, attested: true, baseline: 0.7, capTps: 1418, ttft: '4.4s', queue: '7 / 64', tokenBudget: 100 },
}

export const pricingBaseline = [
  { model: 'gpt-oss 20b', unit: 'per 1M out', darkbloom: '$0.20', baseline: '$0.60', savings: 67 },
  { model: 'gemma 4 26b', unit: 'per 1M out', darkbloom: '$0.24', baseline: '$0.70', savings: 66 },
  { model: 'qwen 2.5 32b', unit: 'per 1M out', darkbloom: '$0.28', baseline: '$0.90', savings: 69 },
]
