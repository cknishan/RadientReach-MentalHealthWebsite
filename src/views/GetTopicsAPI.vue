<template >
    <div class="mt-10">
        {{ jsondata }}
    </div>
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
                const response = await axios.get('https://us-central1-radientrea.cloudfunctions.net/getTopics');
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
