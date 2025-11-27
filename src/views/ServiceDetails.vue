<!-- src/views/ServiceDetails.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Service Header -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <div class="text-5xl">{{ service.icon }}</div>
          <div>
            <h1 class="text-3xl font-bold">{{ service.name }}</h1>
            <p class="text-gray-600 text-lg">{{ service.description }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-6 text-gray-600">
          <div class="flex items-center space-x-2">
            <span>⭐</span>
            <span>4.8 (250 reviews)</span>
          </div>
          <div class="flex items-center space-x-2">
            <span>⏱️</span>
            <span>1-2 hours</span>
          </div>
          <div class="flex items-center space-x-2">
            <span>💰</span>
            <span>Starting at $50</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Service Description -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-2xl font-bold mb-4">Service Description</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ service.longDescription }}
            </p>
          </div>

          <!-- Providers List -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-2xl font-bold mb-6">Available Providers</h2>
            <div class="space-y-4">
              <ProviderCard 
                v-for="provider in providers"
                :key="provider.id"
                :provider="provider"
              />
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 class="text-xl font-bold mb-4">Book This Service</h3>
            <button 
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold"
              @click="bookService"
            >
              Book Now
            </button>
            
            <div class="mt-6 space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Starting Price</span>
                <span class="font-semibold">$50</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Duration</span>
                <span class="font-semibold">1-2 hours</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Availability</span>
                <span class="font-semibold text-green-600">Available Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProviderCard from '../components/ProviderCard.vue'

interface Service {
  id: number
  name: string
  description: string
  longDescription: string
  icon: string
}

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

const route = useRoute()
const service = ref<Service>({
  id: 0,
  name: '',
  description: '',
  longDescription: '',
  icon: ''
})


const providers = ref<Provider[]>([
  { 
    id: 1, 
    name: 'John Smith', 
    rating: 4.8, 
    reviews: 125, 
    price: 50,
    specialties: ['Leak Repair', 'Pipe Installation', 'Fixture Replacement'],
    responseTime: '15 min',
    completedJobs: 342,
    distance: '2.3 km',
    successRate: 98,
    isAvailable: true,
    isVerified: true
  },
  { 
    id: 2, 
    name: 'Mike Johnson', 
    rating: 4.9, 
    reviews: 89, 
    price: 55,
    specialties: ['Drain Cleaning', 'Water Heater', 'Emergency Service'],
    responseTime: '10 min',
    completedJobs: 287,
    distance: '1.8 km',
    successRate: 99,
    isAvailable: true,
    isVerified: true
  },
  { 
    id: 3, 
    name: 'Sarah Wilson', 
    rating: 4.7, 
    reviews: 67, 
    price: 48,
    specialties: ['General Plumbing', 'Bathroom Repair', 'Kitchen Plumbing'],
    responseTime: '20 min',
    completedJobs: 156,
    distance: '3.1 km',
    successRate: 96,
    isAvailable: false,
    isVerified: true
  }
])
// Mock service data - in real app, fetch from API
const servicesData: { [key: number]: Service } = {
  1: { 
    id: 1, 
    name: 'Plumbing', 
    description: 'Professional plumbing services',
    longDescription: 'Our professional plumbing services include fixing leaks, installing fixtures, drain cleaning, pipe repairs, water heater installation, and more. All our plumbers are certified and experienced in handling both residential and commercial plumbing issues.',
    icon: '🔧',
    startingPrice: 50,
    duration: '1-3 hours'
  },
  2: { 
    id: 2, 
    name: 'Cleaning', 
    description: 'Deep cleaning and maintenance',
    longDescription: 'Comprehensive cleaning services for your home or office. We provide deep cleaning, regular maintenance, carpet cleaning, window washing, and specialized cleaning services. Our eco-friendly cleaning products ensure a safe environment for your family.',
    icon: '🧹',
    startingPrice: 40,
    duration: '2-4 hours'
  },
  3: { 
    id: 3, 
    name: 'Electrical', 
    description: 'Electrical repairs and installations',
    longDescription: 'Professional electrical services including wiring, repairs, installations, lighting solutions, electrical panel upgrades, and safety inspections. Our licensed electricians ensure all work meets safety standards and building codes.',
    icon: '⚡',
    startingPrice: 60,
    duration: '1-2 hours'
  },
  4: { 
    id: 4, 
    name: 'Painting', 
    description: 'Interior and exterior painting',
    longDescription: 'Transform your space with our professional painting services. We offer interior and exterior painting, color consultation, surface preparation, wallpaper installation, and decorative finishes. Quality paints and expert application guaranteed.',
    icon: '🎨',
    startingPrice: 45,
    duration: '4-8 hours'
  },
  5: { 
    id: 5, 
    name: 'Carpentry', 
    description: 'Woodwork and furniture',
    longDescription: 'Expert carpentry services including custom furniture, cabinet making, shelving units, door installation, trim work, and wood repairs. We work with various wood types and can bring your woodworking ideas to life with precision and craftsmanship.',
    icon: '🪚',
    startingPrice: 55,
    duration: '2-6 hours'
  },
  6: { 
    id: 6, 
    name: 'Appliances', 
    description: 'Appliance repair and maintenance',
    longDescription: 'Comprehensive appliance repair services for refrigerators, washing machines, dryers, ovens, dishwashers, and more. We diagnose issues, provide repairs, and offer maintenance services to extend the life of your appliances.',
    icon: '🔌',
    startingPrice: 35,
    duration: '1-2 hours'
  },
  7: { 
    id: 7, 
    name: 'Rost Control', 
    description: 'Protection and prevention services',
    longDescription: 'Comprehensive rost control services including protection systems, preventive maintenance, security solutions, and damage control. We provide expert solutions to protect your property from various threats and ensure long-term safety.',
    icon: '🛡️',
    startingPrice: 75,
    duration: '2-4 hours'
  },
  8: { 
    id: 8, 
    name: 'Lamboaging', 
    description: 'Luxury vehicle maintenance',
    longDescription: 'Specialized lamboaging services for luxury and high-performance vehicles. We offer detailing, maintenance, care, and protection services to keep your luxury vehicle in pristine condition. Expert care for your premium automobile.',
    icon: '🚗',
    startingPrice: 120,
    duration: '3-5 hours'
  }
}


onMounted(() => {
  const serviceId = parseInt(route.params.id as string)
  service.value = servicesData[serviceId] || servicesData[1]
})

const bookService = () => {
  // Navigate to booking page or show booking modal
  console.log('Book service:', service.value.name)
}
</script>