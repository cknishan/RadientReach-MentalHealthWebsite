<template>
    {{ jsondata }}
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            jsondata: null,
            error: null
        };
    },
    mounted() {
        this.getMentalHealthCentersDataAPI();
    },
    methods: {
        async getMentalHealthCentersDataAPI() {
            try {
                const response = await axios.get('https://us-central1-mental-health-5ba08.cloudfunctions.net/getMentalHealthCenters');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching mental health centers data:', error);
                this.error = error;
            }
        }
    }
};
</script>
