import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Redirect from '../views/oauth/RedirectView.vue'
import LogoutView from '../views/LogoutView.vue'
import AdminView from '../views/admin/adminView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/admin', 
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/logout',
    component: LogoutView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/oauth2/redirect', 
    component: Redirect
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
