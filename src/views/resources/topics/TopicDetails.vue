<!-- src\views\resources\topics\TopicDetails.vue -->

<template>
    <div v-if="topic" class="max-w-4xl mx-auto mt-8 px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 border-b-2 pb-2">{{ topic.title }}</h1>

        <p class="text-gray-700 text-lg leading-relaxed mb-4">{{ topic.content }}</p>

        <div class="flex flex-wrap items-center mt-4">
            <span v-for="tag in topic.tags" :key="tag" class="text-sm font-medium text-gray-500 mr-2 mb-2">
                #{{ tag }}
            </span>
        </div>

        <p class="text-sm text-gray-400 mt-6">
            Created on: {{ new Date(topic.dateCreated).toLocaleDateString() }}
        </p>
    </div>

    <div v-else>
        <p class="text-center py-6 text-pink-500">Loading topic details...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/firebase/init.js'; // Adjust the import according to your setup

const route = useRoute();
const topic = ref(null);

const fetchTopicDetails = async () => {
    try {
        const docRef = doc(db, 'topics', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            topic.value = docSnap.data(); // Set topic with Firestore data
        } else {
            console.error('No such document!');
        }
    } catch (error) {
        console.error('Failed to fetch topic details:', error.message);
    }
};

// Fetch topic details when the component is mounted
onMounted(fetchTopicDetails);
</script>
