import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '../components/Index.vue'
import Explain from '../components/Explain.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Index', component: Index },
  { path: '/explain', name: 'Explain', component: Explain },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
