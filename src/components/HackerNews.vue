<script setup lang="ts">
import { ref, onMounted } from 'vue'

// TypeScript Interface
interface HackerNewsStory {
  id: number
  title: string
  url?: string
  by: string
  score: number
  time: number
  descendants?: number  // Anzahl Kommentare
}

// Props
const props = withDefaults(defineProps<{
  maxStories?: number
}>(), {
  maxStories: 5
})

// State
const stories = ref<HackerNewsStory[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Hacker News API URLs
const API_BASE = 'https://hacker-news.firebaseio.com/v0'

// Stories laden
const fetchStories = async () => {
  isLoading.value = true
  error.value = null

  try {
    // 1. Top Story IDs holen
    const idsResponse = await fetch(`${API_BASE}/topstories.json`)
    if (!idsResponse.ok) throw new Error('Fehler beim Laden der Story-IDs')
    
    const allIds: number[] = await idsResponse.json()
    const topIds = allIds.slice(0, props.maxStories)

    // 2. Details für jede Story holen
    const storyPromises = topIds.map(async (id) => {
      const response = await fetch(`${API_BASE}/item/${id}.json`)
      return response.json()
    })

    stories.value = await Promise.all(storyPromises)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
  } finally {
    isLoading.value = false
  }
}

// Zeit formatieren (Unix Timestamp → "vor X Stunden")
const formatTime = (timestamp: number): string => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  
  if (seconds < 60) return 'gerade eben'
  if (seconds < 3600) return `vor ${Math.floor(seconds / 60)} Min.`
  if (seconds < 86400) return `vor ${Math.floor(seconds / 3600)} Std.`
  return `vor ${Math.floor(seconds / 86400)} Tagen`
}

// Domain aus URL extrahieren
const getDomain = (url?: string): string => {
  if (!url) return 'news.ycombinator.com'
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'news.ycombinator.com'
  }
}

// Lifecycle
onMounted(() => {
  fetchStories()
})
</script>

<template>
  <div class="hacker-news">
    <div class="section-header">
      <h3>🔥 Tech News</h3>
      <span class="source">via Hacker News</span>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading">
      <div class="skeleton" v-for="n in maxStories" :key="n"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
      <button @click="fetchStories">Erneut versuchen</button>
    </div>

    <!-- Stories -->
    <div v-else class="stories-list">
      <article 
        v-for="(story, index) in stories" 
        :key="story.id"
        class="story-item"
      >
        <span class="story-rank">{{ index + 1 }}</span>
        
        <div class="story-content">
          <a 
            :href="story.url || `https://news.ycombinator.com/item?id=${story.id}`"
            target="_blank"
            rel="noopener"
            class="story-title"
          >
            {{ story.title }}
          </a>
          
          <div class="story-meta">
            <span class="domain">({{ getDomain(story.url) }})</span>
            <span class="points">{{ story.score }} Punkte</span>
            <span class="author">von {{ story.by }}</span>
            <span class="time">{{ formatTime(story.time) }}</span>
            <a 
              :href="`https://news.ycombinator.com/item?id=${story.id}`"
              target="_blank"
              rel="noopener"
              class="comments"
            >
              {{ story.descendants || 0 }} Kommentare
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- Refresh Button -->
    <button 
      v-if="!isLoading && !error" 
      @click="fetchStories" 
      class="refresh-btn"
    >
      🔄 Aktualisieren
    </button>
  </div>
</template>

<style scoped>
.hacker-news {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.section-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.source {
  font-size: 0.8rem;
  color: #ff6600;
  font-weight: 500;
}

/* Loading Skeleton */
.loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Error */
.error {
  text-align: center;
  padding: 2rem;
  color: #c00;
}

.error button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #c00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Stories List */
.stories-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.story-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.story-item:hover {
  background: #f8f9fa;
}

.story-rank {
  color: #999;
  font-weight: 500;
  min-width: 1.5rem;
  text-align: right;
}

.story-content {
  flex: 1;
  min-width: 0;
}

.story-title {
  display: block;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 0.35rem;
}

.story-title:hover {
  color: #3b82f6;
}

.story-title:visited {
  color: #666;
}

.story-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
}

.domain {
  color: #3b82f6;
}

.comments {
  color: #888;
  text-decoration: none;
}

.comments:hover {
  text-decoration: underline;
}

/* Refresh Button */
.refresh-btn {
  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
</style>