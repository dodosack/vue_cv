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

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  updated_at: string
  topics: string[]
}