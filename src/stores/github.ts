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



  // alle sprachen die in den repos verwendet werden
  // mit Set damit keine duplikate
  const languages = computed<string[]>(() => {
    const langs = repos.value
      .map((repo: GitHubRepo) => repo.language)
//  macht die in ein array und wandelt repo in repo.languúage um (kopie)
      
      .filter((lang): lang is string => lang !== null)
    //null weg machen
      return [...new Set(langs)]// SET wie in python einzigartig macht duplikate weg
  })

  // holt alle repos von nem github user
  async function fetchRepos(githubUsername: string) {
    //non blocking thread
    // check ob schon am laden damit nicht doppelt gefetched wird
    if (isLoading.value) return

    isLoading.value = true
    error.value = null //löscht error
    username.value = githubUsername

    try {
      // github api  
      // per_page=100 damit wir  alle repos kriegen
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
      ) //await sonst wartet der ncihts

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${githubUsername}" nicht gefunden`)
        }
        throw new Error(`GitHub API Fehler: ${response.status}`)
      }

      const data: GitHubRepo[] = await response.json() //wandelt in js objekte und ist auch asynchon
      repos.value = data // wichtigste damit es im state management ist

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
      repos.value = []
    } finally {//immer
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