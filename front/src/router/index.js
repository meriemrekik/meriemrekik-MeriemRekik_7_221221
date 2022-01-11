import { createRouter, createWebHistory } from 'vue-router'
import SignInPage from '../views/SignInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import AddPublication from '../views/AddPublication.vue'
import EditPublication from '../views/EditPublication.vue'
import SignOut from '../views/SignOut.vue'
import store from '../store'

const requireAuth = function (to, from, next) {
  if (store.state.token) {
    next();
  } else {
    console.warn("Vous n'etes pas connectés");
    next('signIn');
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/publication/:id/edit',
    name: 'EditPublication',
    component: EditPublication,
    beforeEnter: requireAuth
  },
  {
    path: '/publication/:id',
    name: 'Detail',
    component: Detail,
    beforeEnter: requireAuth
  },
  {
    path: '/addPublication',
    name: 'AddPublication',
    component: AddPublication,
    beforeEnter: requireAuth
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
