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
        this.getTopicsDataAPI();
    },
    methods: {
        async getTopicsDataAPI() {
            try {
                const response = await axios.get('https://us-central1-mental-health-5ba08.cloudfunctions.net/getTopics');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching topics data:', error);
                this.error = error;
            }
        }
    }
};
</script>
