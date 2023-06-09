import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/components/pages/Login'

const routes = [
  {path: "/",  component: Home,meta:{requiresAuth:true}},
  {path: "/about",  component:About},
  {path:'/login',name:'Login',component:Login}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router