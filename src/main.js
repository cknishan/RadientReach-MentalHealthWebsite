import App from './App.vue'

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

// import Noir from './presets/Noir.js';
// import Aura from '@/presets/lara';      //import preset

const app = createApp(App);
app.use(PrimeVue, { unstyled: true });
// app.use(PrimeVue, {
//     theme: {
//         preset: Noir,
//         options: {
//             prefix: 'p',
//             darkModeSelector: '.p-dark',
//             cssLayer: false,
//         }
//     }
// });
app.mount('#app');
