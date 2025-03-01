<!-- src/views/community/events/EventDetails.vue -->

<template>
    <div class="max-w-4xl mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Event Image -->
            <div class="h-64 bg-cover bg-center" :style="{ backgroundImage: `url(${event.imageUrl})` }"></div>

            <!-- Event Details -->
            <div class="p-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ event.eventName }}</h1>
                <div class="flex items-center text-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>{{ formatDate(event.date) }}</span>
                </div>
                <div class="flex items-center text-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>{{ event.place }}</span>
                </div>
                <p class="text-gray-700 mb-6">{{ event.description }}</p>
                <img :src="event.logoUrl" alt="Event logo" class="h-8 mb-4">

                <!-- Booking Button -->
                <div class="mt-4">
                    <div v-if="isEventExpired" class="text-red-500 font-bold">
                        Event date has passed
                    </div>
                    <button @click="bookOrCancelBooking" v-else-if="!loadingBooking"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                        {{ isBooked ? 'Cancel Booking' : 'Book Event' }}
                    </button>
                    <span v-else class="text-gray-500">Loading...</span>
                </div>
                <p v-if="bookingMessage" class="mt-2 text-sm"
                    :class="{ 'text-green-500': !bookingError, 'text-red-500': bookingError }">
                    {{ bookingMessage }}
                </p>
            </div>

            <!-- Event Ratings Overview -->
            <div class="bg-gray-50 p-6 border-t border-b border-gray-200 border-solid">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Event Ratings</h2>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-3xl font-bold text-gray-900 mr-2">{{ averageRating.toFixed(1) }}</span>
                        <div class="flex">
                            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"
                                :class="[i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300']"
                                class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                    <span class="text-gray-600">{{ numberOfRatings }} {{ numberOfRatings === 1 ? 'rating' : 'ratings'
                        }}</span>
                </div>
            </div>

            <!-- Rating Section -->
            <div class="bg-white p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Rate this Event</h2>
                <div class="flex items-center">
                    <div class="flex space-x-1">
                        <button v-for="star in 5" :key="star" @click="rateEvent(star)" @mouseover="hoverRating = star"
                            @mouseleave="hoverRating = 0" class="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                :fill="(hoverRating >= star || newRating >= star) ? 'currentColor' : 'none'"
                                :stroke="(hoverRating >= star || newRating >= star) ? 'currentColor' : 'currentColor'"
                                class="w-8 h-8"
                                :class="(hoverRating >= star || newRating >= star) ? 'text-yellow-400' : 'text-gray-400'">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    </div>
                    <button @click="submitRating"
                        class="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                        {{ existingRating ? 'Update Rating' : 'Submit Rating' }}
                    </button>
                </div>
                <p v-if="feedbackMessage" class="mt-2 text-sm"
                    :class="{ 'text-green-500': !error, 'text-red-500': error }">{{ feedbackMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db from '@/firebase/init.js';


const route = useRoute();
const event = ref({});
const currentUser = ref(null);
const isBooked = ref(false);
const loadingBooking = ref(false);
const bookingMessage = ref('');
const bookingError = ref(false);
const newRating = ref(0);
const hoverRating = ref(0);
const feedbackMessage = ref('');
const error = ref(false);
const existingRating = ref(null);
const allRatings = ref([]);
const isEventExpired = computed(() => new Date(event.value.date) < new Date());

// New refs for rating statistics
const averageRating = computed(() => {
    if (allRatings.value.length === 0) return 0;
    const sum = allRatings.value.reduce((acc, rating) => acc + rating, 0);
    return sum / allRatings.value.length;
});
const numberOfRatings = computed(() => allRatings.value.length);

onMounted(() => {
    fetchEventDetails();
    setupAuthListener();
    fetchAllRatings();
});

function setupAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
        if (user) {
            checkUserBooking();
            fetchUserRating();
        } else {
            isBooked.value = false;
            existingRating.value = null;
            newRating.value = 0;
        }
    });
}

async function fetchEventDetails() {
    try {
        const docRef = doc(db, 'events', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            event.value = docSnap.data();
        } else {
            console.error("No such document!");
            feedbackMessage.value = "Event not found.";
            error.value = true;
        }
    } catch (error) {
        console.error("Error fetching event details:", error);
        feedbackMessage.value = "Failed to load event details.";
        error.value = true;
    }
}

