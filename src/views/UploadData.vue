<!-- src/components/UploadData.vue -->
<template>
    <div class="upload-container">
        <h1>Upload Mental Health Centers to Firestore</h1>
        <button @click="uploadData" :disabled="isUploading">
            {{ isUploading ? "Uploading..." : "Upload Data" }}
        </button>
        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase/init.js';


export default {
    data() {
        return {
            isUploading: false,
            message: "",
            mentalHealthCenters: [
                { name: "Mindful Wellness Center", coordinates: [151.2093, -33.8688] },
                { name: "Serenity Counseling Services", coordinates: [144.9631, -37.8136] },
                { name: "Harmony Mental Health Clinic", coordinates: [115.8575, -31.9505] },
                { name: "Tranquil Minds Therapy", coordinates: [153.0251, -27.4676] },
                { name: "Peaceful Hearts Counseling", coordinates: [138.6007, -34.9285] },
                { name: "Hopeful Horizons", coordinates: [145.1111, -38.1451] },
                { name: "Calm Connections", coordinates: [145.2734, -37.8671] },
                { name: "Healing Pathways", coordinates: [145.0622, -37.648] },
                { name: "Balanced Mind Clinic", coordinates: [145.0015, -37.5544] },
                { name: "Wholesome Minds Therapy", coordinates: [151.3072, -33.8166] },
                { name: "Supportive Spaces", coordinates: [144.7071, -37.7396] },
                { name: "Nurtured Minds", coordinates: [145.3344, -37.7372] },
                { name: "Guided Growth Therapy", coordinates: [151.2535, -32.2564] },
                { name: "Tranquility Center", coordinates: [138.7026, -35.0142] },
                { name: "Bright Futures Counseling", coordinates: [145.1333, -37.8135] },
                { name: "Resilient Minds Clinic", coordinates: [147.3294, -41.4405] },
                { name: "Inner Peace Therapy", coordinates: [138.6098, -34.6743] },
                { name: "Compassionate Care Center", coordinates: [153.0454, -27.3861] },
                { name: "Caring Connections", coordinates: [145.091, -37.9753] },
                { name: "Empowerment Counseling", coordinates: [151.6549, -31.9505] }
            ]
        };
    },
    methods: {
        async uploadData() {
            this.isUploading = true;
            this.message = "";

            try {
                // Loop through the data array and add each document
                const uploadPromises = this.mentalHealthCenters.map((center) =>
                    addDoc(collection(db, "mentalHealthCenters"), center)
                );

                // Wait for all uploads to complete
                await Promise.all(uploadPromises);
                this.message = "All centers uploaded successfully!";
            } catch (error) {
                console.error("Error uploading data:", error);
                this.message = "Error uploading data. Check console for details.";
            } finally {
                this.isUploading = false;
            }
        }
    }
};
</script>

<style scoped>
.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
}

.message {
    margin-top: 15px;
    color: green;
}

button:disabled {
    background-color: gray;
    cursor: not-allowed;
}
</style>