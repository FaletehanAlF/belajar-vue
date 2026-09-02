<script setup lang="ts">
const fruits = [
  'Apel',
  'Pisang',
  'Jeruk',
  'Mangga',
  'Anggur'
]
</script>

<template>
  <div>
    <h1>Belajar v-for</h1>

    <h2>Daftar Buah</h2>

    <ul>
      <li v-for="fruit in fruits" :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </div>
</template>