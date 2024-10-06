<!-- src\views\LoginView.vue -->

<script setup>

import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init.js'; // Import Firestore instance


// Local state
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Get the router instance
const router = useRouter();
const auth = getAuth();

const handleLogin = async () => {
    try {
        // Sign in the user using Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        console.log('Firebase Sign In Successful!', user);

        // Fetch the user role from Firestore using the user's UID
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.role; // Fetch the role from Firestore

            // Save the user data and role to sessionStorage
            const userWithRole = {
                uid: user.uid,
                email: user.email,
                role: userRole, // Save the role along with other user data
            };

            sessionStorage.setItem('loggedInUser', JSON.stringify(userWithRole)); // Save data to sessionStorage

            console.log('User Role:', userRole);
            router.push('/profile'); // Redirect to profile page after successful login
        } else {
            console.error('No such user document in Firestore');
            errorMessage.value = 'User document not found in Firestore.';
        }

    } catch (error) {
        // console.error('Error during sign-in: ', error.message);
        console.error(error)

        // Check the error code and set a user-friendly message
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage.value = 'Invalid email address format.';
                break;
            case 'auth/user-disabled':
                errorMessage.value = 'This user account has been disabled.';
                break;
            case 'auth/user-not-found':
                errorMessage.value = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage.value = 'Incorrect password. Please try again.';
                break;
            default:
                errorMessage.value = 'An error occurred during sign-in. Please try again.';
        }
    }
};


</script>


<template>

    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your
                account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="handleLogin">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <input v-model="email" type="email" class="custom-text-input" placeholder="Email" required />
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" type="password" class="custom-text-input" placeholder="Password"
                            required />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log
                        In</button>
                </div>
            </form>
            <p v-if="errorMessage" class="my-2 text-red-500">{{ errorMessage }}</p>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <RouterLink :to="{ name: 'SignUp' }"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign
                    up</RouterLink>
            </p>
        </div>
    </div>
</template>