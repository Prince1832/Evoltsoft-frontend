import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChargerListView from '../views/ChargerListView.vue'
import MapView from '../views/MapView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/chargers', component: ChargerListView },
  { path: '/map', component: MapView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
