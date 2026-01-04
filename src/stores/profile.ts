// src/stores/profile.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Skill, Experience, Project, Profile } from '@/types'

export const useProfileStore = defineStore('profile', () => {
  
  // Persönliche Daten
  const profile = ref<Profile>({
    name: 'DodoSack',
    title: 'Movie Binge Watcher',
    email: 'dodosack@dodo.com',
    location: 'Dudelstadt, Dodoland',
    bio: 'Leidenschaftlicher Entwickler mit Fokus auf moderne Webtechnologien oder so in der art.'
  })

  // Skills
  const skills = ref<Skill[]>([
    { name: 'Vue.js', level: 85, category: 'frontend' },
    { name: 'TypeScript', level: 75, category: 'frontend' },
    { name: 'CSS/SCSS', level: 80, category: 'frontend' },
    { name: 'Node.js', level: 60, category: 'backend' },
    { name: 'Git', level: 70, category: 'tools' }
  ])

  // Erfahrungen
  const experiences = ref<Experience[]>([
    {
      id: 1,
      company: 'Gastronomie',
      position: 'Porzelan Taucher',
      startDate: '2023-01',
      endDate: null,
      description: 'Professionelle Unterwasser Porzelan Tauchgänge und Porzelan Polierung'
    },
    {
      id: 2,
      company: 'Startup AG',
      position: 'Junior Developer',
      startDate: '2021-06',
      endDate: '2022-12',
      description: 'Fullstack Entwicklung mit JavaScript'
    }
  ])

  // Projekte
  const projects = ref<Project[]>([
    {
      id: 1,
      name: 'Portfolio Website',
      description: 'Persönliche Portfolio-Seite mit Vue.js',
      technologies: ['Vue.js', 'TypeScript', 'CSS']
    }
  ])

  // UI State
  const darkMode = ref(true)

  // Getters
  const frontendSkills = computed(() => 
    skills.value.filter(s => s.category === 'frontend')
  )

  const currentJob = computed(() => 
    experiences.value.find(e => e.endDate === null)
  )

  // Actions
  function toggleDarkMode() {
    darkMode.value = !darkMode.value
  }

  return {
    profile,
    skills,
    experiences,
    projects,
    darkMode,
    frontendSkills,
    currentJob,
    toggleDarkMode
  }
})