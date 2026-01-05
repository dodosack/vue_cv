<script setup lang="ts">
// hacker news componente für die tech news auf der startseite
// hab die api von firebase genommen weil die offizielle doku das so empfohlen hat
import { ref, onMounted } from 'vue'

// das interface für ne einzelne story  von hackernews
interface HackerNewsStory {
  id: number
  title: string
  url?: string  // optional weil manche stories keinen link haben sondern nur text
  by: string
  score: number
  time: number
  descendants?: number  // anzahl kommentare auch optional
}

// props für wieviele stories angezeigt werden solen
const props = withDefaults(defineProps<{
  maxStories?: number
}>(), {
  maxStories: 5  // default is 5 aber in homeview mach ichs auf 6
})

// reactive state sachen
const stories = ref<HackerNewsStory[]>([])  // die stories die wir anzeiegn
const isLoading = ref(true)
const error = ref<string | null>(null)  // fehler message oder null wenns klappt

// basis url für die hacker news api
const API_BASE = 'https://hacker-news.firebaseio.com/v0'

// holt die top stories von hackernews
// erst die ids dann für jede id die details
const fetchStories = async () => {
  isLoading.value = true
  error.value = null

  try {
    // hol die ids von den top stories
    const idsResponse = await fetch(`${API_BASE}/topstories.json`)
    if (!idsResponse.ok) throw new Error('Fehler beim Laden der Story-IDs')

    const allIds: number[] = await idsResponse.json()
    const topIds = allIds.slice(0, props.maxStories)  // nur die ersten x nehmen

    // für jede id die story details holen
    // mach das parallel mit promise.all weil sonst dauerts ewig
    const storyPromises = topIds.map(async (id) => {
      const response = await fetch(`${API_BASE}/item/${id}.json`)
      return response.json()
    })

    stories.value = await Promise.all(storyPromises)

  } catch (err) {
    // error handling falls was schief geht
    error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
  } finally {
    isLoading.value = false
  }
}

// macht aus dem unix timestamp sowas wie vor 3 stunden
// hab die zahlen von stackoverflow kopiert lol
const formatTime = (timestamp: number): string => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)

  if (seconds < 60) return 'gerade eben'
  if (seconds < 3600) return `vor ${Math.floor(seconds / 60)} Min.`
  if (seconds < 86400) return `vor ${Math.floor(seconds / 3600)} Std.`
  return `vor ${Math.floor(seconds / 86400)} Tagen`
}

// holt die domain aus ner url für die anzeige
// zb aus https www.github.com bla wird github.com
const getDomain = (url?: string): string => {
  if (!url) return 'news.ycombinator.com'  // fallback wenn keine url da is
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'news.ycombinator.com'
  }
}

// lädt die stories wenn die componente gemounted wird
onMounted(() => {
  fetchStories()
})
</script>

<template>
  <div class="hacker-news">
    <div class="section-header">
      <h3>Tech News</h3>
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
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
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
  background: linear-gradient(90deg, var(--bg-card-hover) 25%, var(--border-color) 50%, var(--bg-card-hover) 75%);
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
  color: var(--error);
}

.error button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--error);
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
  background: var(--bg-card-hover);
}

.story-rank {
  color: var(--text-muted);
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
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 0.35rem;
}

.story-title:hover {
  color: var(--primary);
}

.story-title:visited {
  color: var(--text-secondary);
}

.story-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.domain {
  color: var(--primary);
}

.comments {
  color: var(--text-muted);
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
  background: var(--bg-card-hover);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
</style>