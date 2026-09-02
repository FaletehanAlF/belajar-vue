<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <div>
    <h1>Belajar v-model</h1>

    <label for="name">
      Nama:
    </label>

    <input
      id="name"
      v-model="name"
      type="text"
      placeholder="Masukkan nama"
    >

    <p>
      Halo, {{ name || 'Guest' }}!
    </p>
  </div>
</template>