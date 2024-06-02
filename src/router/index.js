import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import OtpView from '../views/auth/OtpView.vue'
import Redirect from '../views/oauth/RedirectView.vue'
import LogoutView from '../views/auth/LogoutView.vue'
import FindPasswordView from '../views/auth/FindPasswordView.vue'
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
    path: '/otp',
    component: OtpView
  },
  {
    path: '/find/password',
    component: FindPasswordView
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
