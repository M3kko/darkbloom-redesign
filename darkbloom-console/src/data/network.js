// Network Statistics — all figures lifted from the live console screenshots.
// Centralized so a real API can drop in later.

export const kpis = [
  {
    label: 'Tokens served',
    value: 1624.5,
    suffix: 'M',
    sub: '1349.7M in / 274.8M out',
    spark: [9, 11, 10, 13, 12, 15, 14, 17, 16, 19, 21, 24],
    delta: '+4.2%',
    deltaUp: true,
  },
  {
    label: 'Requests',
    value: 420.2,
    suffix: 'K',
    sub: '106 peak / min',
    spark: [12, 13, 11, 14, 16, 15, 18, 17, 20, 19, 22, 23],
    delta: '+1.8%',
    deltaUp: true,
  },
  {
    label: 'Nodes online',
    value: 160,
    suffix: '',
    sub: '144 hardware-attested',
    spark: [140, 142, 141, 145, 148, 150, 149, 152, 156, 158, 159, 160],
    delta: '+6',
    deltaUp: true,
  },
  {
    label: 'GB/s bandwidth',
    value: 68943,
    suffix: '',
    sub: 'combined memory throughput',
    spark: [52, 55, 58, 57, 60, 63, 62, 65, 67, 66, 68, 69],
    delta: '−2.1%',
    deltaUp: false,
  },
]

export const secondary = [
  { label: 'Network power', value: '23.8', unit: 'kW', sub: 'under load' },
  { label: 'GPU cores', value: '5333', unit: '', sub: 'Apple Silicon' },
  { label: 'CPU cores', value: '2463', unit: '', sub: 'P + E cores' },
  { label: 'Unified RAM', value: '12944', unit: 'GB', sub: 'pooled' },
  { label: 'Avg tok/req', value: '3866', unit: '', sub: 'rolling 30 min' },
  { label: 'Models', value: '5', unit: '', sub: 'serving now' },
]

// Requests / minute — last 30 min, 106 peak. ~30 samples.
export const requestsSeries = [
  62, 70, 58, 81, 74, 66, 90, 84, 72, 95, 88, 79, 101, 92, 70, 86, 99, 77, 94,
  83, 106, 91, 68, 88, 97, 80, 102, 90, 73, 52,
]

// Tokens / minute — input vs output stacked, ~22 bars / 30 min, 2.2M total.
export const tokensSeries = [
  { in: 38, out: 12 },
  { in: 52, out: 18 },
  { in: 44, out: 14 },
  { in: 61, out: 22 },
  { in: 49, out: 16 },
  { in: 70, out: 26 },
  { in: 58, out: 19 },
  { in: 66, out: 24 },
  { in: 41, out: 13 },
  { in: 74, out: 28 },
  { in: 55, out: 17 },
  { in: 63, out: 23 },
  { in: 47, out: 15 },
  { in: 80, out: 30 },
  { in: 59, out: 20 },
  { in: 68, out: 25 },
  { in: 51, out: 16 },
  { in: 77, out: 29 },
  { in: 62, out: 21 },
  { in: 45, out: 14 },
  { in: 72, out: 27 },
  { in: 56, out: 9 },
]

export const tokenDistribution = {
  in: { value: 1349.7, pct: 83, label: 'IN' },
  out: { value: 274.8, pct: 17, label: 'OUT' },
}

// Live Network Flow — providers + demand-only consumers, plotted on an
// equirectangular projection (x: -180..180 → 0..100, y: 90..-90 → 0..100).
export const flowNodes = [
  { id: 'monroe', city: 'Monroe, LA', type: 'provider', lat: 32.5, lng: -92.1, nodes: 8 },
  { id: 'toronto', city: 'Toronto, ON', type: 'provider', lat: 43.7, lng: -79.4, nodes: 4 },
  { id: 'henderson', city: 'Hendersonville, NC', type: 'provider', lat: 35.3, lng: -82.5, nodes: 3 },
  { id: 'sydney', city: 'Sydney, NSW', type: 'provider', lat: -33.9, lng: 151.2, nodes: 3 },
  { id: 'ashburn', city: 'Ashburn, VA', type: 'provider', lat: 39.0, lng: -77.5, nodes: 5 },
  { id: 'frankfurt', city: 'Frankfurt, HE', type: 'consumer', lat: 50.1, lng: 8.7 },
  { id: 'london', city: 'London', type: 'consumer', lat: 51.5, lng: -0.13 },
  { id: 'saopaulo', city: 'São Paulo', type: 'consumer', lat: -23.5, lng: -46.6 },
  { id: 'singapore', city: 'Singapore', type: 'consumer', lat: 1.35, lng: 103.8 },
  { id: 'tokyo', city: 'Tokyo', type: 'consumer', lat: 35.7, lng: 139.7 },
  { id: 'mumbai', city: 'Mumbai', type: 'consumer', lat: 19.1, lng: 72.9 },
  { id: 'sf', city: 'San Francisco', type: 'consumer', lat: 37.8, lng: -122.4 },
]

