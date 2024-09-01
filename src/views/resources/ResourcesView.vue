<!-- src\views\resources\ResourcesView.vue -->

<template>
    <div class="px-4 py-12 ">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl">Mental Health Essentials</h2>

            <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RouterLink v-for="topic in topics" :key="topic.id" class="-top-0 bg-white p-6 rounded-lg shadow-md"
                    :to="{ name: 'TopicDetails', params: { id: topic.id } }">
                    <h3 class="text-lg font-semibold text-gray-900">{{ topic.title }}</h3>
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">
                        {{ topic.content }}
                    </p>
                </RouterLink>
            </div>

        </div>
    </div>
</template>


<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';

// Define the jobs as a reactive reference
const topics = ref([]);

// Function to fetch topics data from the server
const fetchtopics = () => {
    fetch('http://localhost:3000/topics')
        .then(response => response.json())
        .then(data => {
            topics.value = data;
        })
        .catch(error => {
            console.error('Failed to fetch topics:', error.message);
        });
}

// Fetch topics data when component is mounted
onMounted(fetchtopics);
</script>