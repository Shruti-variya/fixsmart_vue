<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Booking Details</h1>
          <p class="text-gray-600">Service appointment information and tracking</p>
        </div>
        <div :class="getStatusClass(booking.status)" class="px-4 py-2 rounded-full text-sm font-medium">
          {{ booking.status }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Service Information -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Service Information</h2>
          <div class="flex items-center space-x-4 mb-6">
            <div class="text-4xl">{{ booking.serviceIcon }}</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ booking.serviceName }}</h3>
              <p class="text-gray-600">with {{ booking.providerName }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Date & Time:</span>
              <p class="font-medium">{{ booking.date }} at {{ booking.time }}</p>
            </div>
            <div>
              <span class="text-gray-500">Duration:</span>
              <p class="font-medium">{{ booking.duration }} hours</p>
            </div>
            <div>
              <span class="text-gray-500">Address:</span>
              <p class="font-medium">{{ booking.address }}</p>
            </div>
            <div>
              <span class="text-gray-500">Total Amount:</span>
              <p class="font-medium text-lg">${{ booking.totalAmount }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Booking Timeline</h2>
          <div class="space-y-4">
            <div 
              v-for="event in timeline" 
              :key="event.id"
              class="flex items-start space-x-4"
            >
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                :class="event.completed ? 'bg-green-500' : 'bg-gray-300'"
              >
                {{ event.completed ? '✓' : event.step }}
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
                <p class="text-sm text-gray-600">{{ event.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ event.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Provider Information -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Service Provider</h2>
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ getInitials(booking.providerName) }}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ booking.providerName }}</h3>
              <div class="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                <div class="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{{ booking.providerRating }} ({{ booking.providerReviews }} reviews)</span>
                </div>
                <span>•</span>
                <span>{{ booking.providerCompletedJobs }} jobs completed</span>
              </div>
            </div>
            <button 
              @click="$router.push('/dashboard/chat')"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Message
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Actions -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              v-if="booking.status === 'Pending' || booking.status === 'Accepted'"
              @click="rescheduleBooking"
              class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Reschedule
            </button>
            <button 
              v-if="booking.status === 'Pending' || booking.status === 'Accepted'"
              @click="cancelBooking"
              class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Cancel Booking
            </button>
            <button 
              v-if="booking.status === 'Completed'"
              @click="rateService"
              class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-medium"
            >
              Rate Service
            </button>
            <button 
              @click="downloadInvoice"
              class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition font-medium"
            >
              Download Invoice
            </button>
          </div>
        </div>

        <!-- Support -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-semibold text-gray-800 mb-4">Need Help?</h3>
          <p class="text-sm text-gray-600 mb-4">Contact our support team for assistance</p>
          <button class="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Booking Modal -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Cancel Booking</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for cancellation</label>
          <select v-model="cancelReason" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Select a reason</option>
            <option value="schedule">Change in schedule</option>
            <option value="found-alternative">Found another provider</option>
            <option value="price">Price issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="flex space-x-3">
          <button 
            @click="showCancelModal = false"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Go Back
          </button>
          <button 
            @click="confirmCancel"
            :disabled="!cancelReason"
            class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Booking {
  id: number
  serviceName: string
  serviceIcon: string
  providerName: string
  providerRating: number
  providerReviews: number
  providerCompletedJobs: number
  date: string
  time: string
  duration: number
  address: string
  totalAmount: number
  status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled'
}

interface TimelineEvent {
  id: number
  step: number
  title: string
  description: string
  time: string
  completed: boolean
}

const route = useRoute()
const router = useRouter()
const bookingId = parseInt(route.params.id as string)

const booking = ref<Booking>({
  id: 0,
  serviceName: '',
  serviceIcon: '',
  providerName: '',
  providerRating: 0,
  providerReviews: 0,
  providerCompletedJobs: 0,
  date: '',
  time: '',
  duration: 0,
  address: '',
  totalAmount: 0,
  status: 'Pending'
})

const timeline = ref<TimelineEvent[]>([])
const showCancelModal = ref(false)
const cancelReason = ref('')

// Mock booking data
const bookingsData: { [key: number]: Booking } = {
  1: {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    providerName: 'John Smith',
    providerRating: 4.8,
    providerReviews: 125,
    providerCompletedJobs: 342,
    date: '15 Jan 2024',
    time: '10:00 AM',
    duration: 2,
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    totalAmount: 100,
    status: 'Accepted'
  },
  2: {
    id: 2,
    serviceName: 'Cleaning',
    serviceIcon: '🧹',
    providerName: 'Sarah Wilson',
    providerRating: 4.7,
    providerReviews: 89,
    providerCompletedJobs: 234,
    date: '16 Jan 2024',
    time: '2:00 PM',
    duration: 3,
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    totalAmount: 120,
    status: 'Pending'
  }
}

const getStatusClass = (status: string) => {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const initializeTimeline = () => {
  const baseTimeline = [
    { id: 1, step: 1, title: 'Booking Created', description: 'Your service request has been received', time: '2 hours ago', completed: true },
    { id: 2, step: 2, title: 'Provider Assigned', description: 'A service provider has been assigned to your booking', time: '1 hour ago', completed: booking.value.status !== 'Pending' },
    { id: 3, step: 3, title: 'Service Confirmed', description: 'Your service appointment has been confirmed', time: 'Soon', completed: booking.value.status === 'Accepted' || booking.value.status === 'Completed' },
    { id: 4, step: 4, title: 'Service Completed', description: 'The service has been successfully completed', time: 'Future', completed: booking.value.status === 'Completed' }
  ]
  
  timeline.value = baseTimeline
}

const rescheduleBooking = () => {
  router.push(`/dashboard/book-service?reschedule=${bookingId}`)
}

const cancelBooking = () => {
  showCancelModal.value = true
}

const confirmCancel = () => {
  if (cancelReason.value) {
    booking.value.status = 'Cancelled'
    timeline.value.push({
      id: timeline.value.length + 1,
      step: timeline.value.length + 1,
      title: 'Booking Cancelled',
      description: `Booking was cancelled: ${cancelReason.value}`,
      time: 'Just now',
      completed: true
    })
    showCancelModal.value = false
    cancelReason.value = ''
  }
}

const rateService = () => {
  router.push('/dashboard/chat')
}

const downloadInvoice = () => {
  alert('Invoice download functionality would be implemented here')
}

onMounted(() => {
  booking.value = bookingsData[bookingId] || bookingsData[1]
  initializeTimeline()
})
</script>