<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Users Management</h1>
          <p class="text-gray-600">Manage platform users and their accounts</p>
        </div>
        <button class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition">
          Add New User
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Users</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">1,234</h3>
          </div>
          <div class="text-3xl text-blue-500">👥</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Today</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">89</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">New This Month</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">156</h3>
          </div>
          <div class="text-3xl text-purple-500">🆕</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Suspended</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">12</h3>
          </div>
          <div class="text-3xl text-red-500">⛔</div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-800">All Users</h2>
          <div class="flex space-x-3">
            <input 
              type="text" 
              placeholder="Search users..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="user in users" 
              :key="user.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {{ getInitials(user.name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">User ID: {{ user.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.joinedDate }}</div>
                <div class="text-sm text-gray-500">{{ user.joinedTime }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getUserStatusClass(user.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button 
                    v-if="user.status === 'Active'"
                    @click="suspendUser(user.id)"
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Suspend
                  </button>
                  <button 
                    v-else
                    @click="activateUser(user.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Activate
                  </button>
                  <button 
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">1,234</span> results
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button class="px-3 py-1 bg-purple-500 text-white rounded-md text-sm font-medium">
              1
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  phone: string
  joinedDate: string
  joinedTime: string
  status: 'Active' | 'Inactive' | 'Suspended'
  bookings: number
}

const users = ref<User[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinedDate: '15 Jan 2024',
    joinedTime: '10:30 AM',
    status: 'Active',
    bookings: 12
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 234-5678',
    joinedDate: '14 Jan 2024',
    joinedTime: '2:15 PM',
    status: 'Active',
    bookings: 8
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 345-6789',
    joinedDate: '12 Jan 2024',
    joinedTime: '4:45 PM',
    status: 'Inactive',
    bookings: 3
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 456-7890',
    joinedDate: '10 Jan 2024',
    joinedTime: '11:20 AM',
    status: 'Suspended',
    bookings: 0
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 567-8901',
    joinedDate: '8 Jan 2024',
    joinedTime: '9:15 AM',
    status: 'Active',
    bookings: 15
  }
])

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getUserStatusClass = (status: string) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-yellow-100 text-yellow-800',
    'Suspended': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const suspendUser = (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.status = 'Suspended'
  }
}

const activateUser = (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.status = 'Active'
  }
}

const deleteUser = (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== userId)
  }
}
</script>