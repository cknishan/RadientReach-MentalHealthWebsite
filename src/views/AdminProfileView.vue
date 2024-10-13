<!-- src\views\AdminProfileView.vue -->


<template>
    <div class="px-4 py-12 ">
        <h1 class="my-6  text-gray-900 sm:text-5xl text-center">Admin Profile</h1>

        <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl text-gray-900 mb-4"><strong>Name:</strong> {{ userData.username }}</h1>
            <h1 class="text-2xl text-gray-900 mb-4"><strong>Email:</strong> {{ userData.email }}</h1>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const userData = ref({});

onMounted(async () => {
    try {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const response = await axios.get(`http://localhost:3000/users?username=${loggedInUser.username}`);
        userData.value = response.data[0];
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
});
</script>