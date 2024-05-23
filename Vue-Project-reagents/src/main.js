import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import RegistrationForm from './pages/RegistrationForm.vue'

const app = createApp(App)

const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/profile', name: 'RegistrationForm', component: RegistrationForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
