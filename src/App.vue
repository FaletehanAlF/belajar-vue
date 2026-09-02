<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = ref(false)

const login = () => {
  isLoggedIn.value = true
}

const logout = () => {
  isLoggedIn.value = false
}
</script>

<template>
  <div>
    <h1>Belajar v-if & v-else</h1>

    <div v-if="isLoggedIn">
      <h2>Selamat datang! 👋</h2>
      <p>Kamu sudah login.</p>

      <button @click="logout">
        Logout
      </button>
    </div>

    <div v-else>
      <h2>Silakan login</h2>
      <p>Kamu belum login.</p>

      <button @click="login">
        Login
      </button>
    </div>
  </div>
</template>