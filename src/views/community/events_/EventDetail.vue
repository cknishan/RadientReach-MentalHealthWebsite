<template>
    <div>
        <h1>{{ event.eventName }}</h1>
        <p>{{ event.description }}</p>
        <p>Average Rating: {{ event.rating }} (based on {{ event.numberOfRatings }} ratings)</p>
        <input type="number" v-model="userRating" min="1" max="5" step="0.1" placeholder="Your rating" />
        <button @click="submitRating">Submit Rating</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const event = ref({});
const userRating = ref('');

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/events/${route.params.id}`);
        event.value = response.data;
    } catch (error) {
        console.error("Error fetching event details:", error);
    }
});

const submitRating = async () => {
    const totalRating = event.value.rating * event.value.numberOfRatings + parseFloat(userRating.value);
    const newNumberOfRatings = event.value.numberOfRatings + 1;
    const newAverageRating = totalRating / newNumberOfRatings;

    try {
        await axios.patch(`http://localhost:3000/events/${event.value.id}`, {
            rating: newAverageRating,
            numberOfRatings: newNumberOfRatings
        });
        event.value.rating = newAverageRating;
        event.value.numberOfRatings = newNumberOfRatings;
    } catch (error) {
        console.error("Error updating event rating:", error);
    }
};
</script>