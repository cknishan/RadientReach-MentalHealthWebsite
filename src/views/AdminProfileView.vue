<!-- src\views\AdminProfileView.vue -->
<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow-md">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-3 px-4 text-left">User ID</th>
                        <th class="py-3 px-4 text-left">Name</th>
                        <th class="py-3 px-4 text-left">Email</th>
                        <th class="py-3 px-4 text-left">Role</th>
                        <th class="py-3 px-4 text-left">Mood Check-ins</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-100">
                        <td class="py-3 px-4">{{ user.id }}</td>
                        <td class="py-3 px-4">{{ user.username }}</td>
                        <td class="py-3 px-4">{{ user.email }}</td>
                        <td class="py-3 px-4">{{ user.role }}</td>
                        <td class="py-3 px-4">
                            {{ user.moodCheckIns ? user.moodCheckIns.length : 0 }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore'; // Firestore imports
import db from '../firebase/init';

const users = ref([]);

const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    users.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        moodCheckIns: doc.data().moodCheckIns || []
    }));
};

onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
/* Optional styling */
</style>
