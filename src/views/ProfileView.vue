<!-- src\views\ProfileView.vue -->

<template>
    <div class="px-4 py-12 ">
        <h1 class="my-6 tracking-tight text-gray-900 sm:text-5xl text-center">User Profile</h1>

        <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl text-gray-900 mb-4"><strong>Name:</strong> {{ userData.username }}</h1>
            <h1 class="text-2xl text-gray-900 mb-4"><strong>Email:</strong> {{ userData.email }}</h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore'; // Correct imports for Firestore
import db from '../firebase/init.js';
import { AuthService } from '@/services/auth'

const userData = ref({});

onMounted(async () => {
    try {
        // Fetch the UID from AuthService
        const userUID = await AuthService.getUID();

        if (userUID) {
            // Reference to the Firestore document
            const docRef = doc(db, "users", userUID); // Assuming collection name is "users"
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Populate userData with document data
                userData.value = docSnap.data();
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
</script>