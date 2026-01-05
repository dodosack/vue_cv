// alle typescript interfaces für die app
// damit typescript weis was für typen die sachen haben
// und man autocomplete bekommt

// skill interface für die skills seite
export interface Skill {
  name: string
  level: number  // 0-100 prozent
  category: string  // frontend backend oder tools
}

// für die berufserfahrung
export interface Experience {
  id: number
  company: string
  position: string
  startDate: string  // format YYYY-MM
  endDate: string | null  // null wenn noch aktuell
  description: string
}

// projekte interface
export interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  link?: string  // optional falls man ne demo hat
}

// profil daten interface
export interface Profile {
  name: string
  title: string
  email: string
  location: string
  bio: string
  image?: string  // optional profilbild
}

// github repo interface  passt zu dem was die api zurückgibt
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null  // live demo link
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean  // ob es ein fork ist
  updated_at: string
  topics: string[]
}