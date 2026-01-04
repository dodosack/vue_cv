<script setup lang="ts">
import { computed } from 'vue'
import SkillBadge from './SkillBadge.vue'
import type { Skill } from '@/types'

// Props definieren
const props = defineProps<{
  skills: Skill[]
  filterCategory?: string    // optional: nur bestimmte Kategorie zeigen
}>()

// Gefilterte Skills (Getter-Logik in der Komponente)
const filteredSkills = computed(() => {
  if (!props.filterCategory) {
    return props.skills
  }
  return props.skills.filter(s => s.category === props.filterCategory)
})
</script>

<template>
  <div class="skill-list">
    <SkillBadge 
      v-for="skill in filteredSkills" 
      :key="skill.name"
      :skill="skill"
    />
    
    <!-- Falls keine Skills vorhanden -->
    <p v-if="filteredSkills.length === 0" class="no-skills">
      Keine Skills gefunden.
    </p>
  </div>
</template>

<style scoped>
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.no-skills {
  color: var(--text-muted);
  font-style: italic;
}
</style>