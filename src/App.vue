<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const tambah = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>Belajar ref()</h1>

    <p>Nilai: {{ count }}</p>

    <button @click="tambah">
      Tambah
    </button>
  </div>
</template>