<!--  src\views\SignUp.vue -->

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import db from '../firebase/init.js'; // Import the initialized Firestore instance
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

const router = useRouter();

const formData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
})

const auth = getAuth();

const signupErrorMessage = ref('')

const submitForm = async () => {
    validateName(true);
    validateEmail(true);
    validatePassword(true);
    validateConfirmPassword(true);

    try {
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.email);
        const user = userCredential.user;

        // Save the user data with additional attributes (like role) to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'user',
            uid: user.uid,
            isAustralian: formData.value.isAustralian,
            reason: formData.value.reason,
            gender: formData.value.gender
        });

        console.log('Firebase Registration Successful');
        router.push({ name: 'Login' });
    } catch (error) {
        console.error('Error during registration: ', error);
    }

}


const errors = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
})

const customMessage = ref({
    reasonMessage: null
})

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = 'Name must be at least 3 characters'
    } else {
        errors.value.username = null
    }
}

const validateEmail = (blur) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.value.email)) {
        if (blur) errors.value.email = 'Please enter a valid email address'
    } else {
        errors.value.email = null
    }
}

const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
        if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
        if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
        if (blur) errors.value.password = 'Password must contain at least one number.'
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = 'Password must contain at least one special character.'
    } else {
        errors.value.password = null
    }
}


const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = 'Passwords do not match.'
    } else {
        errors.value.confirmPassword = null
    }
}

const checkReason = (blur) => {
    if (formData.value.reason.trim().split(/\s+/).length >= 50) {
        customMessage.value.reasonMessage = 'Cannot exceed 50 words.'
    } else {
        customMessage.value.reasonMessage = null
    }
}

</script>
<template>
    <div class="mx-auto p-4">
        <div class="max-w-3xl mx-auto">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-8">Sign Up Your
                Account</h2>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" @blur="() => validateName(true)"
                            @input="() => validateName(false)" v-model="formData.username"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" @blur="() => validateEmail(true)"
                            @input="() => validateEmail(false)" v-model="formData.email"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" @blur="() => validatePassword(true)"
                            @input="() => validatePassword(false)" v-model="formData.password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</div>
                    </div>
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <input type="password" id="confirm-password" v-model="formData.confirmPassword"
                            @blur="() => validateConfirmPassword(true)"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">{{ errors.confirmPassword
                            }}</div>
                    </div>
                </div>
                <div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="flex items-center">
                            <input type="checkbox" id="isAustralian" v-model="formData.isAustralian"
                                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <label for="isAustralian" class="ml-2 block text-sm text-gray-900">Australian
                                Resident?</label>

                        </div>
                        <div>
                            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                            <select id="gender" v-model="formData.gender" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="reason" class="block text-sm font-medium text-gray-700">Reason for joining</label>
                    <textarea id="reason" rows="3" v-model="formData.reason" @blur="() => checkReason(true)"
                        @input="() => checkReason(false)"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    <div v-if="customMessage.reasonMessage" class="text-red-600 text-sm mt-1">{{
                        customMessage.reasonMessage }}</div>
                </div>
                <p v-if="signupErrorMessage" style="color: red">{{ signupErrorMessage }}</p>

                <div class="flex justify-center space-x-4">
                    <button type="submit"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign
                        Up</button>
                    <RouterLink
                        class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        :to="{ name: 'Login' }">
                        Go to Login
                    </RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>
