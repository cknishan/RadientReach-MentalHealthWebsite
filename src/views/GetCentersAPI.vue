<template>
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
        this.getMentalHealthCentersDataAPI();
    },
    methods: {
        async getMentalHealthCentersDataAPI() {
            try {
                const response = await axios.get('https://getmentalhealthcenters-yhpugs43za-uc.a.run.app/');
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
