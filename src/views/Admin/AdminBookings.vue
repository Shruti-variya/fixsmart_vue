<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Bookings Management</h1>
          <p class="text-gray-600">Manage all service bookings and appointments</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Bookings</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">156</h3>
          </div>
          <div class="text-3xl text-blue-500">📅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">89</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">45</h3>
          </div>
          <div class="text-3xl text-yellow-500">⏳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Cancelled</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">22</h3>
          </div>
          <div class="text-3xl text-red-500">❌</div>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-800">All Bookings</h2>
          <div class="flex space-x-3">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search bookings..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <select 
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="booking in filteredBookings" 
              :key="booking.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ booking.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-lg">{{ booking.serviceIcon }}</div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ booking.serviceName }}</div>
                    <div class="text-sm text-gray-500">{{ booking.duration }} hours</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ booking.customerName }}</div>
                <div class="text-sm text-gray-500">{{ booking.customerPhone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ booking.providerName }}</div>
                <div class="text-sm text-gray-500">Rating: {{ booking.providerRating }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ booking.date }}</div>
                <div class="text-sm text-gray-500">{{ booking.time }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ booking.amount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(booking.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">View</button>
                  <button 
                    v-if="booking.status === 'Pending'"
                    @click="updateBookingStatus(booking.id, 'Confirmed')"
                    class="text-green-600 hover:text-green-900"
                  >
                    Confirm
                  </button>
                  <button 
                    v-if="booking.status === 'Pending' || booking.status === 'Confirmed'"
                    @click="updateBookingStatus(booking.id, 'Cancelled')"
                    class="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📅</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
        <p class="text-gray-500">Try adjusting your search or filters</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Booking {
  id: number
  serviceName: string
  serviceIcon: string
  duration: number
  customerName: string
  customerPhone: string
  providerName: string
  providerRating: number
  date: string
  time: string
  amount: number
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled'
}

const bookings = ref<Booking[]>([
  {
    id: 1001,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    duration: 2,
    customerName: 'John Doe',
    customerPhone: '+1 (555) 123-4567',
    providerName: 'Mike Smith',
    providerRating: 4.8,
    date: '15 Jan 2024',
    time: '10:00 AM',
    amount: 120,
    status: 'Completed'
  },
  {
    id: 1002,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    duration: 3,
    customerName: 'Sarah Wilson',
    customerPhone: '+1 (555) 234-5678',
    providerName: 'David Brown',
    providerRating: 4.7,
    date: '16 Jan 2024',
    time: '2:00 PM',
    amount: 180,
    status: 'In Progress'
  },
  {
    id: 1003,
    serviceName: 'Cleaning',
    serviceIcon: '🧹',
    duration: 2,
    customerName: 'Mike Johnson',
    customerPhone: '+1 (555) 345-6789',
    providerName: 'Emily Davis',
    providerRating: 4.9,
    date: '17 Jan 2024',
    time: '11:00 AM',
    amount: 90,
    status: 'Pending'
  },
  {
    id: 1004,
    serviceName: 'Painting',
    serviceIcon: '🎨',
    duration: 4,
    customerName: 'Robert Wilson',
    customerPhone: '+1 (555) 456-7890',
    providerName: 'Chris Martin',
    providerRating: 4.6,
    date: '18 Jan 2024',
    time: '9:00 AM',
    amount: 220,
    status: 'Confirmed'
  },
  {
    id: 1005,
    serviceName: 'Rost Control',
    serviceIcon: '🛡️',
    duration: 2,
    customerName: 'Lisa Anderson',
    customerPhone: '+1 (555) 567-8901',
    providerName: 'Security Pro',
    providerRating: 4.8,
    date: '14 Jan 2024',
    time: '3:00 PM',
    amount: 130,
    status: 'Completed'
  },
  {
    id: 1006,
    serviceName: 'Lamboaging',
    serviceIcon: '🚗',
    duration: 3,
    customerName: 'James Wilson',
    customerPhone: '+1 (555) 678-9012',
    providerName: 'Auto Experts',
    providerRating: 4.9,
    date: '13 Jan 2024',
    time: '1:00 PM',
    amount: 280,
    status: 'Cancelled'
  }
])

const searchQuery = ref('')
const statusFilter = ref('')

const filteredBookings = computed(() => {
  return bookings.value.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      booking.id.toString().includes(searchQuery.value)
    
    const matchesStatus = !statusFilter.value || booking.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const getStatusClass = (status: string) => {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-purple-100 text-purple-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const updateBookingStatus = (bookingId: number, newStatus: string) => {
  const booking = bookings.value.find(b => b.id === bookingId)
  if (booking) {
    booking.status = newStatus as any
  }
}
</script>