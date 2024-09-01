<template>
    <div class="max-w-7xl mx-auto py-12">
        <h1 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">All Events</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://via.placeholder.com/400x200" alt="Event image" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h5 class="text-lg font-bold mb-2">{{ event.eventName }}</h5>
                    <p class="text-gray-700 mb-4">{{ event.place }}</p>
                    <router-link :to="{ name: 'EventDetail', params: { id: event.id } }"
                        class="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                        Learn more
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const events = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/events');
        events.value = response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
    }
});
</script>
