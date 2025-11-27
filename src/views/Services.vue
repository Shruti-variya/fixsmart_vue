<!-- src/views/Services.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Our Services</h1>
        <p class="text-xl text-gray-600">Professional home services for all your needs</p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
      </div>

      <!-- Categories -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold mb-8">Service Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="category in categories"
            :key="category.id"
            class="bg-white p-4 rounded-lg shadow-sm border text-center hover:shadow-md transition cursor-pointer"
          >
            <div class="text-2xl mb-2">{{ category.icon }}</div>
            <h3 class="font-semibold">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ServiceCard from '../components/ServiceCard.vue'

interface Service {
  id: number
  name: string
  description: string
  icon: string
}

interface Category {
  id: number
  name: string
  icon: string
}

const services = ref<Service[]>([
  { id: 1, name: 'Plumbing', description: 'Fix leaks, install fixtures, and more', icon: '🔧' },
  { id: 2, name: 'Cleaning', description: 'Home and office cleaning services', icon: '🧹' },
  { id: 3, name: 'Electrical', description: 'Wiring, repairs, and installations', icon: '⚡' },
  { id: 4, name: 'Painting', description: 'Interior and exterior painting', icon: '🎨' },
  { id: 5, name: 'Carpentry', description: 'Furniture and woodwork', icon: '🪚' },
  { id: 6, name: 'Appliances', description: 'Fix all home appliances', icon: '🔌' },
    { id: 7, name: 'Rost Control', description: 'Remove rost and prevent infestations', icon: '🛡️' },
  { id: 8, name: 'Lamboaging', description: 'Lambo maintenance and care', icon: '✨' }
])

const categories = ref<Category[]>([
  { id: 1, name: 'Plumbing', icon: '🔧' },
  { id: 2, name: 'Cleaning', icon: '🧹' },
  { id: 3, name: 'Electrical', icon: '⚡' },
  { id: 4, name: 'Painting', icon: '🎨' },
  { id: 5, name: 'Carpentry', icon: '🪚' },
  { id: 6, name: 'Appliances', icon: '🔌' },
    { id: 7, name: 'Rost Control', icon: '🛡️' },
  { id: 8, name: 'Lamboaging', icon: '✨' }
])
</script>