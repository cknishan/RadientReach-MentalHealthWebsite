<template>
    <div class="mx-auto bg-gray-700 py-12 flex items-center justify-center px-8">
        <div class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
            <!-- Dynamic background image from event data -->
            <div class="w-full h-64 bg-cover rounded-t" :style="{ backgroundImage: 'url(' + event.imageUrl + ')' }">
            </div>
            <div class="flex flex-col w-full md:flex-row">
                <!-- Date and Time Block -->
                <div
                    class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                    <div class="md:text-3xl">{{ eventDate.month }}</div>
                    <div class="md:text-6xl">{{ eventDate.day }}</div>
                    <div class="md:text-xl">{{ event.time }}</div>
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
                            <img :src="event.logoUrl" alt="" class="w-8">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Rating Section with Slider -->
    <div class="max-w-4xl mx-auto mt-8 px-8 py-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
            <StarIcon class="w-5 h-5 text-yellow-400" />
            <p class="ml-2 text-lg font-semibold">Rating: {{ calculatedRating }} / 5.0 ({{ event.numberOfReviews }}
                reviews)</p>
        </div>
        <div class="mt-4 p-4 bg-white shadow rounded-lg">
            <div class="flex items-center space-x-2">
                <!-- Slider for rating -->
                <input type="range" v-model="newRating" min="1" max="5" step="0.5"
                    class="slider bg-blue-500 rounded-lg cursor-pointer" />
                <span class="text-lg">{{ newRating }}</span>
                <StarIcon class="w-5 h-5 text-yellow-400" />
                <button @click="addReview"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline">
                    Add Review
                </button>
                <button @click="removeReview" :disabled="event.numberOfReviews === 0"
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline disabled:opacity-50">
                    Remove Last Review
                </button>
            </div>
            <p v-if="feedbackMessage" class="text-sm mt-2 text-gray-600">{{ feedbackMessage }}</p>
        </div>
        <p class="py-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. ... </p>
    </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/outline';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const event = ref({});
const newRating = ref(5); // Default new review rating
const feedbackMessage = ref('');

onMounted(async () => {
    await fetchEventDetails();
});

const fetchEventDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/events/${route.params.id}`);
        event.value = response.data;
    } catch (error) {
        console.error("Error fetching event details:", error);
    }
};

const eventDate = computed(() => {
    const d = new Date(event.value.date || new Date());
    return {
        month: d.toLocaleString('default', { month: 'short' }),
        day: d.getDate(),
    };
});

const calculatedRating = computed(() => parseFloat(event.value.rating).toFixed(1));

const updateEventRating = async () => {
    try {
        await axios.patch(`http://localhost:3000/events/${event.value.id}`, {
            rating: event.value.rating,
            numberOfReviews: event.value.numberOfReviews
        });
        feedbackMessage.value = "Event rating updated successfully!";
    } catch (error) {
        console.error("Error updating event rating:", error);
        feedbackMessage.value = "Failed to update rating.";
    }
};

const addReview = async () => {
    const totalRating = event.value.rating * event.value.numberOfReviews + parseFloat(newRating.value);
    event.value.numberOfReviews++;
    event.value.rating = totalRating / event.value.numberOfReviews;
    await updateEventRating();
};

const removeReview = async () => {
    if (event.value.numberOfReviews > 1) {
        const totalRating = event.value.rating * event.value.numberOfReviews - parseFloat(newRating.value);
        event.value.numberOfReviews--;
        event.value.rating = totalRating / event.value.numberOfReviews;
    } else if (event.value.numberOfReviews === 1) {
        event.value.numberOfReviews = 0;
        event.value.rating = 0; // Reset rating if last review is removed
    }
    await updateEventRating();
};
</script>


<style scoped>
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #4CAF50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #4CAF50;
    cursor: pointer;
}
</style>
