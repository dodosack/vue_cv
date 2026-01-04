<script setup lang="ts">
import type { Profile } from '@/types'

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
  background: #f8f9fa;
  border-radius: 12px;
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
  background: #3b82f6;
  color: white;
  font-size: 3rem;
  font-weight: bold;
}

.profile-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.title {
  color: #3b82f6;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.location {
  color: #666;
  margin: 0 0 1rem 0;
}

.bio {
  color: #444;
  line-height: 1.6;
  margin: 0;
}
</style>