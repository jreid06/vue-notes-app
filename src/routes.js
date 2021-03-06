import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'

import DashboardHome from './components/dashboard/DashboardHome.vue'
import Categories from './components/dashboard/categories/Categories.vue'
import Category from './components/dashboard/categories/Category.vue'
import Notes from './components/dashboard/notes/Notes.vue'
import Note from './components/dashboard/notes/Note.vue'
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
   {
     path: '/dashboard/note',
     component: Dashboard,
     children: [{
         path: '',
         redirect: '/dashboard/notes'
       },
       {
         path: ':noteid',
         component: Note
       }
     ]
   },
  {
    path: '/dashboard/notes',
    component: Dashboard,
    children: [{
        path: '',
        component: Notes
      },
      {
        path: ':noteid',
        component: Note
      }
    ]
  },
  

]
