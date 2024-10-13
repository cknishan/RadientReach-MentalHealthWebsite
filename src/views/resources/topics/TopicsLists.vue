<!-- src\views\resources\topics|TopicsLists.vue -->
<template>
    <div class="px-4 py-12">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">All Mental Health Topics</h2>

            <!-- Filters and Controls -->
            <div class="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <input type="text" v-model="searchTitle" placeholder="Search by title"
                    class="rounded-md border-gray-300 shadow-sm w-full md:w-auto" />

                <select v-model="selectedTag" class="rounded-md border-gray-300 shadow-sm">
                    <option value="">All Tags</option>
                    <option v-for="tag in uniqueTags" :key="tag" :value="tag">
                        {{ tag }}
                    </option>
                </select>

                <select v-model="sortOrder" class="rounded-md border-gray-300 shadow-sm">
                    <option value="desc">Newest</option>
                    <option value="asc">Oldest</option>
                </select>

                <button @click="toggleView"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Switch to {{ isCardView ? 'List' : 'Card' }} View
                </button>
            </div>

            <!-- Topic Display -->
            <div v-if="isCardView" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RouterLink v-for="topic in paginatedTopics" :key="topic.id"
                    class="-top-0 bg-white p-6 rounded-lg shadow-md"
                    :to="{ name: 'TopicDetails', params: { id: topic.id } }">
                    <h3 class="text-lg font-semibold text-gray-900">{{ topic.title }}</h3>
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">{{ topic.content }}</p>
                    <div class="mt-2">
                        <span v-for="tag in topic.tags" :key="tag" class="text-xs font-medium text-gray-500 mr-2">
                            #{{ tag }}
                        </span>
                    </div>
                    <p class="mt-3 text-xs text-gray-400">
                        Created on: {{ new Date(topic.dateCreated).toLocaleDateString() }}
                    </p>
                </RouterLink>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tags
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date Created
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="topic in paginatedTopics" :key="topic.id">
                            <td class="px-6 py-4 whitespace-nowrap">{{ topic.title }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span v-for="tag in topic.tags" :key="tag" class="text-xs text-gray-500 mr-2">
                                    #{{ tag }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {{ new Date(topic.dateCreated).toLocaleDateString() }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-between items-center mt-6">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '@/firebase/init.js'; // Adjust according to your project structure

const topics = ref([]);
const currentPage = ref(1);
const topicsPerPage = 9;
const searchTitle = ref('');
const selectedTag = ref('');
const sortOrder = ref('desc');
const isCardView = ref(true); // Default to card view

// Fetch topics from Firestore
const fetchTopics = async () => {
    try {
        const topicsQuery = query(collection(db, 'topics'));
        const querySnapshot = await getDocs(topicsQuery);
        topics.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Failed to fetch topics:', error.message);
    }
};

onMounted(fetchTopics);

const filteredTopics = computed(() => {
    let filtered = topics.value;

    if (searchTitle.value) {
        filtered = filtered.filter((topic) =>
            topic.title.toLowerCase().includes(searchTitle.value.toLowerCase())
        );
    }

    if (selectedTag.value) {
        filtered = filtered.filter((topic) => topic.tags.includes(selectedTag.value));
    }

    return filtered.sort((a, b) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);

        return sortOrder.value === 'desc'
            ? dateB - dateA // Newest first
            : dateA - dateB; // Oldest first
    });

});

const paginatedTopics = computed(() => {
    const start = (currentPage.value - 1) * topicsPerPage;
    return filteredTopics.value.slice(start, start + topicsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredTopics.value.length / topicsPerPage));

const uniqueTags = computed(() => {
    const tags = new Set();
    topics.value.forEach((topic) => topic.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
});

const toggleView = () => {
    isCardView.value = !isCardView.value;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>
