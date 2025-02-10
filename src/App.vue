<!-- app.vue -->
<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="pt-10">
    <RouterView />
  </main>
</template>