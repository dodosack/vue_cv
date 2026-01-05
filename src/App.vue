<script setup lang="ts">
// root componente der app
// hier wird dark mode auf die ganze app angewandt
import { useProfileStore } from '@/stores/profile'
import NavBar from '@/components/NavBar.vue'

// store für dark mode und profil daten
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