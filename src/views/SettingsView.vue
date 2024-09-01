<!-- src\views\SettingsView.vue -->

<script setup>
import { AuthService } from '@/services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    AuthService.logout();
    router.push({ name: 'Login' });
}
</script>

<template>
    <h1>Settings</h1>
    <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
</template>