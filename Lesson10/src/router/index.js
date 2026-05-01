import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')
const ContactPage = () => import('../views/ContactPage.vue')
const ProjectsPage = () => import('../views/ProjectsPage.vue')
const SignInPage = () => import('../views/SignInPage.vue')

const routes = [
  { path: '/', component: HomePage },
  { path: '/contact', component: ContactPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/signin', component: SignInPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({ history: createWebHistory(), routes })