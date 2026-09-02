<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Belum ada aksi')

const klikTombol = () => {
  message.value = 'Tombol berhasil diklik!'
}
</script>

<template>
  <div>
    <h1>Belajar Event Handling</h1>

    <p>{{ message }}</p>

    <button @click="klikTombol">
      Klik Saya
    </button>
  </div>
</template>