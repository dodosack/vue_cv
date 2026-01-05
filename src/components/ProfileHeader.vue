<script setup lang="ts">
// profil header mit bild name und bio
// wird grad nicht verwendet aber vielleicht später
import type { Profile } from '@/types'

// bekommt profil daten als prop
const props = defineProps<{
  profile: Profile
}>()
</script>

<template>
  <header class="profile-header">
    <div class="profile-image">
      <img 
        v-if="profile.image" 
        :src="profile.image" 
        :alt="profile.name"
      />
      <div v-else class="placeholder">
        {{ profile.name.charAt(0) }}
      </div>
    </div>
    
    <div class="profile-info">
      <h1>{{ profile.name }}</h1>
      <p class="title">{{ profile.title }}</p>
      <p class="location">📍 {{ profile.location }}</p>
      <p class="bio">{{ profile.bio }}</p>
    </div>
  </header>
</template>

<style scoped>
.profile-header {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: var(--bg-card);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.profile-image img,
.profile-image .placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  color: white;
  font-size: 3rem;
  font-weight: bold;
}

.profile-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: var(--text-primary);
}

.title {
  color: var(--primary);
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.location {
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

.bio {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>