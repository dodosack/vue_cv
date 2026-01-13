// haupt einstiegspunkt für die vue app
// hier wird alles zusammengebaut
import './assets/main.css'  // globale styles
//einfacher zum farben wechslen und darkmode


import { createApp } from 'vue'//vue bauen standard
import { createPinia } from 'pinia'  // state management

import App from './App.vue' //enthält alles
import router from './router' // alle 4 routen

// vue app instanz erstellen
const app = createApp(App)

// plugins registrieren
app.use(createPinia())  // pinia für state
app.use(router)  // vue router für navigation

// app in den dom mounten zum rendern
app.mount('#app')
