<template>
    <div v-if="topic" class="max-w-4xl mx-auto mt-8 px-8 py-6 ">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">{{ topic.title }}</h1>
        <p class="text-gray-700 text-lg leading-relaxed">{{ topic.content }}</p>
    </div>
    <div v-else>
        <p class="text-center py-6 text-pink-500">Loading topic details...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const topic = ref(null);

const fetchTopicDetails = async () => {
    console.log(route.params.id);
    try {
        const response = await fetch(`http://localhost:3000/topics/${route.params.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        topic.value = await response.json();
    } catch (error) {
        console.error('Failed to fetch topic details:', error.message);
    }
}

onMounted(fetchTopicDetails);
</script>
