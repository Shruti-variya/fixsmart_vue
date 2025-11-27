<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
      <p class="text-gray-600">Manage your service appointments</p>
    </div>

    <!-- Booking Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 px-1 border-b-2 font-medium text-sm transition"
            :class="activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.name }} ({{ getBookingsCount(tab.id) }})
          </button>
        </nav>
      </div>
    </div>

    <!-- Bookings List -->
    <div class="space-y-4">
      <div 
        v-for="booking in filteredBookings" 
        :key="booking.id"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
        @click="$router.push(`/dashboard/bookings/${booking.id}`)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-3xl">{{ booking.serviceIcon }}</div>
            <div>
              <h3 class="font-semibold text-gray-800 text-lg">{{ booking.serviceName }}</h3>
              <p class="text-gray-600">with {{ booking.providerName }}</p>
              <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>📅 {{ booking.date }} at {{ booking.time }}</span>
                <span>📍 {{ booking.address }}</span>
              </div>
            </div>
          </div>
          
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-800">${{ booking.totalAmount }}</div>
            <div :class="getStatusClass(booking.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
              {{ booking.status }}
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
          <button 
            v-if="booking.status === 'Pending' || booking.status === 'Accepted'"
            @click.stop="cancelBooking(booking.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
          >
            Cancel
          </button>
          <button 
            v-if="booking.status === 'Pending' || booking.status === 'Accepted'"
            @click.stop="rescheduleBooking(booking.id)"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
          >
            Reschedule
          </button>
          <button 
            v-if="booking.status === 'Completed'"
            @click.stop="$router.push('/dashboard/chat')"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
          >
            Rate Service
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
        <p class="text-gray-500 mb-6">You don't have any {{ activeTab.toLowerCase() }} bookings</p>
        <router-link to="/dashboard/book-service" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Book a Service
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Booking {
  id: number
  serviceName: string
  serviceIcon: string
  providerName: string
  date: string
  time: string
  address: string
  totalAmount: number
  status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled'
}

const router = useRouter()
const activeTab = ref<'upcoming' | 'past'>('upcoming')

const tabs = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'past', name: 'Past' }
]

const bookings = ref<Booking[]>([
  {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    providerName: 'John Smith',
    date: '15 Jan 2024',
    time: '10:00 AM',
    address: '123 Main St, Apt 4B',
    totalAmount: 100,
    status: 'Accepted'
  },
  {
    id: 2,
    serviceName: 'Cleaning',
    serviceIcon: '🧹',
    providerName: 'Sarah Wilson',
    date: '16 Jan 2024',
    time: '2:00 PM',
    address: '123 Main St, Apt 4B',
    totalAmount: 80,
    status: 'Pending'
  },
  {
    id: 3,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    providerName: 'Mike Johnson',
    date: '10 Jan 2024',
    time: '11:00 AM',
    address: '123 Main St, Apt 4B',
    totalAmount: 120,
    status: 'Completed'
  },
  {
    id: 4,
    serviceName: 'Painting',
    serviceIcon: '🎨',
    providerName: 'David Brown',
    date: '5 Jan 2024',
    time: '9:00 AM',
    address: '123 Main St, Apt 4B',
    totalAmount: 90,
    status: 'Cancelled'
  }
])

const filteredBookings = computed(() => {
  const now = new Date()
  return bookings.value.filter(booking => {
    const bookingDate = new Date(booking.date)
    if (activeTab.value === 'upcoming') {
      return bookingDate >= now && booking.status !== 'Cancelled'
    } else {
      return bookingDate < now || booking.status === 'Cancelled'
    }
  })
})

const getBookingsCount = (tabId: string) => {
  const now = new Date()
  return bookings.value.filter(booking => {
    const bookingDate = new Date(booking.date)
    if (tabId === 'upcoming') {
      return bookingDate >= now && booking.status !== 'Cancelled'
    } else {
      return bookingDate < now || booking.status === 'Cancelled'
    }
  }).length
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

const cancelBooking = (bookingId: number) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'Cancelled'
    }
  }
}

const rescheduleBooking = (bookingId: number) => {
  router.push(`/dashboard/bookings/${bookingId}?reschedule=true`)
}
</script>