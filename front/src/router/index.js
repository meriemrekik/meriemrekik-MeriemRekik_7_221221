import { createRouter, createWebHistory } from 'vue-router'
import SignInPage from '../views/SignInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import Home from '../views/Home.vue'
import AddPublication from '../views/AddPublication.vue'
import SignOut from '../views/SignOut.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/publication/:id',
    name: 'Detail',
    component: AddPublication
  },
  {
    path: '/addPublication',
    name: 'AddPublication',
    component: AddPublication
  },
  {
    path: '/signOut',
    name: 'SignOut',
    component: SignOut
  },
  {
    path: '/signIn',
    name: 'SignInPage',
    component: SignInPage,
  },
  {
    path: '/signUp',
    name: 'SignUpPage',
    component: SignUpPage,
  },
  {
    path: '/**',
    redirect: '/signIn'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
