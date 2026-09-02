<script setup lang="ts">
import { ref, watch } from 'vue'

const name = ref('')
const message = ref('Nama belum diisi')

watch(name, (newName) => {
  if (newName === '') {
    message.value = 'Nama belum diisi'
  } else {
    message.value = `Nama berubah menjadi: ${newName}`
  }
})
</script>

<template>
  <div>
    <h1>Belajar watch()</h1>

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
      {{ message }}
    </p>
  </div>
</template>