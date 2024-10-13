<!-- src\views\ProfileSettingsView.vue -->

<template>
    <div class="px-4 py-12">
        <h1 class="my-6 tracking-tight text-gray-900 text-5xl text-center">Account Settings</h1>

        <div class="max-w-7xl mx-auto">
            <!-- User Profile Section -->
            <div class="mb-8">
                <h1 class="sm:text-2xl text-gray-900 mb-4"><strong>Name:</strong> {{ userData.username }}</h1>
                <h1 class="sm:text-2xl text-gray-900 mb-4"><strong>Email:</strong> {{ userData.email }}</h1>
            </div>

            <!-- Settings Section -->
            <div>
                <button @click="logout"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import db from '../firebase/init.js';
import { AuthService } from '@/services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref({});

// Fetch user data on component mount
onMounted(async () => {
    try {
        const userUID = await AuthService.getUID(); // Get UID from AuthService

        if (userUID) {
            const docRef = doc(db, "users", userUID); // Firestore document reference
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                userData.value = docSnap.data(); // Populate user data
                console.log('User data fetched successfully:', userData.value);
            } else {
                console.error("No such document!");
            }
        } else {
            console.error("User UID not found.");
        }
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
});

// Logout function with redirection
const logout = () => {
    AuthService.logout();
    router.push({ name: 'Login' });
};
</script>
