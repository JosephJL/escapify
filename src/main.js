import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

let app

const auth = getAuth()



onAuthStateChanged(auth, () => {
    if (!app){
        app = createApp(App)
        .use(router)
        .mount('#app')
    }
})

