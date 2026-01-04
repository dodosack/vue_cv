<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import NavBar from '@/components/NavBar.vue'

const store = useProfileStore()
</script>

<template>
  <div class="app" :class="{ dark: store.darkMode }">
    <NavBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background: var(--bg-main);
  transition: background 0.3s ease;
}

main {
  min-height: calc(100vh - 70px);
}
</style>