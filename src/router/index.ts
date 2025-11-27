// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Services from '@/views/Services.vue'
import ServiceDetails from '@/views/ServiceDetails.vue'
import Dashboard from '@/views/Dashboard.vue'
import BookService from '@/views/BookService.vue'
import MyBookings from '@/views/MyBookings.vue'
import BookingDetails from '@/views/BookingDetails.vue'
import Chat from '@/views/Chat.vue'
import Wallet from '@/views/Wallet.vue'
import Profile from '@/views/Profile.vue'
import ProviderDashboard from '@/views/ProviderDashboard/ProviderDashboard.vue'
import ProviderJobs from '@/views/ProviderDashboard/ProviderJobs.vue'
import ProviderAppointments from '@/views/ProviderDashboard/ProviderAppointments.vue'
import ProviderEarnings from '@/views/ProviderDashboard/ProviderEarnings.vue'
import ProviderProfile from '@/views/ProviderDashboard/ProviderProfile.vue'
// import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
// import AdminUsers from '@/views/Admin/AdminUsers.vue'
// import AdminProviders from '@/views/Admin/AdminProviders.vue'
// import AdminServices from '@/views/Admin/AdminServices.vue'
// import AdminCategories from '@/views/Admin/AdminCategories.vue'
// import AdminBookings from '@/views/Admin/AdminBookings.vue'
// import AdminPayouts from '@/views/Admin/AdminPayouts.vue'
// import AdminCMS from '@/views/Admin/AdminCMS.vue'
// import AdminRoles from '@/views/Admin/AdminRoles.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/services/:id',
    name: 'ServiceDetails',
    component: ServiceDetails,
    props: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        redirect: '/dashboard/bookings'
      },
      {
        path: 'book-service',
        name: 'BookService',
        component: BookService
      },
      {
        path: 'bookings',
        name: 'MyBookings',
        component: MyBookings
      },
      {
        path: 'bookings/:id',
        name: 'BookingDetails',
        component: BookingDetails,
        props: true
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: 'wallet',
        name: 'Wallet',
        component: Wallet
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/provider',
    name: 'ProviderDashboard',
    component: ProviderDashboard,
    children: [
      {
        path: '',
        redirect: '/provider/jobs'
      },
      {
        path: 'jobs',
        name: 'ProviderJobs',
        component: ProviderJobs
      },
      {
        path: 'appointments',
        name: 'ProviderAppointments',
        component: ProviderAppointments
      },
      {
        path: 'earnings',
        name: 'ProviderEarnings',
        component: ProviderEarnings
      },
      {
        path: 'profile',
        name: 'ProviderProfile',
        component: ProviderProfile
      }
    ]
  },
//   {
//   path: '/admin',
//   name: 'AdminDashboard',
//   component: AdminDashboard,
//   children: [
//     {
//       path: '',
//       redirect: '/admin/dashboard'
//     },
//     {
//       path: 'dashboard',
//       name: 'AdminDashboard',
//       component: AdminDashboard
//     },
//     {
//       path: 'users',
//       name: 'AdminUsers',
//       component: AdminUsers
//     },
//     {
//       path: 'providers',
//       name: 'AdminProviders',
//       component: AdminProviders
//     },
//     {
//       path: 'services',
//       name: 'AdminServices',
//       component: AdminServices
//     },
//     {
//       path: 'categories',
//       name: 'AdminCategories',
//       component: AdminCategories
//     },
//     {
//       path: 'bookings',
//       name: 'AdminBookings',
//       component: AdminBookings
//     },
//     {
//       path: 'payouts',
//       name: 'AdminPayouts',
//       component: AdminPayouts
//     },
//     // {
//     //   path: 'cms',
//     //   name: 'AdminCMS',
//     //   component: AdminCMS
//     // },
//     // {
//     //   path: 'roles',
//     //   name: 'AdminRoles',
//     //   component: AdminRoles
//     // }
//   ]
// },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router