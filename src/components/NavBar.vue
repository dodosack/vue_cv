<script setup lang="ts">
// navbar componente die oben auf jeder seite is
// hat die navigation links und den dark mode toggle
import { RouterLink } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()  // für dark mode toggle
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
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.nav-brand a {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
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
  background: var(--bg-card-hover);
}
</style>