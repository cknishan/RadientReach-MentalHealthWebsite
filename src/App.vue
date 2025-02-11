<!-- app.vue -->
<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Disclaimer from './components/Disclaimer.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="pt-10">
    <RouterView />
    <Disclaimer />
  </main>
</template>