async function checkUserBooking() {
    if (!currentUser.value) return;
    try {
        const bookingRef = doc(db, 'bookings', `${currentUser.value.uid}_${route.params.id}`);
        const bookingSnap = await getDoc(bookingRef);
        isBooked.value = bookingSnap.exists();
    } catch (error) {
        console.error("Error checking booking status:", error);
    }
}

async function bookOrCancelBooking() {
    if (!currentUser.value) {
        bookingMessage.value = 'You must be logged in to book or cancel.';
        bookingError.value = true;
        return;
    }

    if (isEventExpired.value) {
        bookingMessage.value = 'Booking is no longer available for this event.';
        bookingError.value = true;
        return;
    }

    loadingBooking.value = true;
    try {
        const bookingRef = doc(db, 'bookings', `${currentUser.value.uid}_${route.params.id}`);
        if (isBooked.value) {
            await deleteDoc(bookingRef);
            isBooked.value = false;
            bookingMessage.value = 'Booking cancelled successfully.';
        } else {
            await setDoc(bookingRef, {
                userId: currentUser.value.uid,
                eventId: route.params.id
            });
            isBooked.value = true;
            bookingMessage.value = 'Event booked successfully.';
            await sendBookingEmail();
        }
        bookingError.value = false;
    } catch (error) {
        console.error("Error booking or cancelling:", error);
        bookingMessage.value = 'Failed to process your request.';
        bookingError.value = true;
    } finally {
        loadingBooking.value = false;
    }
}

async function sendBookingEmail() {
    try {
        const userRef = doc(db, 'users', currentUser.value.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userEmail = userSnap.data().email;

            const emailData = {
                to: userEmail,
                eventName: event.value.eventName,
                eventDate: formatDate(event.value.date),
                eventPlace: event.value.place,
            };

            // Call the HTTP Cloud Function
            const response = await fetch('https://sendbookingemailhttp-yhpugs43za-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if (result.success) {
                console.log("Email sent successfully!");
            } else {
                console.error("Error sending email:", result.error);
            }
        }
    } catch (error) {
        console.error("Error sending booking email:", error);
    }
}


async function fetchUserRating() {
    if (!currentUser.value) return;

    try {
        const q = query(
            collection(db, 'reviews'),
            where('userId', '==', currentUser.value.uid),
            where('eventId', '==', route.params.id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            existingRating.value = querySnapshot.docs[0].data().rating;
            newRating.value = existingRating.value;
        }
    } catch (error) {
        console.error("Error fetching user rating:", error);
    }
}

async function fetchAllRatings() {
    try {
        const q = query(
            collection(db, 'reviews'),
            where('eventId', '==', route.params.id)
        );
        const querySnapshot = await getDocs(q);
        allRatings.value = querySnapshot.docs.map(doc => doc.data().rating);
    } catch (error) {
        console.error("Error fetching all ratings:", error);
    }
}

async function submitRating() {
    if (!currentUser.value) {
        feedbackMessage.value = 'You must be logged in to submit a rating.';
        error.value = true;
        return;
    }

    if (newRating.value === 0) {
        feedbackMessage.value = 'Please select a rating before submitting.';
        error.value = true;
        return;
    }

    try {
        const reviewRef = doc(db, 'reviews', `${currentUser.value.uid}_${route.params.id}`);
        await setDoc(reviewRef, {
            userId: currentUser.value.uid,
            eventId: route.params.id,
            rating: newRating.value
        }, { merge: true });

        feedbackMessage.value = existingRating.value ? "Rating updated successfully!" : "Rating submitted successfully!";
        existingRating.value = newRating.value;
        error.value = false;

        // Update local ratings
        if (existingRating.value) {
            const index = allRatings.value.findIndex(r => r === existingRating.value);
            if (index !== -1) {
                allRatings.value[index] = newRating.value;
            }
        } else {
            allRatings.value.push(newRating.value);
        }
    } catch (error) {
        console.error("Error submitting rating:", error);
        feedbackMessage.value = "Failed to submit rating.";
        error.value = true;
    }
}

function rateEvent(star) {
    newRating.value = star;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>