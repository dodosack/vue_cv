// profil store mit allen persönlichen daten
// das is quasi die datenbank für die ganze app
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Skill, Experience, Profile } from '@/types'
// Project import überflüssig weil projects auskommentiert

export const useProfileStore = defineStore('profile', () => {

  // meine profil daten
  const profile = ref<Profile>({
    name: 'DodoSack',
    title: 'Movie Binge Watcher',
    email: 'dodosack@dodo.com',
    location: 'Dudelstadt, Dodoland',
    bio: 'Leidenschaftlicher Entwickler mit Fokus auf moderne Webtechnologien oder so in der art'
  })

  // meine skills mit level in prozent
  const skills = ref<Skill[]>([
    { name: 'Vue.js', level:65, category: 'frontend' },
    { name: 'TypeScript', level: 75, category: 'frontend' },
    { name: 'CSS/SCSS', level: 50, category: 'frontend' },
    { name: 'Node.js', level: 60, category: 'backend' },
    { name: 'Git', level: 90, category: 'tools' }
  ])

  // berufserfahrung  endDate null heisst aktueller job
  const experiences = ref<Experience[]>([
    {
      id: 1,
      company: 'Gastronomie',
      position: 'Porzelan Taucher',
      startDate: '2023-01',
      endDate: null,  // aktueller job
      description: 'Professionelle Unterwasser Porzelan Tauchgänge und Porzelan Polierung'
    },
    {
      id: 2,
      company: 'Google',
      position: 'Intern',
      startDate: '2021-06',
      endDate: '2022-12',
      description: 'Kaffemaschinen Reiniger'
    }
  ])




  //brauche ich nicht mehr 
  // projekte liste

  /* const projects = ref<Project[]>([
    {
      id: 1,
      name: 'Portfolio Website',
      description: 'Persönliche Portfolio-Seite mit Vue.js',
      technologies: ['Vue.js', 'TypeScript', 'CSS']
    }
  ])
*/



  // dark mode is standardmässig an
  const darkMode = ref(true)

  // ÜBERFLÜSSIG - frontendSkills wird nirgends benutzt
  // const frontendSkills = computed(() =>
  //   skills.value.filter(s => s.category === 'frontend')
  // )

  // gibt den aktuellen job zurück also wo endDate null is
  const currentJob = computed(() =>
    experiences.value.find(e => e.endDate === null)
  )

  // toggle für dark mode button in der navbar
  function toggleDarkMode() {
    darkMode.value = !darkMode.value
  }

  return {
    profile,
    skills,
    experiences,
    // projects,  // auskommentiert weil überflüssig
    darkMode,
    // frontendSkills,  // auskommentiert weil überflüssig
    currentJob,
    toggleDarkMode
  }
})