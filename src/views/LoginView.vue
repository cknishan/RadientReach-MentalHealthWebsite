<!-- src\views\LoginView.vue -->

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth';

// Local state
const username = ref('');
const password = ref('');
const errorMessage = ref('');

// Get the router instance
const router = useRouter();

// Function to handle login
const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username.value && user.password === password.value);

    if (user) {
        AuthService.login(username.value, password.value);
        router.push({ name: 'Home' });
    } else {
        errorMessage.value = 'Invalid credentials';
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
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <input v-model="username" type="text" class="custom-text-input" placeholder="Username" required />
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