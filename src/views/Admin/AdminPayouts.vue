<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Payouts Management</h1>
          <p class="text-gray-600">Manage provider payouts and transactions</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Payouts</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$18,450</h3>
          </div>
          <div class="text-3xl text-green-500">💰</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Payouts</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$2,340</h3>
          </div>
          <div class="text-3xl text-yellow-500">⏳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">156</h3>
          </div>
          <div class="text-3xl text-blue-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Failed</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">8</h3>
          </div>
          <div class="text-3xl text-red-500">❌</div>
        </div>
      </div>
    </div>

    <!-- Payouts Table -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-800">All Payouts</h2>
          <div class="flex space-x-3">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search payouts..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <select 
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="payout in filteredPayouts" 
              :key="payout.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ payout.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {{ getInitials(payout.providerName) }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ payout.providerName }}</div>
                    <div class="text-sm text-gray-500">{{ payout.providerService }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ payout.amount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-lg mr-2">{{ payout.methodIcon }}</div>
                  <div class="text-sm text-gray-900">{{ payout.method }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ payout.requestedDate }}</div>
                <div class="text-sm text-gray-500">{{ payout.requestedTime }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ payout.processedDate || '-' }}</div>
                <div class="text-sm text-gray-500">{{ payout.processedTime || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(payout.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  {{ payout.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">View</button>
                  <button 
                    v-if="payout.status === 'Pending'"
                    @click="processPayout(payout.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Process
                  </button>
                  <button 
                    v-if="payout.status === 'Pending'"
                    @click="rejectPayout(payout.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPayouts.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">💰</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No payouts found</h3>
        <p class="text-gray-500">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Payout Statistics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <!-- Payout Methods -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Payout Methods Distribution</h3>
        <div class="space-y-4">
          <div 
            v-for="method in payoutMethods" 
            :key="method.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div class="text-xl">{{ method.icon }}</div>
              <span class="text-sm text-gray-700">{{ method.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-900">{{ method.count }} payouts</span>
              <span class="text-sm text-gray-500">({{ method.percentage }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Payout Activity</h3>
        <div class="space-y-4">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div :class="getActivityIconClass(activity.type)" class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">
                {{ getActivityIcon(activity.type) }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
            <span class="text-sm font-semibold" :class="getAmountClass(activity.amount)">
              {{ activity.amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Payout {
  id: number
  providerName: string
  providerService: string
  amount: number
  method: string
  methodIcon: string
  requestedDate: string
  requestedTime: string
  processedDate: string
  processedTime: string
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed'
}

interface PayoutMethod {
  name: string
  icon: string
  count: number
  percentage: number
}

interface Activity {
  id: number
  type: 'payout' | 'refund' | 'commission'
  description: string
  amount: string
  time: string
}

const payouts = ref<Payout[]>([
  {
    id: 5001,
    providerName: 'John Smith',
    providerService: 'Plumbing',
    amount: 1200,
    method: 'Bank Transfer',
    methodIcon: '🏦',
    requestedDate: '15 Jan 2024',
    requestedTime: '10:30 AM',
    processedDate: '15 Jan 2024',
    processedTime: '2:45 PM',
    status: 'Completed'
  },
  {
    id: 5002,
    providerName: 'Sarah Wilson',
    providerService: 'Cleaning',
    amount: 850,
    method: 'PayPal',
    methodIcon: '📱',
    requestedDate: '16 Jan 2024',
    requestedTime: '11:15 AM',
    processedDate: '',
    processedTime: '',
    status: 'Pending'
  },
  {
    id: 5003,
    providerName: 'Mike Johnson',
    providerService: 'Electrical',
    amount: 1560,
    method: 'Bank Transfer',
    methodIcon: '🏦',
    requestedDate: '14 Jan 2024',
    requestedTime: '3:20 PM',
    processedDate: '15 Jan 2024',
    processedTime: '9:30 AM',
    status: 'Completed'
  },
  {
    id: 5004,
    providerName: 'David Brown',
    providerService: 'Painting',
    amount: 980,
    method: 'UPI',
    methodIcon: '💸',
    requestedDate: '16 Jan 2024',
    requestedTime: '2:00 PM',
    processedDate: '',
    processedTime: '',
    status: 'Processing'
  },
  {
    id: 5005,
    providerName: 'Emily Davis',
    providerService: 'Carpentry',
    amount: 1340,
    method: 'Bank Transfer',
    methodIcon: '🏦',
    requestedDate: '13 Jan 2024',
    requestedTime: '4:45 PM',
    processedDate: '14 Jan 2024',
    processedTime: '11:00 AM',
    status: 'Failed'
  }
])

const payoutMethods = ref<PayoutMethod[]>([
  { name: 'Bank Transfer', icon: '🏦', count: 89, percentage: 57 },
  { name: 'PayPal', icon: '📱', count: 45, percentage: 29 },
  { name: 'UPI', icon: '💸', count: 18, percentage: 12 },
  { name: 'Other', icon: '💰', count: 4, percentage: 2 }
])

const recentActivity = ref<Activity[]>([
  { id: 1, type: 'payout', description: 'Payout to John Smith', amount: '+$1,200', time: '2 hours ago' },
  { id: 2, type: 'commission', description: 'Platform commission', amount: '-$120', time: '4 hours ago' },
  { id: 3, type: 'payout', description: 'Payout to Mike Johnson', amount: '+$1,560', time: '1 day ago' },
  { id: 4, type: 'refund', description: 'Customer refund', amount: '-$90', time: '2 days ago' }
])

const searchQuery = ref('')
const statusFilter = ref('')

const filteredPayouts = computed(() => {
  return payouts.value.filter(payout => {
    const matchesSearch = 
      payout.providerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payout.providerService.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payout.id.toString().includes(searchQuery.value)
    
    const matchesStatus = !statusFilter.value || payout.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusClass = (status: string) => {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Failed': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const getActivityIconClass = (type: string) => {
  const classes = {
    'payout': 'bg-green-500',
    'refund': 'bg-red-500',
    'commission': 'bg-purple-500'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-500'
}

const getActivityIcon = (type: string) => {
  const icons = {
    'payout': '💰',
    'refund': '↩️',
    'commission': '💼'
  }
  return icons[type as keyof typeof icons] || '📊'
}

const getAmountClass = (amount: string) => {
  return amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
}

const processPayout = (payoutId: number) => {
  const payout = payouts.value.find(p => p.id === payoutId)
  if (payout) {
    payout.status = 'Processing'
    // Simulate processing delay
    setTimeout(() => {
      payout.status = 'Completed'
      payout.processedDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      payout.processedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }, 2000)
  }
}

const rejectPayout = (payoutId: number) => {
  const payout = payouts.value.find(p => p.id === payoutId)
  if (payout) {
    payout.status = 'Failed'
    payout.processedDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    payout.processedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
}
</script>