import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import UserManager from '../views/UserManager.vue'
import Reports from '../views/Reports.vue'
import Settings from '../views/Settings.vue'
import Tenant_Dashboard from '../views/tenant/Tenant_Dash.vue'
import Subsidiary_Page from '../views/tenant/SubsidiariesPage.vue'
import App_User from '../views/tenant/App_User.vue'
import Tenant_Setting from '../views/tenant/Tenant_Setting.vue'
// App User
import AppUserDashboard from '../views/appuser/AppUserDashboard.vue'
import TrialBalance from '../views/appuser/TrialBalance.vue'
import ChartOfAccount from '../views/appuser/ChartOfAccount.vue'
import Journal from '../views/appuser/JournalView.vue'
import AppUserSetting from '../views/appuser/AppUserSettings.vue'
import Mapping from '../views/appuser/MappingView.vue'
import FsDesigner from '@/views/appuser/FsDesigner.vue'
import Register from '@/views/AppUserRegister.vue'
import TenantRegister from '@/views/TenantRegister.vue'

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
  {
    path: '/tenant_register',
    name: 'tenant_register',
    component: TenantRegister
  },
  {
    path: '/subsidiary_page',
    name: 'subsidiary_page',
    component: Subsidiary_Page
  },
  {
    path: '/app_user',
    name: 'app_user',
    component: App_User
  },
  {
    path: '/tenant_setting',
    name: 'tenant_setting',
    component: Tenant_Setting
  },
  //App User Routes
  {
    path: '/register',
    name: 'AppUserRegister',
    component: Register
  },
  {
    path: '/app_user_dashboard',
    name: 'appUserDashboard',
    component: AppUserDashboard
  },
  {
    path: '/trial_balance',
    name: 'TrialBalance',
    component: TrialBalance
  },
  {
    path: '/chart_of_account',
    name: 'ChartOfAccount',
    component: ChartOfAccount
  },
  {
    path: '/app_user_setting',
    name: 'AppUserSetting',
    component: AppUserSetting
  },
  {
    path: '/journal',
    name: 'Journal',
    component: Journal
  },
  {
    path: '/mapping',
    name: 'mapping',
    component: Mapping
  },
  {
    path: '/fsdesigner',
    name: 'FsDesigner',
    component: FsDesigner
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
