<template>

    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Restricted Access</h1>
            <p class="mt-6 text-xl leading-7 text-theme-pink">Please log in with your Account to access this page</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <RouterLink class="py-2 px-6 bg-theme-green rounded-md text-lg weight-bold" :to="{ name: 'Login' }">
                    Go to Login
                </RouterLink>
            </div>
        </div>
    </main>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>