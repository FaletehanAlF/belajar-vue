export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  rank: number
  sparkline: number[]
}

export interface StatItem {
  id: string
  title: string
  value: string
  change: string
  changeRaw: number
  icon: 'cap' | 'volume' | 'dominance' | 'active'
  status: 'positive' | 'negative' | 'neutral'
}

export type TimeFilter = '1H' | '1D' | '1W' | '1M' | '1Y'
