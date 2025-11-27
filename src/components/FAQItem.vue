<!-- src/components/FAQItem.vue -->
<template>
  <div class="border-b border-gray-200 py-4">
    <button 
      class="flex justify-between items-center w-full text-left font-semibold text-lg"
      @click="isOpen = !isOpen"
    >
      {{ faq.question }}
      <span class="text-xl">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <div v-if="isOpen" class="mt-2 text-gray-600">
      {{ faq.answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FAQ {
  id: number
  question: string
  answer: string
}

defineProps<{
  faq: FAQ
}>()

const isOpen = ref(false)
</script>