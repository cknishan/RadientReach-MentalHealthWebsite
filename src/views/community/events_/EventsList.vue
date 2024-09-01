<template>
    <div>
        <h1>Upcoming Events</h1>
        <ul>
            <li v-for="event in events" :key="event.id">
                <router-link :to="{ name: 'EventDetail', params: { id: event.id } }">
                    {{ event.eventName }} - {{ event.place }}
                </router-link>
            </li>
        </ul>
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