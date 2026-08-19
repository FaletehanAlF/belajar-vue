<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, BarChart, Activity, Coins } from 'lucide-vue-next'
import type { StatItem } from '../types/crypto'

const props = defineProps<{
  title: string
  value: string
  change: string
  changeRaw: number
  icon: StatItem['icon']
  status: 'positive' | 'negative' | 'neutral'
  index?: number
}>()

const isPositive = computed(() => props.changeRaw > 0)
const isNegative = computed(() => props.changeRaw < 0)

const iconComponent = computed(() => {
  const map = {
    cap: Coins,
    volume: BarChart,
    dominance: Activity,
    active: TrendingUp,
  } as const
  return map[props.icon]
})

const changeColor = computed(() => {
  if (props.status === 'negative' || isNegative.value) return 'var(--negative)'
  if (props.status === 'neutral') return 'var(--warning)'
  return 'var(--accent)'
})

const animDelay = computed(() => `${(props.index ?? 0) * 0.08}s`)
</script>

<template>
  <div class="stat-card" :style="{ animationDelay: animDelay }">
    <div class="stat-header">
      <div class="stat-icon" :class="status">
        <component :is="iconComponent" :size="16" />
      </div>
      <span class="stat-title">{{ title }}</span>
    </div>
    <div class="stat-value mono">{{ value }}</div>
    <div class="stat-change" :style="{ color: changeColor }">
      <TrendingUp v-if="isPositive" :size="14" />
      <TrendingDown v-else-if="isNegative" :size="14" />
      <span class="mono">{{ change }}</span>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

.stat-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  transition: transform var(--transition);
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-icon.positive {
  color: var(--accent);
  background-color: var(--accent-bg);
}

.stat-icon.negative {
  color: var(--negative);
  background-color: var(--negative-bg);
}

.stat-icon.neutral {
  color: var(--warning);
  background-color: var(--warning-bg);
}

.stat-title {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.stat-change .mono {
  letter-spacing: -0.01em;
}
</style>