export const flowRoutes = [
  { from: 'frankfurt', to: 'monroe' },
  { from: 'london', to: 'ashburn' },
  { from: 'singapore', to: 'sydney' },
  { from: 'tokyo', to: 'sydney' },
  { from: 'saopaulo', to: 'monroe' },
  { from: 'mumbai', to: 'sydney' },
  { from: 'sf', to: 'toronto' },
]

export const flowStats = [
  { label: '30m requests', value: 2300, fmt: 'k', sub: '106 peak / min' },
  { label: '30m tokens', value: 2.2, fmt: 'm', sub: '72.7K / min avg' },
  { label: 'Routable nodes', value: 130, fmt: 'int', sub: '44 hardware-true' },
  { label: 'Model TPS', value: null, fmt: 'pending', sub: 'benchmarks pending' },
  { label: 'Certificates', value: 134, fmt: 'int', sub: 'public proof ready' },
  { label: 'Remote demand', value: 245, fmt: 'int', sub: '2 active routes' },
]

export const flowSummary = [
  { label: 'Providers', value: 106 },
  { label: 'Demand-only', value: 245 },
  { label: 'Routes', value: 2 },
]

export const providerCapacity = [
  { city: 'Monroe, LA, US', nodes: 8, attested: 100, gpu: 272, ram: 564 },
  { city: 'Toronto, ON, CA', nodes: 4, attested: 100, gpu: 128, ram: 156 },
  { city: 'Hendersonville, NC, US', nodes: 3, attested: 100, gpu: 128, ram: 384 },
  { city: 'Sydney, NSW, AU', nodes: 3, attested: 100, gpu: 72, ram: 288 },
]
export const capacityFootnote = '54 unknown / 70 city-level hidden by privacy floor'

export const geographySummary = [
  { label: 'Requests', value: 539 },
  { label: 'Cities', value: 32 },
  { label: 'Regions', value: 73 },
]

export const topOrigins = [
  { city: 'Frankfurt, HE, DE', reg: 75, tokens: '58.0K', io: '34.2K in / 24.3K out', nodes: 42 },
  { city: 'Ashburn, VA, US', reg: 33, tokens: '48.0K', io: '27.4K in / 20.6K out', nodes: 33 },
  { city: 'London, ENG, GB', reg: 28, tokens: '41.2K', io: '23.9K in / 17.3K out', nodes: 26 },
  { city: 'Singapore, SG', reg: 21, tokens: '33.7K', io: '19.1K in / 14.6K out', nodes: 19 },
  { city: 'Tokyo, JP', reg: 18, tokens: '29.4K', io: '16.8K in / 12.6K out', nodes: 14 },
]

export const leaderboard = [
  { rank: 1, node: 'Monroe, LA, US', tokens: '372.4M', share: 23, tps: '2.3K' },
  { rank: 2, node: 'Ashburn, VA, US', tokens: '298.1M', share: 18, tps: '1.9K' },
  { rank: 3, node: 'Toronto, ON, CA', tokens: '211.7M', share: 13, tps: '1.4K' },
  { rank: 4, node: 'Frankfurt, HE, DE', tokens: '188.0M', share: 12, tps: '1.2K' },
  { rank: 5, node: 'Sydney, NSW, AU', tokens: '142.3M', share: 9, tps: '980' },
  { rank: 6, node: 'Hendersonville, NC, US', tokens: '121.6M', share: 7, tps: '840' },
]
