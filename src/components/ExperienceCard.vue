<script setup lang="ts">
import { computed } from 'vue'
import type { Experience } from '@/types'

const props = defineProps<{
  experience: Experience
}>()

// Datum formatieren
const formatDate = (date: string | null): string => {
  if (!date) return 'Heute'
  const [year, month] = date.split('-')
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
  return `${months[parseInt(month) - 1]} ${year}`
}

const dateRange = computed(() => {
  const start = formatDate(props.experience.startDate)
  const end = formatDate(props.experience.endDate)
  return `${start} - ${end}`
})

const isCurrentJob = computed(() => props.experience.endDate === null)
</script>

<template>
  <article class="experience-card" :class="{ current: isCurrentJob }">
    <div class="timeline-dot"></div>
    
    <div class="card-content">
      <div class="card-header">
        <h3>{{ experience.position }}</h3>
        <span class="date">{{ dateRange }}</span>
      </div>
      
      <p class="company">{{ experience.company }}</p>
      <p class="description">{{ experience.description }}</p>
      
      <span v-if="isCurrentJob" class="badge">Aktuell</span>
    </div>
  </article>
</template>

<style scoped>
.experience-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #e0e0e0;
  position: relative;
}

.experience-card.current {
  border-left-color: #3b82f6;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: #e0e0e0;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.current .timeline-dot {
  background: #3b82f6;
}

.card-content {
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
}

.company {
  color: #3b82f6;
  margin: 0.25rem 0 0.75rem 0;
  font-weight: 500;
}

.description {
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: #e8f4fd;
  color: #3b82f6;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}
</style>