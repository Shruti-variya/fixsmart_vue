<!-- src/components/ServiceCard.vue -->
<template>
  <div 
    class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 text-center"
    @click="$router.push(`/services/${service.id}`)"
  >
    <div class="text-4xl mb-4">{{ service.icon }}</div>
    <h3 class="text-xl font-semibold mb-2">{{ service.name }}</h3>
    <p class="text-gray-600">{{ service.description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Service {
  id: number
  name: string
  description: string
  icon: string
}

defineProps<{
  service: Service
}>()
</script>