import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const MovieView = () => import('../views/MovieView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView,
      props: true
    },
    {
      path: '/genre/:genreValue',
      name: 'genre',
      component: HomeView,
      props: true
    }
  ]
})

export default router
