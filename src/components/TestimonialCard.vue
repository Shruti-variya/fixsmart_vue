<!-- src/components/TestimonialCard.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
        <span class="text-lg">👤</span>
      </div>
      <div>
        <h4 class="font-semibold">{{ testimonial.name }}</h4>
        <div class="flex text-yellow-400">
          <span v-for="n in 5" :key="n">⭐</span>
        </div>
      </div>
    </div>
    <p class="text-gray-600 italic">"{{ testimonial.comment }}"</p>
  </div>
</template>

<script setup lang="ts">
interface Testimonial {
  id: number
  name: string
  comment: string
  rating: number
}

defineProps<{
  testimonial: Testimonial
}>()
</script>