// github store für die projekte seite
// holt repos von der github api
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GitHubRepo } from '@/types'

export const useGitHubStore = defineStore('github', () => {

  // state variablen
  const repos = ref<GitHubRepo[]>([])  // alle repos vom user
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const username = ref('')  // github username wird beim fetchen gesetzt

  // getter für nur eigene repos ohne forks
  const ownRepos = computed<GitHubRepo[]>(() =>
    repos.value.filter((repo: GitHubRepo) => !repo.fork)
  )

  // ÜBERFLÜSSIG - topRepos wird nirgends benutzt
  // const topRepos = computed<GitHubRepo[]>(() =>
  //   [...ownRepos.value].sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
  // )

  // alle sprachen die in den repos verwendet werden
  // mit Set damit keine duplikate
  const languages = computed<string[]>(() => {
    const langs = repos.value
      .map((repo: GitHubRepo) => repo.language)
      .filter((lang): lang is string => lang !== null)
    return [...new Set(langs)]
  })

  // holt alle repos von nem github user
  async function fetchRepos(githubUsername: string) {
    // check ob schon am laden damit nicht doppelt gefetched wird
    if (isLoading.value) return

    isLoading.value = true
    error.value = null
    username.value = githubUsername

    try {
      // github api  per_page=100 damit wir möglichst alle repos kriegen
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

  // repos nochmal laden für den refresh button
  function refresh() {
    if (username.value) {
      fetchRepos(username.value)
    }
  }

  return {
    repos,
    isLoading,
    error,
    username,
    ownRepos,
    // topRepos,  // auskommentiert weil überflüssig
    languages,
    fetchRepos,
    refresh
  }
})