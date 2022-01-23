import { createRouter, createWebHistory } from 'vue-router'
import SignInPage from '../views/SignInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import AddPublication from '../views/AddPublication.vue'
import DetailProfile from '../views/DetailProfile.vue'
import EditPublication from '../views/EditPublication.vue'
import SignOut from '../views/SignOut.vue'
import store from '../store'

// On définit une Guard
// C'est une fonction que l'on execute avant d'acceder à une routes
// Si on passe la fonction alors on accède à la route, sinon on est bloqué
const requireAuth = function (to, from, next) {
  // Cette Guard vérifie que l'on est bien connecté
  if (store.state.token) {
    next();
  } else {
    // Sinon on est redirigé vers la page de connexion
    console.warn("Vous n'etes pas connectés");
    next('signIn');
  }
}

// On définit les routes dans notre application
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
    path: '/profile/:id?',
    name: 'Profile',
    component: DetailProfile,
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
