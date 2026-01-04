<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import SkillList from '@/components/SkillList.vue'

const store = useProfileStore()

// Filter State
const activeFilter = ref<string | null>(null)

// Alle Kategorien ermitteln
const categories = computed(() => {
  const cats = new Set(store.skills.map(s => s.category))
  return Array.from(cats)
})

// Filter setzen
function setFilter(category: string | null) {
  activeFilter.value = category
}
</script>

<template>
  <div class="skills-view">
    <h1>Meine Skills</h1>
    
    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <button 
        :class="{ active: activeFilter === null }"
        @click="setFilter(null)"
      >
        Alle
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat"
        :class="{ active: activeFilter === cat }"
        @click="setFilter(cat)"
      >
        {{ cat }}
      </button>
    </div>
    
    <!-- Skills Liste -->
    <SkillList 
      :skills="store.skills" 
      :filter-category="activeFilter ?? undefined"
    />
  </div>
</template>

<style scoped>
.skills-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin: 0 0 1.5rem 0;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
}

.filter-buttons button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-buttons button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
</style>