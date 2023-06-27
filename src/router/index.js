import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home/Index.vue'
import Mqtt1 from '@/views/MQTT/TestMqtt.vue'
import Mqtt2 from '@/views/MQTT/TestMqtt2.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login'

const routes = [
  {path: "/",  component: Home,meta:{requiresAuth:true}},
  {path: "/Mqtt1",  component:Mqtt1},
  {path: "/Mqtt2",  component:Mqtt2},
  {path: "/about",  component:About},
  {path:'/login',name:'Login',component:Login}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router