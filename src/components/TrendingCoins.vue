<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Flame } from 'lucide-vue-next'
import { cryptocurrencies, trendingCoinIds } from '../data/crypto'
import type { Cryptocurrency } from '../types/crypto'

const trending = computed<Cryptocurrency[]>(() =>
  trendingCoinIds
    .map((id) => cryptocurrencies.find((c) => c.id === id))
    .filter((c): c is Cryptocurrency => c !== undefined)
)

function formatPrice(val: number): string {
  return '$' + val.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
</script>

<template>
  <div class="trending-card">
    <div class="trending-header">
      <div class="trending-title-row">
        <Flame :size="18" class="trending-icon" />
        <h3 class="trending-title">Trending</h3>
      </div>
      <span class="trending-sub">Top 4</span>
    </div>
    <ul class="trending-list">
      <li
        v-for="(coin, idx) in trending"
        :key="coin.id"
        class="trending-item"
        :style="{ animationDelay: (0.4 + idx * 0.08) + 's' }"
      >
        <div class="coin-info">
          <div class="coin-logo" :class="coin.id">{{ coin.symbol.charAt(0) }}</div>
          <div class="coin-text">
            <span class="coin-name">{{ coin.name }}</span>
            <span class="coin-symbol mono">{{ coin.symbol }}</span>
          </div>
        </div>
        <div class="coin-data">
          <span class="coin-price mono">{{ formatPrice(coin.price) }}</span>
          <span
            class="coin-change mono"
            :class="coin.change24h >= 0 ? 'pos' : 'neg'"
          >
            <TrendingUp v-if="coin.change24h >= 0" :size="12" />
            <TrendingDown v-else :size="12" />
            {{ coin.change24h >= 0 ? '+' : '' }}{{ coin.change24h }}%
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.trending-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: slideUp 0.5s ease-out 0.4s forwards;
  opacity: 0;
  transition: border-color var(--transition);
}

.trending-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}

.trending-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trending-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trending-icon {
  color: var(--warning);
  animation: float 3s ease-in-out infinite;
}

.trending-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.trending-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  background: var(--surface-2);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}

.trending-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.trending-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition), transform var(--transition);
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

.trending-item:hover {
  background-color: var(--surface-2);
  transform: translateX(4px);
}

.coin-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.coin-logo {
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

.trending-item:hover .coin-logo {
  transform: scale(1.15);
}

.coin-logo.bitcoin {
  background: linear-gradient(135deg, #f7931a20, #f7931a10);
  color: #f7931a;
}
.coin-logo.ethereum {
  background: linear-gradient(135deg, #627eea20, #627eea10);
  color: #627eea;
}
.coin-logo.solana {
  background: linear-gradient(135deg, #9945ff20, #9945ff10);
  color: #9945ff;
}
.coin-logo.bnb {
  background: linear-gradient(135deg, #f3ba2f20, #f3ba2f10);
  color: #f3ba2f;
}

.coin-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.coin-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.coin-symbol {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.coin-data {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.coin-price {
  font-size: 0.875rem;
  font-weight: 600;
}

.coin-change {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.coin-change.pos {
  color: var(--accent);
}

.coin-change.neg {
  color: var(--negative);
}
</style>
