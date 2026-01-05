<script setup lang="ts">
// einzelner skill mit fortschrittsbalken
// zeigt name level und ne progress bar
import type { Skill } from '@/types'

// bekommt einen skill als prop
const props = defineProps<{
  skill: Skill
}>()
</script>

<template>
  <div class="skill-badge">
    <span class="skill-name">{{ skill.name }}</span>
    <div class="skill-bar">
      <div 
        class="skill-progress" 
        :style="{ width: skill.level + '%' }"
      ></div>
    </div>
    <span class="skill-level">{{ skill.level }}%</span>
  </div>
</template>

<style scoped>
.skill-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.skill-name {
  width: 120px;
  font-weight: 500;
  color: var(--text-primary);
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.skill-level {
  width: 45px;
  text-align: right;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>