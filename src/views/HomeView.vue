<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import ProfileHeader from '@/components/ProfileHeader.vue'
import SkillList from '@/components/SkillList.vue'
import ExperienceCard from '@/components/ExperienceCard.vue'
import TypingAnimation from '@/components/TypingAnimation.vue'
import HackerNews from '@/components/HackerNews.vue'

const store = useProfileStore()

// Texte für die Typing Animation
const typingTexts = [
  'Frontend Developer',
  'Vue.js Enthusiast',
  'TypeScript Fan',
  'Problem Solver',
  'Creative Coder'
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section mit Typing Animation -->
    <section class="hero">
      <div class="hero-content">
        <p class="greeting">Hallo, ich bin</p>
        <h1 class="name">{{ store.profile.name }}</h1>
        <div class="title-wrapper">
          <TypingAnimation 
            :texts="typingTexts"
            :typing-speed="80"
            :deleting-speed="40"
            :pause-duration="2500"
          />
        </div>
        <p class="bio">{{ store.profile.bio }}</p>
        
        <div class="hero-buttons">
          <RouterLink to="/projects" class="btn btn-primary">
            Meine Projekte
          </RouterLink>
          <RouterLink to="/experience" class="btn btn-secondary">
            Erfahrung
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <section class="preview-section">
          <h2>⚡ Top Skills</h2>
          <SkillList :skills="store.skills.slice(0, 4)" />
          <RouterLink to="/skills" class="see-more">
            Alle Skills ansehen →
          </RouterLink>
        </section>

        <section class="preview-section">
          <h2>💼 Aktuelle Position</h2>
          <ExperienceCard 
            v-if="store.currentJob" 
            :experience="store.currentJob" 
          />
          <RouterLink to="/experience" class="see-more">
            Kompletter Werdegang →
          </RouterLink>
        </section>
      </div>

      <!-- Right Column: Hacker News -->
      <div class="right-column">
        <HackerNews :max-stories="6" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.greeting {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
}

.name {
  font-size: 3rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.title-wrapper {
  font-size: 1.5rem;
  min-height: 2.5rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.bio {
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Preview Sections */
.preview-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-section h2 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
}

.see-more {
  display: inline-block;
  margin-top: 1rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.see-more:hover {
  text-decoration: underline;
}
</style>