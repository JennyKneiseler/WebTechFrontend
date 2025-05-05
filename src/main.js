import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')


fetch('http://localhost:8080/berliner-restaurantauswahl/daten')
    .then(res => res.json())
    .then(data => {
        this.users = data;
    });

