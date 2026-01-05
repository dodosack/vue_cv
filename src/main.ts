// haupt einstiegspunkt für die vue app
// hier wird alles zusammengebaut
import './assets/main.css'  // globale styles
import { createApp } from 'vue'
import { createPinia } from 'pinia'  // state management

import App from './App.vue'
import router from './router'

// vue app erstellen
const app = createApp(App)

// plugins registrieren
app.use(createPinia())  // pinia für state
app.use(router)  // vue router für navigation

// app in den dom mounten
app.mount('#app')
