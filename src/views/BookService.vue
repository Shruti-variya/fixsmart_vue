<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Book a Service</h1>
      <p class="text-sm sm:text-base text-gray-600">Book professional home services in few simple steps</p>
    </div>

    <!-- Progress Steps -->
    <div class="mb-6 sm:mb-8">
      <div class="flex items-center justify-between overflow-x-auto pb-2">
        <div v-for="(step, index) in steps" :key="step.id" class="flex items-center flex-shrink-0">
          <div class="flex flex-col items-center">
            <div 
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base transition"
              :class="getStepClass(step)"
            >
              {{ step.completed ? '✓' : index + 1 }}
            </div>
            <span class="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 text-center whitespace-nowrap px-1">
              {{ step.title }}
            </span>
          </div>
          <div v-if="index < steps.length - 1" class="w-12 sm:w-16 lg:w-24 h-1 mx-2 sm:mx-4 flex-shrink-0" 
               :class="step.completed ? 'bg-blue-500' : 'bg-gray-300'"></div>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <!-- Step 1: Select Service -->
      <div v-if="currentStep === 1" class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Select Service</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition hover:border-blue-500"
            :class="selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
            @click="selectService(service)"
          >
            <div class="flex items-center space-x-3">
              <div class="text-xl sm:text-2xl">{{ service.icon }}</div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-800 text-sm sm:text-base truncate">{{ service.name }}</h3>
                <p class="text-xs sm:text-sm text-gray-600">Starting at ${{ service.startingPrice }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end pt-4">
          <button 
            @click="nextStep"
            :disabled="!selectedService"
            class="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Next: Choose Provider
          </button>
        </div>
      </div>

      <!-- Step 2: Choose Provider -->
      <div v-if="currentStep === 2" class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Choose Provider</h2>
        <div class="space-y-3 sm:space-y-4">
          <div 
            v-for="provider in providers" 
            :key="provider.id"
            class="border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition hover:border-blue-500"
            :class="selectedProvider?.id === provider.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
            @click="selectProvider(provider)"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {{ getInitials(provider.name) }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-800 text-sm sm:text-base">{{ provider.name }}</h3>
                  <div class="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <span>⭐ {{ provider.rating }}</span>
                    <span>({{ provider.reviews }} reviews)</span>
                  </div>
                </div>
              </div>
              <div class="text-left sm:text-right">
                <div class="text-base sm:text-lg font-bold text-gray-800">${{ provider.price }}/hr</div>
                <div class="text-xs sm:text-sm text-green-600">Available Today</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <button @click="prevStep" class="w-full sm:w-auto bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition text-sm sm:text-base order-2 sm:order-1">
            Back
          </button>
          <button 
            @click="nextStep"
            :disabled="!selectedProvider"
            class="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
          >
            Next: Date & Time
          </button>
        </div>
      </div>

      <!-- Step 3: Date & Time -->
      <div v-if="currentStep === 3" class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Pick Date & Time</h2>
        
        <!-- Date Selection -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Select Date</label>
          <div class="grid grid-cols-7 gap-1 sm:gap-2">
            <div 
              v-for="day in availableDates" 
              :key="day.date"
              class="text-center p-2 sm:p-3 rounded-lg cursor-pointer transition text-xs sm:text-sm"
              :class="selectedDate === day.date ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              @click="selectDate(day.date)"
            >
              <div class="text-xs">{{ day.day }}</div>
              <div class="font-semibold mt-1">{{ day.date.split(' ')[1] }}</div>
            </div>
          </div>
        </div>

        <!-- Time Slots -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Select Time Slot</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            <div 
              v-for="slot in timeSlots" 
              :key="slot"
              class="text-center p-2 sm:p-3 rounded-lg border cursor-pointer transition text-xs sm:text-sm"
              :class="selectedTime === slot ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-blue-300'"
              @click="selectTime(slot)"
            >
              {{ slot }}
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <button @click="prevStep" class="w-full sm:w-auto bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition text-sm sm:text-base order-2 sm:order-1">
            Back
          </button>
          <button 
            @click="nextStep"
            :disabled="!selectedDate || !selectedTime"
            class="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
          >
            Next: Address & Payment
          </button>
        </div>
      </div>

      <!-- Step 4: Address & Payment -->
      <div v-if="currentStep === 4" class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Address & Payment</h2>
        
        <!-- Address -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Address</label>
          <input 
            type="text" 
            v-model="bookingAddress"
            placeholder="Enter your address"
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
        </div>

        <!-- Payment Method -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Payment Method</label>
          <div class="space-y-2 sm:space-y-3">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id"
              class="border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition"
              :class="selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
              @click="selectedPayment = method.id"
            >
              <div class="flex items-center space-x-3">
                <div class="text-lg sm:text-xl">{{ method.icon }}</div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-800 text-sm sm:text-base">{{ method.name }}</h3>
                  <p class="text-xs sm:text-sm text-gray-600">{{ method.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Summary -->
        <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 class="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Booking Summary</h3>
          <div class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div class="flex justify-between">
              <span>Service:</span>
              <span class="font-semibold">{{ selectedService?.name }}</span>
            </div>
            <div class="flex justify-between">
              <span>Provider:</span>
              <span class="font-semibold">{{ selectedProvider?.name }}</span>
            </div>
            <div class="flex justify-between">
              <span>Date & Time:</span>
              <span class="font-semibold">{{ selectedDate }} at {{ selectedTime }}</span>
            </div>
            <div class="flex justify-between">
              <span>Duration:</span>
              <span class="font-semibold">2 hours</span>
            </div>
            <div class="flex justify-between text-sm sm:text-lg font-bold border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${{ selectedProvider?.price ? selectedProvider.price * 2 : 0 }}</span>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <button @click="prevStep" class="w-full sm:w-auto bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition text-sm sm:text-base order-2 sm:order-1">
            Back
          </button>
          <button 
            @click="confirmBooking"
            :disabled="!bookingAddress || !selectedPayment"
            class="w-full sm:w-auto bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Service {
  id: number
  name: string
  icon: string
  startingPrice: number
}

interface Provider {
  id: number
  name: string
  rating: number
  reviews: number
  price: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
}

const router = useRouter()

// Step management
const currentStep = ref(1)
const steps = ref([
  { id: 1, title: 'Service', completed: false },
  { id: 2, title: 'Provider', completed: false },
  { id: 3, title: 'Date & Time', completed: false },
  { id: 4, title: 'Address & Payment', completed: false }
])

// Booking data
const selectedService = ref<Service | null>(null)
const selectedProvider = ref<Provider | null>(null)
const selectedDate = ref<string>('')
const selectedTime = ref<string>('')
const bookingAddress = ref<string>('')
const selectedPayment = ref<string>('')

// Mock data
const services = ref<Service[]>([
  { id: 1, name: 'Plumbing', icon: '🔧', startingPrice: 50 },
  { id: 2, name: 'Cleaning', icon: '🧹', startingPrice: 40 },
  { id: 3, name: 'Electrical', icon: '⚡', startingPrice: 60 },
  { id: 4, name: 'Painting', icon: '🎨', startingPrice: 45 },
  { id: 5, name: 'Carpentry', icon: '🪚', startingPrice: 55 },
  { id: 6, name: 'Appliances', icon: '🔌', startingPrice: 35 },
  { id: 7, name: 'Rost Control', icon: '🛡️', startingPrice: 65 },
  { id: 8, name: 'Lamboaging', icon: '🚗', startingPrice: 120 }
])

const providers = ref<Provider[]>([
  { id: 1, name: 'John Smith', rating: 4.8, reviews: 125, price: 50 },
  { id: 2, name: 'Mike Johnson', rating: 4.9, reviews: 89, price: 55 },
  { id: 3, name: 'Sarah Wilson', rating: 4.7, reviews: 67, price: 48 }
])

const paymentMethods = ref<PaymentMethod[]>([
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when service is completed' },
  { id: 'wallet', name: 'Wallet', icon: '💰', description: 'Use your FixSmart wallet balance' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay securely with your card' }
])

// Date and time data
const availableDates = ref([
  { day: 'Mon', date: '15 Jan' },
  { day: 'Tue', date: '16 Jan' },
  { day: 'Wed', date: '17 Jan' },
  { day: 'Thu', date: '18 Jan' },
  { day: 'Fri', date: '19 Jan' },
  { day: 'Sat', date: '20 Jan' },
  { day: 'Sun', date: '21 Jan' }
])

const timeSlots = ref([
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
])

// Methods
const getStepClass = (step: any) => {
  if (step.completed) return 'bg-green-500'
  if (step.id === currentStep.value) return 'bg-blue-500'
  return 'bg-gray-300'
}

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    steps.value[currentStep.value - 1].completed = true
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const selectService = (service: Service) => {
  selectedService.value = service
}

const selectProvider = (provider: Provider) => {
  selectedProvider.value = provider
}

const selectDate = (date: string) => {
  selectedDate.value = date
}

const selectTime = (time: string) => {
  selectedTime.value = time
}

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const confirmBooking = () => {
  console.log('Booking confirmed:', {
    service: selectedService.value,
    provider: selectedProvider.value,
    date: selectedDate.value,
    time: selectedTime.value,
    address: bookingAddress.value,
    payment: selectedPayment.value
  })
  
  router.push('/dashboard/bookings')
}
</script>