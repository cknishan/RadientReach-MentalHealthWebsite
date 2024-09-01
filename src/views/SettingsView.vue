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
    <div class="px-4 py-12 ">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>
            <button @click="logout"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                Logout
            </button>
        </div>
    </div>
</template>
