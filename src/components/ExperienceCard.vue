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
  background: var(--bg-card);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--border-color);
  position: relative;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.experience-card.current {
  border-left-color: var(--primary);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: var(--border-color);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.5rem;
  transition: background 0.3s ease;
}

.current .timeline-dot {
  background: var(--primary);
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
  color: var(--text-primary);
}

.date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  white-space: nowrap;
}

.company {
  color: var(--primary);
  margin: 0.25rem 0 0.75rem 0;
  font-weight: 500;
}

.description {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}
</style>