<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = withDefaults(defineProps<{
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}>(), {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000
})

// State
const displayedText = ref('')
const currentIndex = ref(0)
const isTyping = ref(true)
const cursorVisible = ref(true)

let timeout: ReturnType<typeof setTimeout> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

// Typing Logik
const type = () => {
  const currentText = props.texts[currentIndex.value]
  
  if (isTyping.value) {
    // Text tippen
    if (displayedText.value.length < currentText.length) {
      displayedText.value = currentText.slice(0, displayedText.value.length + 1)
      timeout = setTimeout(type, props.typingSpeed)
    } else {
      // Fertig getippt → Pause → dann löschen
      isTyping.value = false
      timeout = setTimeout(type, props.pauseDuration)
    }
  } else {
    // Text löschen
    if (displayedText.value.length > 0) {
      displayedText.value = displayedText.value.slice(0, -1)
      timeout = setTimeout(type, props.deletingSpeed)
    } else {
      // Fertig gelöscht → nächster Text
      isTyping.value = true
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      timeout = setTimeout(type, props.typingSpeed)
    }
  }
}

// Cursor blinken
const startCursorBlink = () => {
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
}

// Lifecycle
onMounted(() => {
  type()
  startCursorBlink()
})

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
  color: #3b82f6;
  font-weight: 300;
  margin-left: 2px;
  opacity: 0;
  transition: opacity 0.1s;
}

.cursor.visible {
  opacity: 1;
}
</style>