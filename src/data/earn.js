// Earnings calculator data — Mac hardware DB + model economics.

export const macTypes = ['MacBook Air', 'MacBook Pro', 'Mac Mini', 'Mac Studio', 'Mac Pro']

// chips available per mac type
export const chipsByType = {
  'MacBook Air': ['M2', 'M3', 'M4'],
  'MacBook Pro': ['M3 Pro', 'M3 Max', 'M4 Pro', 'M4 Max'],
  'Mac Mini': ['M4', 'M4 Pro'],
  'Mac Studio': ['M4 Max', 'M3 Ultra'],
  'Mac Pro': ['M2 Ultra', 'M3 Ultra'],
}

// per chip: memory options (GB), bandwidth (GB/s), idle/infer watts
export const chipSpecs = {
  M2: { mem: [16, 24], bw: 100, idle: 8, infer: 22 },
  M3: { mem: [16, 24], bw: 100, idle: 8, infer: 22 },
  M4: { mem: [16, 24, 32], bw: 120, idle: 9, infer: 24 },
  'M3 Pro': { mem: [18, 36], bw: 150, idle: 12, infer: 38 },
  'M3 Max': { mem: [36, 48, 64, 96, 128], bw: 400, idle: 16, infer: 56 },
  'M4 Pro': { mem: [24, 48], bw: 273, idle: 14, infer: 46 },
  'M4 Max': { mem: [36, 48, 64, 128], bw: 546, idle: 20, infer: 62 },
  'M3 Ultra': { mem: [96, 192, 256, 512], bw: 819, idle: 30, infer: 110 },
  'M2 Ultra': { mem: [64, 128, 192], bw: 800, idle: 30, infer: 105 },
}

// models with weights size + revenue per Mtoken (usd) + demand note
export const earnModels = [
  { id: 'llama-3.1-8b', name: 'llama 3.1 8b', weights: 8, revPerMtok: 0.12, demand: 'Steady demand — small, popular model.' },
  { id: 'gpt-oss-20b', name: 'gpt-oss 20b', weights: 12, revPerMtok: 0.2, demand: 'High demand — flagship open model.' },
  { id: 'gemma-4-26b', name: 'gemma 4 26b', weights: 16, revPerMtok: 0.24, demand: 'Growing demand — vision-capable.' },
  { id: 'qwen-2.5-32b', name: 'qwen 2.5 32b', weights: 20, revPerMtok: 0.28, demand: 'Premium tier — fewer providers.' },
  { id: 'llama-3.1-70b', name: 'llama 3.1 70b', weights: 40, revPerMtok: 0.5, demand: 'Highest rate — needs lots of RAM.' },
]

export const comparisons = [
  { per: 12, label: 'Spotify Premium subscriptions', icon: 'TrendingUp' },
  { per: 5.5, label: 'lattes per month', icon: 'Coffee' },
  { per: 15.5, label: 'Netflix Standard plans', icon: 'Tv' },
  { per: 60, label: 'your home internet bill', icon: 'Wifi' },
]
