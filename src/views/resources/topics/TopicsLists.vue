<!-- src\views\resources\topics|TopicsLists.vue -->
<template>
    <div class="px-4 py-12">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">All Mental Health Topics</h2>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RouterLink v-for="topic in topics" :key="topic.id" class="-top-0 bg-white p-6 rounded-lg shadow-md"
                    :to="{ name: 'TopicDetails', params: { id: topic.id } }">
                    <h3 class="text-lg font-semibold text-gray-900">{{ topic.title }}</h3>
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">
                        {{ topic.content }}
                    </p>
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
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase/init.js'; // Adjust the import according to your project structure

const topics = ref([]); // Define topics as a reactive reference

// Function to fetch topics data from Firestore
const fetchTopics = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'topics'));
        topics.value = querySnapshot.docs.map(doc => ({
            id: doc.id,  // Firestore auto-generated ID
            ...doc.data()  // Spread the document's fields (title, content, tags, dateCreated)
        }));
    } catch (error) {
        console.error('Failed to fetch topics:', error.message);
    }
};

// Fetch topics data when the component is mounted
onMounted(fetchTopics);
</script>
