<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import StatCard from '../components/StatCard.vue'
import MarketChart from '../components/MarketChart.vue'
import TrendingCoins from '../components/TrendingCoins.vue'
import CryptoTable from '../components/CryptoTable.vue'
import { stats } from '../data/crypto'

const currentTime = ref(new Date().toLocaleTimeString('en-US', { hour12: false }))
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('en-US', { hour12: false })
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="dashboard">
    <Navbar />

    <main class="dashboard-main">
      <section class="dashboard-header">
        <div class="header-text">
          <h1 class="header-title">Crypto Dashboard</h1>
          <p class="header-subtitle">Track the latest cryptocurrency market movements in real-time.</p>
        </div>
        <div class="market-status">
          <span class="status-dot" />
          <span class="status-label">Market Open</span>
          <span class="status-time mono">{{ currentTime }}</span>
        </div>
      </section>

      <section class="stat-grid">
        <StatCard
          v-for="(stat, idx) in stats"
          :key="stat.id"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :change-raw="stat.changeRaw"
          :icon="stat.icon"
          :status="stat.status"
          :index="idx"
        />
      </section>

      <section class="chart-trending-grid">
        <MarketChart />
        <TrendingCoins />
      </section>

      <section class="table-section">
        <CryptoTable />
      </section>

      <footer class="dashboard-footer">
        <p>CryptoFlow Dashboard &mdash; Data is simulated for demonstration purposes.</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

.dashboard-main {
  padding: 32px 40px 48px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
  animation: fadeIn 0.5s ease-out;
}

.header-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.market-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.market-status:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--accent);
  border-radius: 50%;
  position: relative;
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: pulse-ring 2s ease-out infinite;
}

.status-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.status-time {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.chart-trending-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.table-section {
  width: 100%;
}

.dashboard-footer {
  margin-top: 40px;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid var(--border);
}

.dashboard-footer p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-trending-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard-main {
    padding: 20px 16px 32px;
  }
  .stat-grid {
    grid-template-columns: 1fr;
  }
  .header-title {
    font-size: 1.375rem;
  }
}
</style>
