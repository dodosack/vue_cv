<script setup lang="ts">
import type { Skill } from '@/types'

// Props definieren
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
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.skill-level {
  width: 45px;
  text-align: right;
  color: #666;
  font-size: 0.9rem;
}
</style>