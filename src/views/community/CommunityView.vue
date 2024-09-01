<template>
    <div class="max-w-7xl mx-auto  p-4 px-4 py-12 ">
        <h1 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">Upcoming Events</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="event in events.slice(0, 3)" :key="event.id" class="bg-white rounded-lg shadow-lg">
                <img :src="event.imageUrl || 'https://via.placeholder.com/400x200'" alt="Event image"
                    class="w-full h-48 object-cover">
                <div class="p-4">
                    <h5 class="text-lg font-bold mb-2">{{ event.eventName }}</h5>
                    <p class="text-gray-700">{{ event.place }}</p>
                    <router-link :to="{ name: 'EventDetail', params: { id: event.id } }"
                        class="text-blue-500 hover:text-blue-800 transition duration-300 ease-in-out">
                        Learn more
                    </router-link>
                </div>
            </div>
        </div>
        <div class="text-center mt-8">
            <router-link to="/events" class="text-lg text-blue-600 hover:text-blue-800 font-semibold">
                View All Events
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

<style scoped>
/* Additional custom styles if needed */
</style>
