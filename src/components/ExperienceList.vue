<script setup lang="ts">
// liste von experience cards
// einfacher wrapper der alle experiences durchloopt
import ExperienceCard from './ExperienceCard.vue'
import type { Experience } from '@/types'

const props = defineProps<{
  experiences: Experience[]
}>()
</script>

<template>
  <div class="experience-list">
    <ExperienceCard 
      v-for="exp in experiences" 
      :key="exp.id"
      :experience="exp"
    />
  </div>
</template>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>