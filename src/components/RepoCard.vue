<script setup lang="ts">
import type { GitHubRepo } from '@/types'

const props = defineProps<{
  repo: GitHubRepo
}>()

// Datum formatieren
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short'
  })
}
</script>

<template>
  <article class="repo-card">
    <div class="repo-header">
      <h3>
        <a :href="repo.html_url" target="_blank" rel="noopener">
          {{ repo.name }}
        </a>
      </h3>
      <span v-if="repo.language" class="language">
        <span class="language-dot" :data-lang="repo.language"></span>
        {{ repo.language }}
      </span>
    </div>

    <p class="description">
      {{ repo.description || 'Keine Beschreibung vorhanden' }}
    </p>

    <div class="topics" v-if="repo.topics.length > 0">
      <span v-for="topic in repo.topics" :key="topic" class="topic">
        {{ topic }}
      </span>
    </div>

    <div class="repo-footer">
      <div class="stats">
        <span class="stat" title="Stars">
          ⭐ {{ repo.stargazers_count }}
        </span>
        <span class="stat" title="Forks">
          🍴 {{ repo.forks_count }}
        </span>
      </div>
      <span class="updated">
        Aktualisiert: {{ formatDate(repo.updated_at) }}
      </span>
    </div>

    <a 
      v-if="repo.homepage" 
      :href="repo.homepage" 
      target="_blank" 
      rel="noopener"
      class="demo-link"
    >
      🔗 Live Demo
    </a>
  </article>
</template>

<style scoped>
.repo-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.repo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.repo-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.repo-header a {
  color: #3b82f6;
  text-decoration: none;
}

.repo-header a:hover {
  text-decoration: underline;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: #666;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #888;
}

/* Sprach-Farben (wie auf GitHub) */
.language-dot[data-lang="TypeScript"] { background: #3178c6; }
.language-dot[data-lang="JavaScript"] { background: #f7df1e; }
.language-dot[data-lang="Vue"] { background: #42b883; }
.language-dot[data-lang="HTML"] { background: #e34c26; }
.language-dot[data-lang="CSS"] { background: #563d7c; }
.language-dot[data-lang="Python"] { background: #3572A5; }
.language-dot[data-lang="Java"] { background: #b07219; }

.description {
  color: #555;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.topic {
  padding: 0.25rem 0.6rem;
  background: #e8f4fd;
  color: #3b82f6;
  border-radius: 20px;
  font-size: 0.75rem;
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat {
  font-size: 0.85rem;
  color: #666;
}

.updated {
  font-size: 0.8rem;
  color: #999;
}

.demo-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9rem;
}

.demo-link:hover {
  text-decoration: underline;
}
</style>