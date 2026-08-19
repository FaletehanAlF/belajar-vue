<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import type { TimeFilter } from '../types/crypto'
import { bitcoinChartData } from '../data/crypto'

const filters: TimeFilter[] = ['1H', '1D', '1W', '1M', '1Y']
const activeFilter = ref<TimeFilter>('1D')
const hoveredIndex = ref<number | null>(null)

const filterDataMap: Record<TimeFilter, number[]> = {
  '1H': bitcoinChartData.slice(-6),
  '1D': bitcoinChartData,
  '1W': bitcoinChartData.map((v, i) => v - Math.sin(i * 0.5) * 800),
  '1M': bitcoinChartData.map((v, i) => v - Math.sin(i * 0.3) * 2000 + i * 150),
  '1Y': Array.from({ length: 12 }, (_, i) => 42000 + i * 5500 + Math.sin(i) * 3000),
}

const chartData = computed(() => filterDataMap[activeFilter.value])

const currentPrice = computed(() => chartData.value[chartData.value.length - 1])
const firstPrice = computed(() => chartData.value[0])
const priceChange = computed(() => {
  const change = ((currentPrice.value - firstPrice.value) / firstPrice.value) * 100
  return parseFloat(change.toFixed(2))
})

const chartWidth = 800
const chartHeight = 280
const padding = { top: 20, right: 20, bottom: 30, left: 50 }

const minVal = computed(() => Math.min(...chartData.value))
const maxVal = computed(() => Math.max(...chartData.value))
const range = computed(() => maxVal.value - minVal.value || 1)

const points = computed(() => {
  const innerW = chartWidth - padding.left - padding.right
  const innerH = chartHeight - padding.top - padding.bottom
  return chartData.value.map((val, i) => {
    const x = padding.left + (i / (chartData.value.length - 1)) * innerW
    const y = padding.top + innerH - ((val - minVal.value) / range.value) * innerH
    return { x, y }
  })
})

const linePath = computed(() => {
  return points.value
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
})

const areaPath = computed(() => {
  const base = chartHeight - padding.bottom
  const pts = points.value
  return `${linePath.value} L ${pts[pts.length - 1].x.toFixed(1)} ${base} L ${pts[0].x.toFixed(1)} ${base} Z`
})

const yTicks = computed(() => {
  const ticks: number[] = []
  for (let i = 0; i <= 4; i++) {
    ticks.push(minVal.value + (range.value * i) / 4)
  }
  return ticks
})

const hoveredPoint = computed(() => {
  if (hoveredIndex.value === null) return null
  return points.value[hoveredIndex.value] ?? null
})

const hoveredPrice = computed(() => {
  if (hoveredIndex.value === null) return null
  return chartData.value[hoveredIndex.value] ?? null
})

