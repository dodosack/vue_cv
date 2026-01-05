<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Meme Interface
interface Meme {
  title: string
  url: string
  postLink: string
  subreddit: string
  author: string
  ups: number
}

// State
const meme = ref<Meme | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const showMeme = ref(false)

// Meme laden
const fetchMeme = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch('https://meme-api.com/gimme/ProgrammerHumor')
    if (!response.ok) throw new Error('Fehler beim Laden des Memes')

    const data = await response.json()
    meme.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
  } finally {
    isLoading.value = false
  }
}

// Meme anzeigen/verbergen
const toggleMeme = () => {
  showMeme.value = !showMeme.value
  if (showMeme.value && !meme.value) {
    fetchMeme()
  }
}

// Neues Meme laden
const loadNewMeme = () => {
  fetchMeme()
}
</script>

<template>
  <div class="programmer-meme">
    <div class="meme-header">
      <h3>Dev Humor</h3>
      <button
        class="toggle-btn"
        @click="toggleMeme"
      >
        {{ showMeme ? 'Verstecken' : 'Meme zeigen' }}
      </button>
    </div>

    <div v-if="showMeme" class="meme-content">
      <!-- Loading -->
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Lade Meme...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchMeme">Erneut versuchen</button>
      </div>

      <!-- Meme Content -->
      <template v-else-if="meme">
        <h4 class="meme-title">{{ meme.title }}</h4>

        <div class="meme-image-container">
          <img
            :src="meme.url"
            :alt="meme.title"
            class="meme-image"
            loading="lazy"
          />
        </div>

        <div class="meme-footer">
          <div class="meme-stats">
            <span class="upvotes">⬆️ {{ meme.ups }}</span>
            <span class="author">u/{{ meme.author }}</span>
          </div>

          <div class="meme-actions">
            <a
              :href="meme.postLink"
              target="_blank"
              rel="noopener"
              class="reddit-link"
            >
              Reddit öffnen
            </a>
            <button @click="loadNewMeme" class="refresh-btn">
              🔄 Neues Meme
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Collapsed State -->
    <p v-else class="collapsed-hint">
      Klicke auf "Meme zeigen" für etwas Programmier-Humor!
    </p>
  </div>
</template>

<style scoped>
.programmer-meme {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.meme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.meme-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.toggle-btn {
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.collapsed-hint {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  padding: 1rem 0;
}

/* Loading */
.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 0.75rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error */
.error {
  text-align: center;
  padding: 1.5rem;
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

/* Meme Content */
.meme-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.meme-image-container {
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-card-hover);
  margin-bottom: 1rem;
}

.meme-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 400px;
  object-fit: contain;
}

.meme-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meme-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.upvotes {
  color: #ff4500;
  font-weight: 500;
}

.meme-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.reddit-link {
  padding: 0.5rem 1rem;
  background: #ff4500;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.reddit-link:hover {
  background: #e03d00;
  transform: translateY(-1px);
}

.refresh-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-card-hover);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
</style>
