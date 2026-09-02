<script setup lang="ts">
defineProps<{
  name: string
  role: string
  skill: string
}>()
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ role }}</p>
    <p>Skill: {{ skill }}</p>
  </div>
</template>