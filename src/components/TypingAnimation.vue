<script setup lang="ts">
// typing animation componente für den hero bereich
// tippt texte ein löscht sie wieder und zeigt den nächsten
import { ref, onMounted, onUnmounted } from 'vue'

// props mit default werten
const props = withDefaults(defineProps<{
  texts: string[]  // array von texten die durchgetippt werden
  typingSpeed?: number  // ms pro buchstabe beim tippen
  deletingSpeed?: number  // ms pro buchstabe beim löschen
  pauseDuration?: number  // pause nachdem text fertig getippt is
}>(), {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000
})

// state
const displayedText = ref('')  // der aktuell angezeigte text
const currentIndex = ref(0)  // welcher text gerade dran is
const isTyping = ref(true)  // ob wir gerade tippen oder löschen
const cursorVisible = ref(true)  // für das blinken

// timeout und interval referenzen zum aufräumen
let timeout: ReturnType<typeof setTimeout> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

// die eigentliche typing logik
// ruft sich selbst rekursiv auf mit setTimeout
const type = () => {
  const currentText = props.texts[currentIndex.value] ?? ''

  if (isTyping.value) {
    // text buchstabe für buchstabe tippen
    if (displayedText.value.length < currentText.length) {
      displayedText.value = currentText.slice(0, displayedText.value.length + 1)
      timeout = setTimeout(type, props.typingSpeed)
    } else {
      // fertig getippt  jetzt pause und dann löschen
      isTyping.value = false
      timeout = setTimeout(type, props.pauseDuration)
    }
  } else {
    // text buchstabe für buchstabe löschen
    if (displayedText.value.length > 0) {
      displayedText.value = displayedText.value.slice(0, -1)
      timeout = setTimeout(type, props.deletingSpeed)
    } else {
      // fertig gelöscht  nächster text
      isTyping.value = true
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      timeout = setTimeout(type, props.typingSpeed)
    }
  }
}

// lässt den cursor blinken
const startCursorBlink = () => {
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
}

// startet die animation wenn componente gemounted wird
onMounted(() => {
  type()
  startCursorBlink()
})

// räumt timeouts und intervals auf wenn componente zerstört wird
// sonst gibts memory leaks
onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <span class="typing-container">
    <span class="typed-text">{{ displayedText }}</span>
    <span class="cursor" :class="{ visible: cursorVisible }">|</span>
  </span>
</template>

<style scoped>
.typing-container {
  display: inline-flex;
  align-items: center;
}

.typed-text {
  color: inherit;
}

.cursor {
  color: var(--primary);
  font-weight: 300;
  margin-left: 2px;
  opacity: 0;
  transition: opacity 0.1s;
}

.cursor.visible {
  opacity: 1;
}
</style>