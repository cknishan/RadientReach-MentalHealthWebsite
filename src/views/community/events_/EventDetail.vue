<!-- src/views/community/events/EventDetails.vue -->

<template>
    <div class="max-w-4xl mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Event Image -->
            <!-- <div class="h-64 bg-cover bg-center" :style="{ backgroundImage: `url(${event.imageUrl})` }"></div> -->
            <div class="h-64 bg-cover bg-center" :style="{ backgroundImage: `url(${event.imageUrl})` }"></div>

            <!-- Event Details -->
            <div class="p-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ event.eventName }}</h1>
                <div class="flex items-center text-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>{{ formatDate(event.date) }}</span>
                </div>
                <div class="flex items-center text-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>{{ event.place }}</span>
                </div>
                <p class="text-gray-700 mb-6">{{ event.description }}</p>
                <img :src="event.logoUrl" alt="Event logo" class="h-8 mb-4">
            </div>

            <!-- Rating Section -->
            <div class="bg-gray-50 p-6 border-t border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Rate this Event</h2>
                <div class="flex items-center">
                    <div class="flex space-x-1">
                        <button v-for="star in 5" :key="star" @click="rateEvent(star)" @mouseover="hoverRating = star"
                            @mouseleave="hoverRating = 0" class="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                :fill="(hoverRating >= star || newRating >= star) ? 'currentColor' : 'none'"
                                :stroke="(hoverRating >= star || newRating >= star) ? 'currentColor' : 'currentColor'"
                                class="w-8 h-8"
                                :class="(hoverRating >= star || newRating >= star) ? 'text-yellow-400' : 'text-gray-400'">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    </div>
                    <button @click="submitRating"
                        class="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                        Submit Rating
                    </button>
                </div>
                <p v-if="feedbackMessage" class="mt-2 text-sm"
                    :class="{ 'text-green-500': !error, 'text-red-500': error }">{{ feedbackMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '@/firebase/init.js';

const route = useRoute();
const event = ref({});
const newRating = ref(0);
const hoverRating = ref(0);
const feedbackMessage = ref('');
const error = ref(false);

onMounted(fetchEventDetails);

async function fetchEventDetails() {
    try {
        const docRef = doc(db, 'events', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            event.value = docSnap.data();
        } else {
            console.error("No such document!");
            feedbackMessage.value = "Event not found.";
            error.value = true;
        }
    } catch (error) {
        console.error("Error fetching event details:", error);
        feedbackMessage.value = "Failed to load event details.";
        error.value = true;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const auth = getAuth();

async function submitRating() {
    const user = auth.currentUser;
    if (!user) {
        feedbackMessage.value = 'You must be logged in to submit a rating.';
        error.value = true;
        return;
    }

    if (newRating.value === 0) {
        feedbackMessage.value = 'Please select a rating before submitting.';
        error.value = true;
        return;
    }

    try {
        await addDoc(collection(db, 'reviews'), {
            userId: user.uid,
            eventId: route.params.id,
            rating: newRating.value
        });

        feedbackMessage.value = "Rating submitted successfully!";
        error.value = false;
    } catch (error) {
        console.error("Error submitting rating:", error);
        feedbackMessage.value = "Failed to submit rating.";
        error.value = true;
    }
}

function rateEvent(star) {
    newRating.value = star;
}
</script>