<script setup lang="ts">
// skills seite mit filter buttons
// zeigt alle skills mit progress bars
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import SkillList from '@/components/SkillList.vue'

const store = useProfileStore()

// welcher filter gerade aktiv is  null heisst alle
const activeFilter = ref<string | null>(null)

// holt alle kategorien aus den skills
// mit Set damit keine duplikate
const categories = computed(() => {
  const cats = new Set(store.skills.map(s => s.category))
  return Array.from(cats)
})

// setzt den aktiven filter wenn man auf nen button klickt
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
  color: var(--text-primary);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
}

.filter-buttons button:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-buttons button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
</style>