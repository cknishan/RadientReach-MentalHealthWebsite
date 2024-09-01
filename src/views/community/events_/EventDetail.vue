<template>
    <div class="mx-auto bg-gray-700 h-screen flex items-center justify-center px-8">
        <div class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
            <!-- Using a dummy background image -->
            <div class="w-full h-64 bg-top bg-cover rounded-t"
                style="background-image: url('https://via.placeholder.com/600x300')"></div>
            <div class="flex flex-col w-full md:flex-row">
                <!-- Date and Time Block -->
                <div
                    class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                    <div class="md:text-3xl">{{ eventDate.month }}</div>
                    <div class="md:text-6xl">{{ eventDate.day }}</div>
                    <div class="md:text-xl">{{ formattedTime }}</div>
                </div>
                <!-- Event Description Block -->
                <div class="p-4 font-normal text-gray-800 md:w-3/4">
                    <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{{ event.eventName }}
                    </h1>
                    <p class="leading-normal">{{ event.description }}</p>
                    <div class="flex flex-row items-center mt-4 text-gray-700">
                        <div class="w-1/2">
                            {{ event.place }}
                        </div>
                        <div class="w-1/2 flex justify-end">
                            <!-- Using a dummy logo image -->
                            <img src="https://via.placeholder.com/50" alt="Event Logo" class="w-8">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const event = ref({});

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/events/${route.params.id}`);
        event.value = response.data;
    } catch (error) {
        console.error("Error fetching event details:", error);
    }
});

const eventDate = computed(() => {
    const d = new Date(event.value.date || new Date());
    return {
        month: d.toLocaleString('default', { month: 'short' }), // "Jan"
        day: d.getDate(), // 13
    };
});

const formattedTime = computed(() => {
    return event.value.time || '7 pm'; // Default time if not specified
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>