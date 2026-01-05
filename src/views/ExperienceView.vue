<script setup lang="ts">
// erfahrung seite mit allen jobs
// ziemlich simpel nur die liste rendern
import { useProfileStore } from '@/stores/profile'
import ExperienceList from '@/components/ExperienceList.vue'

const store = useProfileStore()
</script>

<template>
  <div class="experience-view">
    <h1>Berufserfahrung</h1>
    <ExperienceList :experiences="store.experiences" />
  </div>
</template>

<style scoped>
.experience-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}
</style>