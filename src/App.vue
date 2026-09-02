<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`.trim()
})
</script>

<template>
  <div>
    <h1>Belajar Computed</h1>

    <div>
      <label for="firstName">
        Nama Depan:
      </label>

      <input
        id="firstName"
        v-model="firstName"
        type="text"
        placeholder="Nama depan"
      >
    </div>

    <br>

    <div>
      <label for="lastName">
        Nama Belakang:
      </label>

      <input
        id="lastName"
        v-model="lastName"
        type="text"
        placeholder="Nama belakang"
      >
    </div>

    <h2>
      Nama Lengkap: {{ fullName }}
    </h2>
  </div>
</template>