// vue router config
// alle routen der app sind hier definiert
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // html5 history mode für schönere urls ohne hash
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView  // homeview wird direkt importiert weil is die hauptseite
    },
    {
      // lazy loading für die anderen views damit die app schneller lädt
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillsView.vue')
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    }
  ]
})

export default router

// ÜBERFLÜSSIG - duplikat interface  das richtige is in types/index.ts
// export interface GitHubRepo {
//   id: number
//   name: string
//   description: string | null
//   html_url: string
//   homepage: string | null
//   language: string | null
//   stargazers_count: number
//   forks_count: number
//   topics: string[]
//   created_at: string
//   updated_at: string
//   fork: boolean
// }