<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Providers Management</h1>
          <p class="text-gray-600">Manage service providers and their profiles</p>
        </div>
        <button class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition">
          Add New Provider
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Providers</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">45</h3>
          </div>
          <div class="text-3xl text-blue-500">🔧</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Today</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">28</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Verification</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">7</h3>
          </div>
          <div class="text-3xl text-yellow-500">⏳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Suspended</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">3</h3>
          </div>
          <div class="text-3xl text-red-500">⛔</div>
        </div>
      </div>
    </div>

    <!-- Providers Grid -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-800">All Providers</h2>
          <div class="flex space-x-3">
            <input 
              type="text" 
              placeholder="Search providers..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Services</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Cleaning</option>
              <option>Painting</option>
            </select>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="provider in providers" 
            :key="provider.id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
          >
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ getInitials(provider.name) }}
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-lg">{{ provider.name }}</h3>
                <p class="text-gray-600">{{ provider.service }}</p>
                <div class="flex items-center space-x-1 mt-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-sm text-gray-600">{{ provider.rating }} ({{ provider.reviews }})</span>
                </div>
              </div>
            </div>

            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex justify-between">
                <span>Completed Jobs:</span>
                <span class="font-semibold">{{ provider.completedJobs }}</span>
              </div>
              <div class="flex justify-between">
                <span>Earnings:</span>
                <span class="font-semibold">${{ provider.earnings }}</span>
              </div>
              <div class="flex justify-between">
                <span>Joined:</span>
                <span class="font-semibold">{{ provider.joinedDate }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <span :class="getProviderStatusClass(provider.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ provider.status }}
              </span>
              <span :class="getVerificationClass(provider.verified)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ provider.verified ? 'Verified' : 'Pending' }}
              </span>
            </div>

            <div class="flex space-x-2">
              <button class="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm">
                View
              </button>
              <button class="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm">
                Edit
              </button>
              <button 
                @click="toggleProviderStatus(provider.id)"
                :class="provider.status === 'Active' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'"
                class="flex-1 text-white py-2 rounded-lg transition text-sm"
              >
                {{ provider.status === 'Active' ? 'Suspend' : 'Activate' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Provider {
  id: number
  name: string
  service: string
  rating: number
  reviews: number
  completedJobs: number
  earnings: number
  joinedDate: string
  status: 'Active' | 'Inactive' | 'Suspended'
  verified: boolean
}

const providers = ref<Provider[]>([
  {
    id: 1,
    name: 'John Smith',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 124,
    completedJobs: 45,
    earnings: 8450,
    joinedDate: '15 Jan 2024',
    status: 'Active',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    service: 'Cleaning',
    rating: 4.9,
    reviews: 89,
    completedJobs: 32,
    earnings: 5240,
    joinedDate: '12 Jan 2024',
    status: 'Active',
    verified: true
  },
  {
    id: 3,
    name: 'Mike Johnson',
    service: 'Electrical',
    rating: 4.7,
    reviews: 67,
    completedJobs: 28,
    earnings: 6120,
    joinedDate: '10 Jan 2024',
    status: 'Inactive',
    verified: false
  },
  {
    id: 4,
    name: 'David Brown',
    service: 'Painting',
    rating: 4.6,
    reviews: 45,
    completedJobs: 22,
    earnings: 3980,
    joinedDate: '8 Jan 2024',
    status: 'Active',
    verified: true
  },
  {
    id: 5,
    name: 'Emily Davis',
    service: 'Carpentry',
    rating: 4.8,
    reviews: 78,
    completedJobs: 35,
    earnings: 6890,
    joinedDate: '5 Jan 2024',
    status: 'Suspended',
    verified: true
  },
  {
    id: 6,
    name: 'Robert Wilson',
    service: 'Plumbing',
    rating: 4.5,
    reviews: 56,
    completedJobs: 18,
    earnings: 2450,
    joinedDate: '3 Jan 2024',
    status: 'Active',
    verified: false
  }
])

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getProviderStatusClass = (status: string) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-yellow-100 text-yellow-800',
    'Suspended': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const getVerificationClass = (verified: boolean) => {
  return verified ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
}

const toggleProviderStatus = (providerId: number) => {
  const provider = providers.value.find(p => p.id === providerId)
  if (provider) {
    provider.status = provider.status === 'Active' ? 'Suspended' : 'Active'
  }
}
</script>