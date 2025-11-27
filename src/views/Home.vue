<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Find the best home services</h1>
        <p class="text-xl mb-8 opacity-90">Professional services at your doorstep</p>
        
        <!-- Search Box -->
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2">
          <div class="flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="What service do you need?"
              class="flex-1 px-4 py-3 text-gray-800 rounded-lg border-none focus:outline-none"
            >
            <input 
              type="text" 
              placeholder="Enter your location"
              class="flex-1 px-4 py-3 text-gray-800 rounded-lg border-none focus:outline-none"
            >
            <button class="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Featured Services</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            v-for="service in featuredServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :testimonial="testimonial"
          />
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto">
          <FAQItem 
            v-for="faq in faqs"
            :key="faq.id"
            :faq="faq"
          />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ServiceCard from '../components/ServiceCard.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import FAQItem from '../components/FAQItem.vue'

interface Service {
  id: number
  name: string
  description: string
  icon: string
}

interface Testimonial {
  id: number
  name: string
  comment: string
  rating: number
}

interface FAQ {
  id: number
  question: string
  answer: string
}

const featuredServices = ref<Service[]>([
  { id: 1, name: 'Plumbing', description: 'Professional plumbing services', icon: '🔧' },
  { id: 2, name: 'Cleaning', description: 'Deep cleaning and maintenance', icon: '🧹' },
  { id: 3, name: 'Electrical', description: 'Electrical repairs and installations', icon: '⚡' },
  { id: 4, name: 'Painting', description: 'Interior and exterior painting', icon: '🎨' },
  { id: 5, name: 'Carpentry', description: 'Woodwork and furniture', icon: '🪚' },
  { id: 6, name: 'Appliances', description: 'Appliance repair and maintenance', icon: '🔌' }
])

const testimonials = ref<Testimonial[]>([
  { id: 1, name: 'John Doe', comment: 'Excellent service! The plumber was professional and fixed the issue quickly.', rating: 5 },
  { id: 2, name: 'Jane Smith', comment: 'Great cleaning service. My house has never been cleaner!', rating: 5 },
  { id: 3, name: 'Mike Johnson', comment: 'Fast and reliable electrical services. Highly recommended!', rating: 4 }
])

const faqs = ref<FAQ[]>([
  { id: 1, question: 'How do I book a service?', answer: 'You can book a service by searching for the service you need, selecting a provider, and choosing a time slot.' },
  { id: 2, question: 'What payment methods are accepted?', answer: 'We accept credit cards, debit cards, digital wallets, and cash on delivery.' },
  { id: 3, question: 'Can I cancel my booking?', answer: 'Yes, you can cancel your booking up to 2 hours before the scheduled time.' }
])
</script>