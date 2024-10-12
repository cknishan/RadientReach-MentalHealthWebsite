<!-- src\views\FindHelpView.vue -->
<template>

    <div class="py-12">
        <h1 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-10">Visit our Centres</h1>
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div>
                <div class="rounded-lg overflow-hidden">
                    <div class="px-4 py-5 sm:p-6">
                        <form @submit.prevent="handleSearch" class="space-y-4">
                            <div class="flex flex-wrap">
                                <input type="text" placeholder="Enter location" v-model="searchInput"
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                                <button type="submit"
                                    class="inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md shadow-sm bg-theme-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <Search class="h-4 w-4 mr-2" />
                                    Search
                                </button>
                            </div>
                            <button @click="handleGeolocation" type="button"
                                class="w-full inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-theme-pink bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <MapPin class="h-4 w-4 mr-2" />
                                Use My Location
                            </button>
                        </form>
                    </div>
                </div>
                <div v-if="nearestCenters.length > 0" class="mt-4 shadow-md rounded-lg overflow-hidden">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-theme-pink">Nearest Centers</h3>
                    </div>
                    <div class="px-4 py-5 sm:p-6">
                        <ul class="space-y-2">
                            <li v-for="center in nearestCenters" :key="center.id"
                                class="flex justify-between items-center">
                                <span>{{ center.name }}</span>
                                <span class="text-sm text-gray-500">
                                    {{ center.distance.toFixed(2) }} km
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="md:col-span-2">
                <div ref="mapContainer" class="map-container" style="height: 80vh;"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js' // Import Firestore instance
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Search, MapPin } from 'lucide-vue-next'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API

const mapContainer = ref(null)
const map = ref(null)
const lat = ref(-37.9133)
const lng = ref(145.1341)
const zoom = ref(11)
const searchInput = ref('')
const nearestCenters = ref([])
const mentalHealthCenters = ref([]) // Initialize an empty ref for centers

// Fetch mental health centers data from Firestore
const fetchMentalHealthCenters = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'mentalHealthCenters'))
        mentalHealthCenters.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        addMarkersToMap()
    } catch (error) {
        console.error('Error fetching mental health centers:', error)
    }
}

onMounted(async () => {
    await fetchMentalHealthCenters(); // Fetch data first

    nextTick(() => {
        map.value = new mapboxgl.Map({
            container: mapContainer.value,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng.value, lat.value],
            zoom: zoom.value
        });

        // Ensure map is loaded before adding markers
        map.value.on('load', () => {
            addMarkersToMap(); // Add markers only after map is ready
        });

        // Add zoom and rotation controls
        map.value.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });
});

const addMarkersToMap = () => {
    mentalHealthCenters.value.forEach(center => {
        new mapboxgl.Marker()
            .setLngLat(center.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${center.name}</h3>`))
            .addTo(map.value)
    })
}

const handleSearch = async () => {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput.value}.json?access_token=${mapboxgl.accessToken}`
        )
        const data = await response.json()
        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center
            map.value.flyTo({ center: [lng, lat], zoom: 12 })
            findNearestCenters(lng, lat)
        }
    } catch (error) {
        console.error('Error searching location:', error)
    }
}

const handleGeolocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords
                map.value.flyTo({ center: [longitude, latitude], zoom: 12 })
                findNearestCenters(longitude, latitude)
            },
            (error) => console.error('Error getting geolocation:', error)
        )
    } else {
        console.log('Geolocation is not available in your browser.')
    }
}

const findNearestCenters = (lng, lat) => {
    const distances = mentalHealthCenters.value.map(center => ({
        ...center,
        distance: getDistance(lat, lng, center.coordinates[1], center.coordinates[0])
    }))
    nearestCenters.value = distances.sort((a, b) => a.distance - b.distance).slice(0, 5)
}

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}
</script>
