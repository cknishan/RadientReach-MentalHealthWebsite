<!-- src\views\resources\topics\TopicDetails.vue -->

<template>
    <article v-if="topic" class="max-w-4xl mx-auto mt-8 px-8 py-6" aria-labelledby="topic-title">
        <h1 id="topic-title" class="text-3xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
            {{ topic.title }}
        </h1>

        <div class="flex justify-between align-top my-6">
            <p class="text-sm text-gray-400 " aria-live="polite">
                Created on: {{ new Date(topic.dateCreated).toLocaleDateString() }}
            </p>

            <button @click="readAloud" class=" text-theme-pink font-semibold rounded">
                📢 Read Aloud
            </button>
        </div>

        <p class="text-gray-700 text-lg leading-relaxed mb-4">
            {{ topic.content }}
        </p>

        <div class="flex flex-wrap items-center mt-4" aria-label="Tags">
            <span v-for="tag in topic.tags" :key="tag" class="text-sm font-medium text-gray-500 mr-2 mb-2">
                #{{ tag }}
            </span>
        </div>


    </article>

    <div v-else>
        <p class="text-center py-6 text-pink-500" role="alert" aria-live="assertive">
            Loading topic details...
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/firebase/init.js';

const route = useRoute();
const topic = ref(null);

// Fetch topic details when the component is mounted
const fetchTopicDetails = async () => {
    try {
        const docRef = doc(db, 'topics', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            topic.value = docSnap.data();
        } else {
            console.error('No such document!');
        }
    } catch (error) {
        console.error('Failed to fetch topic details:', error.message);
    }
};

onMounted(fetchTopicDetails);

// Text-to-Speech Function
const readAloud = () => {
    if (!topic.value) return;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${topic.value.title}. ${topic.value.content}. Created on ${new Date(
        topic.value.dateCreated
    ).toLocaleDateString()}.`;

    utterance.lang = 'en-US'; // Set the language
    utterance.pitch = 1; // Set pitch (0.1 to 2)
    utterance.rate = 1; // Set rate of speech (0.1 to 10)

    speechSynthesis.speak(utterance);
};
</script>
