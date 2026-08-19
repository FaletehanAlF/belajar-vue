<script setup lang="ts">
defineProps<{
  size?: number
  text?: string
}>()
</script>

<template>
  <div class="loading-wrap">
    <div class="spinner" :style="{ width: (size ?? 32) + 'px', height: (size ?? 32) + 'px' }">
      <div class="spinner-ring" />
    </div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
}

.spinner {
  position: relative;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
</style>
