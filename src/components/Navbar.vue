<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, Moon, Sun, X, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { cryptocurrencies } from '../data/crypto'
import type { Cryptocurrency } from '../types/crypto'

const isDark = ref(document.documentElement.classList.contains('dark'))
const activeNav = ref('Dashboard')
const navItems = ['Dashboard', 'Markets', 'Watchlist']
const showSearch = ref(false)
const searchQuery = ref('')

const searchResults = computed<Cryptocurrency[]>(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return cryptocurrencies.filter(
    (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
  )
})

function toggleTheme(): void {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function openSearch(): void {
  showSearch.value = true
  searchQuery.value = ''
}

function closeSearch(): void {
  showSearch.value = false
  searchQuery.value = ''
}

function handleKeydown(e: KeyboardEvent): void {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (showSearch.value) {
      closeSearch()
    } else {
      openSearch()
    }
  }
  if (e.key === 'Escape' && showSearch.value) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="brand">
        <div class="brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12 L7 12 L9 6 L13 18 L15 12 L21 12" />
          </svg>
        </div>
        <span class="brand-name">CryptoFlow</span>
      </div>

      <nav class="nav-links">
        <button
          v-for="item in navItems"
          :key="item"
          class="nav-link"
          :class="{ active: activeNav === item }"
          @click="activeNav = item"
        >
          {{ item }}
        </button>
      </nav>

      <div class="nav-actions">
        <button class="icon-btn search-trigger" aria-label="Search" @click="openSearch">
          <Search :size="18" />
          <span class="search-shortcut mono">⌘K</span>
        </button>
        <button class="icon-btn" aria-label="Toggle theme" @click="toggleTheme">
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button class="profile-btn" aria-label="Profile">
          <div class="profile-avatar">A</div>
          <span>Admin</span>
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showSearch" class="search-overlay" @click.self="closeSearch">
        <div class="search-modal animate-scale-in">
          <div class="search-input-wrap">
            <Search :size="18" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search cryptocurrencies..."
              class="search-input"
              autofocus
            />
            <button class="search-close" @click="closeSearch">
              <X :size="16" />
            </button>
          </div>
          <div v-if="searchResults.length > 0" class="search-results">
            <button
              v-for="coin in searchResults"
              :key="coin.id"
              class="search-result-item"
              @click="closeSearch"
            >
              <div class="result-logo">{{ coin.symbol.charAt(0) }}</div>
              <div class="result-info">
                <span class="result-name">{{ coin.name }}</span>
                <span class="result-symbol mono">{{ coin.symbol }}</span>
              </div>
              <div class="result-price">
                <span class="mono">${{ coin.price.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}</span>
                <span
                  class="result-change mono"
                  :class="coin.change24h >= 0 ? 'pos' : 'neg'"
                >
                  <TrendingUp v-if="coin.change24h >= 0" :size="12" />
                  <TrendingDown v-else :size="12" />
                  {{ coin.change24h >= 0 ? '+' : '' }}{{ coin.change24h }}%
                </span>
              </div>
            </button>
          </div>
          <div v-else-if="searchQuery.trim()" class="search-empty">
            <p>No results for "{{ searchQuery }}"</p>
          </div>
          <div v-else class="search-hints">
            <p class="hints-label">Quick search</p>
            <p class="hints-text">Type a coin name or symbol to search</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.navbar {
  width: 100%;
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background-color: color-mix(in srgb, var(--surface) 85%, transparent);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 60px;
  max-width: 1400px;
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--accent), var(--brand));
  color: #fff;
  border-radius: 10px;
  transition: transform var(--transition);
}

.brand:hover .brand-mark {
  transform: rotate(-5deg) scale(1.05);
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 7px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-pill);
  transition: color var(--transition), background-color var(--transition);
}

.nav-link:hover {
  color: var(--text-primary);
  background-color: var(--surface-2);
}

.nav-link.active {
  color: var(--text-primary);
  background-color: var(--surface-2);
  font-weight: 600;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: color var(--transition), background-color var(--transition), transform var(--transition);
}

.icon-btn:hover {
  color: var(--text-primary);
  background-color: var(--surface-2);
  transform: scale(1.05);
}

.search-trigger {
  width: auto;
  gap: 6px;
  padding: 0 10px;
}

.search-shortcut {
  font-size: 0.6875rem;
  color: var(--text-secondary);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 5px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  background-color: var(--surface-2);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition), transform var(--transition);
}

.profile-btn:hover {
  background-color: var(--border);
  transform: scale(1.02);
}

.profile-avatar {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--brand), var(--accent));
  color: #fff;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Search Modal */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
}

.search-modal {
  width: 520px;
  max-width: 90vw;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.search-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-primary);
  font-family: var(--font-sans);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--text-secondary);
  border-radius: 6px;
  transition: all var(--transition);
}

.search-close:hover {
  background-color: var(--surface-2);
  color: var(--text-primary);
}

.search-results {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition);
  text-align: left;
}

.search-result-item:hover {
  background-color: var(--surface-2);
}

.result-logo {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.result-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.result-symbol {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.result-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-size: 0.875rem;
  font-weight: 500;
}

.result-change {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.result-change.pos {
  color: var(--accent);
}

.result-change.neg {
  color: var(--negative);
}

.search-empty,
.search-hints {
  padding: 24px 20px;
  text-align: center;
}

.search-empty p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.hints-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.hints-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 16px;
  }
  .nav-links {
    display: none;
  }
  .search-shortcut {
    display: none;
  }
  .profile-btn span {
    display: none;
  }
  .profile-btn {
    padding: 6px;
  }
}
</style>
