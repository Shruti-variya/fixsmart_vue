<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p class="text-gray-600">Overview of your platform analytics and performance</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Revenue</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$24,580</h3>
            <p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
          </div>
          <div class="text-3xl text-green-500">💰</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Users</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">1,234</h3>
            <p class="text-xs text-green-600 mt-1">↑ 8% from last month</p>
          </div>
          <div class="text-3xl text-blue-500">👥</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Providers</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">45</h3>
            <p class="text-xs text-green-600 mt-1">↑ 15% from last month</p>
          </div>
          <div class="text-3xl text-purple-500">🔧</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed Bookings</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">156</h3>
            <p class="text-xs text-green-600 mt-1">↑ 20% from last month</p>
          </div>
          <div class="text-3xl text-yellow-500">✅</div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
        <div class="h-64 flex items-end space-x-2">
          <div v-for="month in revenueData" :key="month.name" class="flex-1 flex flex-col items-center">
            <div 
              class="bg-purple-500 rounded-t-lg w-full max-w-12 transition hover:bg-purple-600"
              :style="{ height: month.revenue / 5000 * 100 + '%' }"
            ></div>
            <span class="text-xs text-gray-600 mt-2">{{ month.name }}</span>
            <span class="text-xs font-semibold">${{ month.revenue }}</span>
          </div>
        </div>
      </div>

      <!-- User Growth Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
        <div class="h-64 flex items-end space-x-2">
          <div v-for="month in userGrowthData" :key="month.name" class="flex-1 flex flex-col items-center">
            <div 
              class="bg-blue-500 rounded-t-lg w-full max-w-12 transition hover:bg-blue-600"
              :style="{ height: month.users / 50 + '%' }"
            ></div>
            <span class="text-xs text-gray-600 mt-2">{{ month.name }}</span>
            <span class="text-xs font-semibold">{{ month.users }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Bookings -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
        <div class="space-y-4">
          <div 
            v-for="booking in recentBookings" 
            :key="booking.id"
            class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
          >
            <div class="flex items-center space-x-3">
              <div class="text-2xl">{{ booking.serviceIcon }}</div>
              <div>
                <h4 class="font-medium text-gray-800">{{ booking.serviceName }}</h4>
                <p class="text-sm text-gray-600">{{ booking.customerName }}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-gray-800">${{ booking.amount }}</div>
              <div :class="getStatusClass(booking.status)" class="text-xs px-2 py-1 rounded-full">
                {{ booking.status }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Platform Statistics -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">Service Completion Rate</span>
            <span class="font-semibold text-green-600">94%</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">Customer Satisfaction</span>
            <span class="font-semibold text-green-600">4.8/5</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">Average Response Time</span>
            <span class="font-semibold text-blue-600">15 min</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">Platform Uptime</span>
            <span class="font-semibold text-green-600">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RevenueData {
  name: string
  revenue: number
}

interface UserGrowthData {
  name: string
  users: number
}

interface RecentBooking {
  id: number
  serviceName: string
  serviceIcon: string
  customerName: string
  amount: number
  status: string
}

const revenueData: RevenueData[] = [
  { name: 'Jan', revenue: 4200 },
  { name: 'Feb', revenue: 5800 },
  { name: 'Mar', revenue: 7100 },
  { name: 'Apr', revenue: 8900 },
  { name: 'May', revenue: 12400 },
  { name: 'Jun', revenue: 15800 }
]

const userGrowthData: UserGrowthData[] = [
  { name: 'Jan', users: 120 },
  { name: 'Feb', users: 185 },
  { name: 'Mar', users: 240 },
  { name: 'Apr', users: 320 },
  { name: 'May', users: 450 },
  { name: 'Jun', users: 520 }
]

const recentBookings: RecentBooking[] = [
  {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    customerName: 'John Doe',
    amount: 120,
    status: 'Completed'
  },
  {
    id: 2,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    customerName: 'Sarah Wilson',
    amount: 180,
    status: 'In Progress'
  },
  {
    id: 3,
    serviceName: 'Cleaning',
    serviceIcon: '🧹',
    customerName: 'Mike Johnson',
    amount: 90,
    status: 'Completed'
  },
  {
    id: 4,
    serviceName: 'Painting',
    serviceIcon: '🎨',
    customerName: 'David Brown',
    amount: 220,
    status: 'Pending'
  }
]

const getStatusClass = (status: string) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script>