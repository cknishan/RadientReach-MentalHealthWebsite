<!-- src/views/community/events/EventDetails -->

<template>
    <div class="mx-auto bg-gray-700 py-12 flex items-center justify-center px-8">
        <div class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
            <div class="w-full h-64 bg-cover rounded-t" :style="{ backgroundImage: 'url(' + event.imageUrl + ')' }">
            </div>
            <div class="flex flex-col w-full md:flex-row">
                <div
                    class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                    <div class="md:text-3xl">{{ eventDate.month }}</div>
                    <div class="md:text-6xl">{{ eventDate.day }}</div>
                    <div class="md:text-xl">{{ event.time }}</div>
                </div>
                <div class="p-4 font-normal text-gray-800 md:w-3/4">
                    <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{{ event.eventName }}
                    </h1>
                    <p class="leading-normal">{{ event.description }}</p>
                    <div class="flex flex-row items-center mt-4 text-gray-700">
                        <div class="w-1/2">{{ event.place }}</div>
                        <div class="w-1/2 flex justify-end">
                            <img :src="event.logoUrl" alt="Event logo" class="w-8">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-4xl mx-auto mt-8 px-8 py-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
            <p class="ml-2 text-lg font-semibold">
                Rating: {{ calculatedRating }} / 5.0 ({{ event.numberOfReviews }} reviews)
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/firebase/init.js';

const route = useRoute();
const event = ref({});
const newRating = ref(5);
const hoverRating = ref(0);
const feedbackMessage = ref('');

onMounted(async () => {
    await fetchEventDetails();
});

const fetchEventDetails = async () => {
    try {
        const docRef = doc(db, 'events', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            event.value = docSnap.data();
        } else {
            console.error("No such document!");
        }
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

const calculatedRating = computed(() => parseFloat(event.value.rating || 0).toFixed(1));
</script>

<style scoped></style>