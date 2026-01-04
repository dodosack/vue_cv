<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">
      <RouterLink to="/">{{ store.profile.name }}</RouterLink>
    </div>
    
    <div class="nav-links">
      <RouterLink to="/" exact-active-class="active">Home</RouterLink>
      <RouterLink to="/skills" active-class="active">Skills</RouterLink>
      <RouterLink to="/experience" active-class="active">Erfahrung</RouterLink>
      <RouterLink to="/projects" active-class="active">Projekte</RouterLink>
    </div>
    
    <button class="theme-toggle" @click="store.toggleDarkMode">
      {{ store.darkMode ? '☀️' : '🌙' }}
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand a {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: #3b82f6;
}

.nav-links a.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.theme-toggle:hover {
  background: #f0f0f0;
}
</style>