function formatPrice(val: number): string {
  return '$' + val.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function onMouseMove(e: MouseEvent): void {
  const svg = e.currentTarget as SVGSVGElement
  const rect = svg.getBoundingClientRect()
  const mouseX = ((e.clientX - rect.left) / rect.width) * chartWidth
  const innerW = chartWidth - padding.left - padding.right
  const ratio = (mouseX - padding.left) / innerW
  const idx = Math.round(ratio * (chartData.value.length - 1))
  hoveredIndex.value = Math.max(0, Math.min(chartData.value.length - 1, idx))
}

function onMouseLeave(): void {
  hoveredIndex.value = null
}
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <div class="chart-title-block">
        <div class="chart-asset">
          <div class="coin-badge">₿</div>
          <div>
            <h3 class="chart-title">Bitcoin</h3>
            <span class="chart-pair mono">BTC/USD</span>
          </div>
        </div>
      </div>
      <div class="chart-price-block">
        <span class="chart-price mono">
          ${{ currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </span>
        <span class="chart-change" :class="priceChange >= 0 ? 'pos' : 'neg'">
          <TrendingUp v-if="priceChange >= 0" :size="14" />
          <TrendingDown v-else :size="14" />
          <span class="mono">{{ priceChange >= 0 ? '+' : '' }}{{ priceChange }}%</span>
        </span>
      </div>
    </div>

    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f"
        class="filter-btn"
        :class="{ active: activeFilter === f }"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <div class="chart-svg-wrap">
      <svg
        :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
        preserveAspectRatio="none"
        class="chart-svg"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <defs>
          <linearGradient id="grad-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="priceChange >= 0 ? '#10b981' : '#ef4444'" stop-opacity="0.2" />
            <stop offset="100%" :stop-color="priceChange >= 0 ? '#10b981' : '#ef4444'" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="grid-lines">
          <line
            v-for="(_, i) in yTicks"
            :key="i"
            :x1="padding.left"
            :x2="chartWidth - padding.right"
            :y1="padding.top + ((chartHeight - padding.top - padding.bottom) * i) / 4"
            :y2="padding.top + ((chartHeight - padding.top - padding.bottom) * i) / 4"
          />
        </g>

        <g class="axis-labels">
          <text
            v-for="(tick, i) in yTicks"
            :key="i"
            :x="padding.left - 10"
            :y="padding.top + ((chartHeight - padding.top - padding.bottom) * i) / 4 + 4"
            text-anchor="end"
            class="axis-text"
          >
            {{ formatPrice(tick) }}
          </text>
        </g>

        <path :d="areaPath" fill="url(#grad-area)" />
        <path
          :d="linePath"
          fill="none"
          :stroke="priceChange >= 0 ? '#10b981' : '#ef4444'"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="chart-line"
        />

        <g v-if="hoveredPoint" class="hover-group">
          <line
            :x1="hoveredPoint.x"
            :x2="hoveredPoint.x"
            :y1="padding.top"
            :y2="chartHeight - padding.bottom"
            stroke="var(--text-secondary)"
            stroke-width="1"
            stroke-dasharray="4 4"
            opacity="0.4"
          />
          <circle
            :cx="hoveredPoint.x"
            :cy="hoveredPoint.y"
            r="5"
            :fill="priceChange >= 0 ? '#10b981' : '#ef4444'"
            stroke="var(--surface)"
            stroke-width="2"
            class="hover-dot"
          />
          <rect
            :x="hoveredPoint.x - 40"
            :y="hoveredPoint.y - 32"
            width="80"
            height="24"
            rx="6"
            fill="var(--surface-2)"
            stroke="var(--border)"
            stroke-width="1"
          />
          <text
            :x="hoveredPoint.x"
            :y="hoveredPoint.y - 16"
            text-anchor="middle"
            class="hover-label"
          >
            {{ hoveredPrice ? formatPrice(hoveredPrice) : '' }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
  transition: border-color var(--transition);
}

.chart-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}

.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.chart-asset {
  display: flex;
  align-items: center;
  gap: 12px;
}

.coin-badge {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7931a, #f2a900);
  color: #fff;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 1.25rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.chart-pair {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.chart-price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.chart-price {
  font-size: 1.5rem;
  font-weight: 600;
}

.chart-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.chart-change.pos {
  color: var(--accent);
}

.chart-change.neg {
  color: var(--negative);
}

.filter-row {
  display: flex;
  gap: 4px;
}

.filter-btn {
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: var(--radius-pill);
  transition: color var(--transition), background-color var(--transition), transform var(--transition);
}

.filter-btn:hover {
  color: var(--text-primary);
  transform: scale(1.05);
}

.filter-btn.active {
  color: #fff;
  background-color: var(--accent);
}

.chart-svg-wrap {
  width: 100%;
}

.chart-svg {
  width: 100%;
  height: 280px;
  display: block;
  cursor: crosshair;
}

.grid-lines line {
  stroke: var(--border);
  stroke-width: 1;
}

.axis-text {
  fill: var(--text-secondary);
  font-size: 11px;
  font-family: var(--font-mono);
}

.chart-line {
  filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
}

.hover-dot {
  filter: drop-shadow(0 0 6px currentColor);
}

.hover-label {
  fill: var(--text-primary);
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
}

@media (max-width: 768px) {
  .chart-svg {
    height: 200px;
  }
}
</style>
