import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'

import DashboardHome from './components/dashboard/DashboardHome.vue'
import Categories from './components/dashboard/categories/Categories.vue'
import Category from './components/dashboard/categories/Category.vue'
import Notes from './components/dashboard/notes/Notes.vue'
import Settings from './components/dashboard/settings/Settings.vue'

export const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/home',
    component: Dashboard,
    children: [{
        path: 'home',
        component: DashboardHome
      },
      {
        path: 'notes',
        component: Notes,
        children: [{
          path: ':noteid'
        }]
      },
      {
        path: 'settings',
        component: Settings,
        children: []
      },
    ]
  },
  {
    path: '/dashboard/categories',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Categories
      },
      {
        path: ':catid',
        component: Category
      }
    ]
  },
  

]
