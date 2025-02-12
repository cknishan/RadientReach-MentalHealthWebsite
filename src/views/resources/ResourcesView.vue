<!-- src\views\resources\ResourcesView.vue -->
<template>
    <div class="px-4 py-12">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">Recent Mental Health Topics</h2>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RouterLink v-for="topic in topics" :key="topic.id" class="-top-0 bg-white p-6 rounded-lg shadow-md"
                    :to="{ name: 'TopicDetails', params: { id: topic.id } }">
                    <h3 class="text-lg font-semibold text-gray-900">{{ topic.title }}</h3>
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">{{ topic.content }}</p>
                    <div class="mt-2">
                        <span class="text-xs font-medium text-gray-500 mr-2" v-for="tag in topic.tags" :key="tag">
                            #{{ tag }}
                        </span>
                    </div>
                    <p class="mt-3 text-xs text-gray-400">
                        Created on: {{ new Date(topic.dateCreated).toLocaleDateString() }}
                    </p>
                </RouterLink>
            </div>
        </div>
        <div class="text-center mt-8">
            <router-link to="/resources/topics" class="text-lg text-blue-600 hover:text-blue-800 font-semibold">
                View All Topics
            </router-link>
        </div>
    </div>

    <MentalHealthResources />
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import MentalHealthResources from '@/components/MentalHealthResources.vue';
import db from '@/firebase/init.js'; // Adjust the import path if necessary

const topics = ref([]); // Define topics as a reactive reference

// Function to fetch the latest 6 topics from Firestore
const fetchTopics = async () => {
    try {
        // Create a query to order by dateCreated and limit to 6 topics
        const topicsQuery = query(
            collection(db, 'topics'),
            orderBy('dateCreated', 'desc'), // Order by dateCreated in descending order
            limit(6) // Limit to the 6 most recent topics
        );

        const querySnapshot = await getDocs(topicsQuery);
        topics.value = querySnapshot.docs.map(doc => ({
            id: doc.id, // Firestore auto-generated ID
            ...doc.data() // Spread the document's fields
        }));
    } catch (error) {
        console.error('Failed to fetch topics:', error.message);
    }
};

// Fetch topics data when the component is mounted
onMounted(fetchTopics);
</script>
