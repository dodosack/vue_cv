// src/stores/github.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GitHubRepo } from '@/types'

export const useGitHubStore = defineStore('github', () => {
  
  // State
  const repos = ref<GitHubRepo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const username = ref('') // Dein GitHub Username

  // Getters

  // Nur eigene Repos (keine Forks)
  const ownRepos = computed<GitHubRepo[]>(() =>
    repos.value.filter((repo: GitHubRepo) => !repo.fork)
  )

  // Nach Stars sortiert
  const topRepos = computed<GitHubRepo[]>(() =>
    [...ownRepos.value].sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
  )

  // Alle verwendeten Sprachen
  const languages = computed<string[]>(() => {
    const langs = repos.value
      .map((repo: GitHubRepo) => repo.language)
      .filter((lang): lang is string => lang !== null)
    return [...new Set(langs)]
  })

  // Actions
  
  async function fetchRepos(githubUsername: string) {
    // Verhindere doppelte Requests
    if (isLoading.value) return

    isLoading.value = true
    error.value = null
    username.value = githubUsername

    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${githubUsername}" nicht gefunden`)
        }
        throw new Error(`GitHub API Fehler: ${response.status}`)
      }

      const data: GitHubRepo[] = await response.json()
      repos.value = data

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
      repos.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Repos neu laden
  function refresh() {
    if (username.value) {
      fetchRepos(username.value)
    }
  }

  return {
    // State
    repos,
    isLoading,
    error,
    username,
    // Getters
    ownRepos,
    topRepos,
    languages,
    // Actions
    fetchRepos,
    refresh
  }
})