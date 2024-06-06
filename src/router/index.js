import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import UserManager from '../views/UserManager.vue'
import Reports from '../views/Reports.vue'
import Settings from '../views/Settings.vue'
import Tenant_Dashboard from '../views/tenant/Tenant_Dash.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/user_manager',
    name: 'user_manager',
    component: UserManager
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  },
  //Tenant Routes
  {
    path: '/tenant_dashboard',
    name: 'tenant_dashboard',
    component: Tenant_Dashboard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
