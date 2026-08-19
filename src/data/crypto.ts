import type { Cryptocurrency, StatItem } from '../types/crypto'

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 104284.0,
    change24h: 2.84,
    marketCap: 2065000000000,
    volume: 48200000000,
    rank: 1,
    sparkline: [101200, 101800, 102400, 101900, 103100, 103600, 104284],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3845.5,
    change24h: 3.42,
    marketCap: 463000000000,
    volume: 22100000000,
    rank: 2,
    sparkline: [3700, 3720, 3780, 3750, 3800, 3820, 3845],
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 218.74,
    change24h: 5.67,
    marketCap: 104000000000,
    volume: 5800000000,
    rank: 3,
    sparkline: [205, 208, 210, 212, 215, 217, 218.74],
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    price: 692.31,
    change24h: 1.23,
    marketCap: 100000000000,
    volume: 1800000000,
    rank: 4,
    sparkline: [685, 682, 688, 690, 689, 691, 692.31],
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 2.41,
    change24h: -1.87,
    marketCap: 137000000000,
    volume: 4200000000,
    rank: 5,
    sparkline: [2.55, 2.50, 2.48, 2.45, 2.44, 2.42, 2.41],
  },
]

export const stats: StatItem[] = [
  {
    id: 'market-cap',
    title: 'Total Market Cap',
    value: '$2.48T',
    change: '+2.84%',
    changeRaw: 2.84,
    icon: 'cap',
    status: 'positive',
  },
  {
    id: 'volume-24h',
    title: '24h Volume',
    value: '$86.4B',
    change: '+5.21%',
    changeRaw: 5.21,
    icon: 'volume',
    status: 'positive',
  },
  {
    id: 'btc-dominance',
    title: 'BTC Dominance',
    value: '58.42%',
    change: '+0.62%',
    changeRaw: 0.62,
    icon: 'dominance',
    status: 'positive',
  },
  {
    id: 'active-cryptos',
    title: 'Active Cryptos',
    value: '12,482',
    change: '+124',
    changeRaw: 124,
    icon: 'active',
    status: 'neutral',
  },
]

export const bitcoinChartData: number[] = [
  98200, 98900, 99500, 99100, 100300, 100800, 101200, 100900, 101600, 102200,
  101800, 102500, 103100, 102700, 103400, 103800, 103200, 103900, 104100, 103700,
  104000, 104284,
]

export const trendingCoinIds = ['bitcoin', 'ethereum', 'solana', 'bnb']
