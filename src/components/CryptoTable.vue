<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'
import { cryptocurrencies } from '../data/crypto'
import type { Cryptocurrency } from '../types/crypto'

type SortKey = 'rank' | 'price' | 'change24h' | 'marketCap' | 'volume'
type SortDir = 'asc' | 'desc'

const sortKey = ref<SortKey>('rank')
const sortDir = ref<SortDir>('asc')

const sortedCoins = computed(() => {
  const arr = [...cryptocurrencies]
  arr.sort((a, b) => {
    const valA = a[sortKey.value]
    const valB = b[sortKey.value]
    const mult = sortDir.value === 'asc' ? 1 : -1
    return (valA as number) > (valB as number) ? mult : (valA as number) < (valB as number) ? -mult : 0
  })
  return arr
})

function toggleSort(key: SortKey): void {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = key === 'rank' ? 'asc' : 'desc'
  }
}

function sortIcon(key: SortKey) {
  if (sortKey.value !== key) return ArrowUpDown
  return sortDir.value === 'asc' ? ArrowUp : ArrowDown
}

function formatPrice(val: number): string {
  return '$' + val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatLarge(val: number): string {
  if (val >= 1e12) return '$' + (val / 1e12).toFixed(2) + 'T'
  if (val >= 1e9) return '$' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return '$' + (val / 1e6).toFixed(2) + 'M'
  return '$' + val.toLocaleString('en-US')
}

function sparklinePath(data: number[], width: number, height: number): string {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  return data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((val - min) / range) * height
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function isPositive(coin: Cryptocurrency): boolean {
  return coin.change24h >= 0
}
</script>

<template>
  <div class="table-card">
    <div class="table-header-row">
      <h3 class="table-title">Cryptocurrency Markets</h3>
      <span class="table-count">{{ sortedCoins.length }} assets</span>
    </div>
    <div class="table-scroll">
      <table class="crypto-table">
        <thead>
          <tr>
            <th class="th-rank">#</th>
            <th class="th-asset">Asset</th>
            <th class="th-price sortable" @click="toggleSort('price')">
              <span>Price</span>
              <component :is="sortIcon('price')" :size="12" />
            </th>
            <th class="th-change sortable" @click="toggleSort('change24h')">
              <span>24h Change</span>
              <component :is="sortIcon('change24h')" :size="12" />
            </th>
            <th class="th-market sortable" @click="toggleSort('marketCap')">
              <span>Market Cap</span>
              <component :is="sortIcon('marketCap')" :size="12" />
            </th>
            <th class="th-volume sortable" @click="toggleSort('volume')">
              <span>Volume</span>
              <component :is="sortIcon('volume')" :size="12" />
            </th>
            <th class="th-spark">Last 7H</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(coin, idx) in sortedCoins"
            :key="coin.id"
            class="table-row"
            :style="{ animationDelay: `${idx * 0.06}s` }"
          >
            <td class="td-rank mono">{{ coin.rank }}</td>
            <td class="td-asset">
              <div class="asset-cell">
                <div class="asset-logo" :class="coin.id">{{ coin.symbol.charAt(0) }}</div>
                <div class="asset-names">
                  <span class="asset-name">{{ coin.name }}</span>
                  <span class="asset-symbol mono">{{ coin.symbol }}</span>
                </div>
              </div>
            </td>
            <td class="td-price mono">{{ formatPrice(coin.price) }}</td>
            <td class="td-change">
              <span class="change-pill mono" :class="isPositive(coin) ? 'pos' : 'neg'">
                {{ isPositive(coin) ? '+' : '' }}{{ coin.change24h }}%
              </span>
            </td>
            <td class="td-market mono">{{ formatLarge(coin.marketCap) }}</td>
            <td class="td-volume mono">{{ formatLarge(coin.volume) }}</td>
            <td class="td-spark">
              <svg
                :viewBox="`0 0 100 32`"
                preserveAspectRatio="none"
                class="sparkline"
                :class="isPositive(coin) ? 'pos' : 'neg'"
              >
                <path
                  :d="sparklinePath(coin.sparkline, 100, 32)"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-table);
  overflow: hidden;
  animation: slideUp 0.5s ease-out 0.5s forwards;
  opacity: 0;
}

.table-header-row {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.table-count {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
  background: var(--surface-2);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
}

.table-scroll {
  overflow-x: auto;
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.crypto-table thead th {
  padding: 12px 24px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: left;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  user-select: none;
}

.crypto-table thead th.sortable {
  cursor: pointer;
  transition: color var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}

.crypto-table thead th.sortable:hover {
  color: var(--text-primary);
}

.crypto-table tbody td {
  padding: 16px 24px;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border-light);
  white-space: nowrap;
}

.crypto-table tbody tr:last-child td {
  border-bottom: none;
}

.table-row {
  transition: background-color var(--transition);
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

.table-row:hover {
  background-color: var(--surface-2);
}

.th-rank,
.td-rank {
  width: 48px;
  text-align: center;
}

.td-rank {
  color: var(--text-secondary);
  font-size: 0.8125rem;
}

.asset-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.asset-logo {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.8125rem;
  transition: transform var(--transition);
}

.table-row:hover .asset-logo {
  transform: scale(1.1);
}

.asset-logo.bitcoin {
  background: linear-gradient(135deg, #f7931a20, #f7931a10);
  color: #f7931a;
}
.asset-logo.ethereum {
  background: linear-gradient(135deg, #627eea20, #627eea10);
  color: #627eea;
}
.asset-logo.solana {
  background: linear-gradient(135deg, #9945ff20, #9945ff10);
  color: #9945ff;
}
.asset-logo.bnb {
  background: linear-gradient(135deg, #f3ba2f20, #f3ba2f10);
  color: #f3ba2f;
}
.asset-logo.xrp {
  background: linear-gradient(135deg, #00aae420, #00aae410);
  color: #00aae4;
}

.asset-names {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.asset-name {
  font-weight: 500;
}

.asset-symbol {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.td-price {
  font-weight: 600;
}

.change-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.8125rem;
  font-weight: 600;
  transition: transform var(--transition);
}

.change-pill:hover {
  transform: scale(1.05);
}

.change-pill.pos {
  color: var(--accent);
  background-color: var(--accent-bg);
}

.change-pill.neg {
  color: var(--negative);
  background-color: var(--negative-bg);
}

.td-market,
.td-volume {
  color: var(--text-primary);
}

.sparkline {
  width: 100px;
  height: 32px;
  display: block;
  transition: transform var(--transition);
}

.table-row:hover .sparkline {
  transform: scale(1.1);
}

.sparkline.pos {
  color: var(--accent);
}

.sparkline.neg {
  color: var(--negative);
}
</style>
