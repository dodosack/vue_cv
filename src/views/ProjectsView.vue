<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGitHubStore } from '@/stores/github'
import RepoCard from '@/components/RepoCard.vue'
import type { GitHubRepo } from '@/types'

const githubStore = useGitHubStore()

const GITHUB_USERNAME = 'dodosack'

// Filter State
const showForks = ref(false)
const selectedLanguage = ref<string | null>(null)

// Gefilterte Repos
const filteredRepos = computed<GitHubRepo[]>(() => {
  let result = showForks.value
    ? githubStore.repos
    : githubStore.ownRepos

  if (selectedLanguage.value) {
    result = result.filter((repo: GitHubRepo) => repo.language === selectedLanguage.value)
  }

  return result
})

// Beim Laden der Seite: Repos fetchen
onMounted(() => {
  githubStore.fetchRepos(GITHUB_USERNAME)
})
</script>

<template>
  <div class="projects-view">
    <div class="header">
      <h1>Meine GitHub Projekte</h1>
      <a 
        :href="`https://github.com/${GITHUB_USERNAME}`" 
        target="_blank"
        class="github-link"
      >
        @{{ GITHUB_USERNAME }} auf GitHub →
      </a>
    </div>

    <!-- Loading State -->
    <div v-if="githubStore.isLoading" class="loading">
      <div class="spinner"></div>
      <p>Lade Repositories...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="githubStore.error" class="error">
      <p>❌ {{ githubStore.error }}</p>
      <button @click="githubStore.refresh">Erneut versuchen</button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Filter -->
      <div class="filters">
        <div class="filter-group">
          <label>
            <input type="checkbox" v-model="showForks" />
            Forks anzeigen
          </label>
        </div>

        <div class="filter-group">
          <select v-model="selectedLanguage">
            <option :value="null">Alle Sprachen</option>
            <option 
              v-for="lang in githubStore.languages" 
              :key="lang" 
              :value="lang"
            >
              {{ lang }}
            </option>
          </select>
        </div>

        <span class="repo-count">
          {{ filteredRepos.length }} Repositories
        </span>
      </div>

      <!-- Repos Grid -->
      <div class="repos-grid">
        <RepoCard 
          v-for="repo in filteredRepos" 
          :key="repo.id"
          :repo="repo"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredRepos.length === 0" class="empty">
        <p>Keine Repositories gefunden.</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.projects-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  margin: 0;
  color: var(--text-primary);
}

.github-link {
  color: var(--primary);
  text-decoration: none;
}

.github-link:hover {
  text-decoration: underline;
}

/* Loading */
.loading {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error */
.error {
  text-align: center;
  padding: 2rem;
  background: rgba(252, 129, 129, 0.1);
  border: 1px solid var(--error);
  border-radius: 8px;
  color: var(--error);
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--error);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Filters */
.filters {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-card);
  color: var(--text-primary);
}

.repo-count {
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Grid */
.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Empty */
.empty {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}
</style>