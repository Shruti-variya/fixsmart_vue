<!-- src/components/ProviderCard.vue -->
<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-4">
        <!-- Provider Avatar -->
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {{ getInitials(provider.name) }}
        </div>
        
        <!-- Provider Info -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ provider.name }}</h3>
          <div class="flex items-center space-x-2 mt-1">
            <!-- Rating -->
            <div class="flex items-center space-x-1">
              <span class="text-yellow-400">⭐</span>
              <span class="text-sm font-medium text-gray-700">{{ provider.rating }}</span>
              <span class="text-sm text-gray-500">({{ provider.reviews }} reviews)</span>
            </div>
          </div>
          
          <!-- Specialties -->
          <div class="flex flex-wrap gap-1 mt-2">
            <span 
              v-for="specialty in provider.specialties" 
              :key="specialty"
              class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {{ specialty }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Price -->
      <div class="text-right">
        <div class="text-2xl font-bold text-gray-900">${{ provider.price }}</div>
        <div class="text-sm text-gray-500">per hour</div>
      </div>
    </div>
    
    <!-- Additional Info -->
    <div class="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
      <div class="flex items-center space-x-2">
        <span>🕒</span>
        <span>Response: {{ provider.responseTime }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>✅</span>
        <span>{{ provider.completedJobs }} jobs</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>📍</span>
        <span>{{ provider.distance }} away</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>🎯</span>
        <span>{{ provider.successRate }}% success</span>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex space-x-3">
      <button 
        class="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition font-medium"
        @click="bookProvider"
      >
        Book Now
      </button>
      <button 
        class="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        @click="viewProfile"
      >
        <span class="text-lg">👤</span>
      </button>
      <button 
        class="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        @click="sendMessage"
      >
        <span class="text-lg">💬</span>
      </button>
    </div>
    
    <!-- Availability Badge -->
    <div class="mt-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div 
          :class="[
            'w-2 h-2 rounded-full',
            provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'
          ]"
        ></div>
        <span class="text-sm text-gray-600">
          {{ provider.isAvailable ? 'Available now' : 'Not available' }}
        </span>
      </div>
      
      <!-- Verified Badge -->
      <div v-if="provider.isVerified" class="flex items-center space-x-1 text-blue-600">
        <span class="text-sm">✅</span>
        <span class="text-sm font-medium">Verified</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Provider {
  id: number
  name: string
  rating: number
  reviews: number
  price: number
  specialties: string[]
  responseTime: string
  completedJobs: number
  distance: string
  successRate: number
  isAvailable: boolean
  isVerified: boolean
}

const props = defineProps<{
  provider: Provider
}>()

const router = useRouter()

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const bookProvider = () => {
  // Navigate to booking page or show booking modal
  console.log('Booking provider:', props.provider.name)
  // In real app: router.push(`/book/${props.provider.id}`)
}

const viewProfile = () => {
  console.log('Viewing profile:', props.provider.name)
  // In real app: router.push(`/providers/${props.provider.id}`)
}

const sendMessage = () => {
  console.log('Sending message to:', props.provider.name)
  // In real app: Open chat interface
}
</script>