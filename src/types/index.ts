// src/types/index.ts
// gibt autocomplete und 
export interface Skill {
  name: string
  level: number        // 0-100
  category: string     // 'frontend' | 'backend' | 'tools'
}

export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string | null    // null = aktuell
  description: string
}

export interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  link?: string            // optional
}

export interface Profile {
  name: string
  title: string
  email: string
  location: string
  bio: string
  image?: string
}