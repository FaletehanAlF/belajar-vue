<script setup lang="ts">
import { ref } from 'vue'

const imageUrl = ref('https://picsum.photos/300/200')
const imageAlt = ref('Gambar random')

const ubahGambar = () => {
  imageUrl.value = 'https://picsum.photos/400/250'
}

const website = ref('https://github.com')

</script>

<template>
  <div>
    <h1>Belajar v-bind</h1>

    <img
      :src="imageUrl"
      :alt="imageAlt"
    >

    <br><br>

    <button @click="ubahGambar">
      Ubah Gambar
    </button>
  </div>

  <a :href="website" target="_blank">
  Buka GitHub
</a>
</template>