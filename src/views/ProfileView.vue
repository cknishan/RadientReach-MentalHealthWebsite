<!-- src\views\MergedProfileCheckinView.vue -->

<template>
    <div class="px-4 py-12">
        <h1 class="my-6 tracking-tight text-gray-900 sm:text-5xl text-center">Welcome {{ userData.username }} </h1>

        <!-- Mental Health Check-in Section -->
        <div class="container mx-auto p-4 max-w-4xl">
            <h1 class="text-3xl font-bold mb-8 text-center">Mood Check-in</h1>

            <div class="bg-white shadow-md rounded-lg mb-8 p-6">
                <h2 class="text-xl font-semibold mb-4">How are you feeling today?</h2>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label for="mood" class="block text-sm font-medium text-gray-700">Mood</label>
                        <div class="flex flex-wrap gap-4 mt-2">
                            <template v-for="(color, moodName) in moodColors" :key="moodName">
                                <label :for="moodName" class="flex items-center space-x-2">
                                    <input type="radio" :id="moodName" :value="moodName" v-model="mood"
                                        class="sr-only" />
                                    <span :class="[`px-4 py-2 rounded-full cursor-pointer text-white`, color]">
                                        {{ moodName }}
                                    </span>
                                </label>
                            </template>
                        </div>
                    </div>

                    <div>
                        <label for="intensity" class="block text-sm font-medium text-gray-700">Intensity</label>
                        <select id="intensity" v-model="intensity"
                            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option v-for="value in [1, 2, 3, 4, 5]" :key="value" :value="value">
                                {{ value }}
                            </option>
                        </select>
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Check In
                    </button>
                </form>
            </div>

            <div class="bg-white shadow-md rounded-lg">
                <h2 class="text-xl font-semibold p-6 border-b">Check-in History</h2>
                <div class="p-6">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mood</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Intensity
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="entry in currentEntries" :key="entry.id">
                                <td class="px-6 py-4 whitespace-nowrap">{{ entry.date }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="[`px-2 py-1 rounded-full text-white`, moodColors[entry.mood]]">
                                        {{ entry.mood }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ entry.intensity }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="flex justify-between items-center mt-4">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                            Previous
                        </button>
                        <span>Page {{ currentPage }} of {{ totalPages }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init.js';
import { AuthService } from '@/services/auth';

const userData = ref({});
const mood = ref('Neutral');
const intensity = ref(3);
const entries = ref([]);
const currentPage = ref(1);
const entriesPerPage = 5;

const moodColors = {
    Happy: 'bg-green-500',
    Neutral: 'bg-yellow-500',
    Sad: 'bg-blue-500',
    Angry: 'bg-red-500',
    Anxious: 'bg-purple-500',
};

onMounted(async () => {
    try {
        const userUID = await AuthService.getUID();
        if (userUID) {
            const docRef = doc(db, 'users', userUID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                userData.value = docSnap.data();
                console.log('User data fetched successfully:', userData.value);
            } else {
                console.error('No such document!');
            }
        } else {
            console.error('User UID not found.');
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
});

const handleSubmit = () => {
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        mood: mood.value,
        intensity: intensity.value,
    };
    entries.value = [newEntry, ...entries.value];
    mood.value = 'Neutral';
    intensity.value = 3;
};

const currentEntries = computed(() => {
    const start = (currentPage.value - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return entries.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(entries.value.length / entriesPerPage));

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
</script>