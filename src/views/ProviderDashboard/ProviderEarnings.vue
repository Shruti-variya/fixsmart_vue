<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Earnings & Payouts</h1>
      <p class="text-gray-600">Track your earnings and manage payouts</p>
    </div>

    <!-- Earnings Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Earnings</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$8,450</h3>
          </div>
          <div class="text-3xl text-green-500">💰</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Available Balance</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$2,150</h3>
          </div>
          <div class="text-3xl text-blue-500">💳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">This Month</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$1,240</h3>
          </div>
          <div class="text-3xl text-purple-500">📈</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed Jobs</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">45</h3>
          </div>
          <div class="text-3xl text-yellow-500">✅</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Payout Section -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Request Payout</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input 
                type="number" 
                v-model="payoutAmount"
                :max="availableBalance"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
              >
              <p class="text-xs text-gray-500 mt-1">Available: ${{ availableBalance }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
              <select 
                v-model="selectedPayoutMethod"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            
            <button 
              @click="requestPayout"
              :disabled="!payoutAmount || payoutAmount <= 0 || payoutAmount > availableBalance"
              class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Request Payout
            </button>
          </div>
        </div>

        <!-- Recent Payouts -->
        <div class="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent Payouts</h3>
          <div class="space-y-3">
            <div 
              v-for="payout in recentPayouts" 
              :key="payout.id"
              class="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-800">${{ payout.amount }}</p>
                <p class="text-sm text-gray-600">{{ payout.date }}</p>
              </div>
              <div :class="getPayoutStatusClass(payout.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                {{ payout.status }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings History -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Earnings History</h3>
          
          <div class="space-y-4">
            <div 
              v-for="earning in earnings" 
              :key="earning.id"
              class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
            >
              <div class="flex items-center space-x-4">
                <div class="text-2xl">{{ earning.serviceIcon }}</div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ earning.serviceName }}</h4>
                  <p class="text-sm text-gray-600">{{ earning.customerName }} • {{ earning.date }}</p>
                </div>
              </div>
              
              <div class="text-right">
                <div class="text-lg font-bold text-gray-800">${{ earning.amount }}</div>
                <div class="text-sm text-gray-600">{{ earning.duration }} hours</div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="earnings.length === 0" class="text-center py-8">
            <div class="text-6xl mb-4">💸</div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No earnings yet</h3>
            <p class="text-gray-500">Your earnings history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Earning {
  id: number
  serviceName: string
  serviceIcon: string
  customerName: string
  date: string
  amount: number
  duration: number
}

interface Payout {
  id: number
  amount: number
  date: string
  status: 'Completed' | 'Processing' | 'Failed'
}

const availableBalance = ref(2150)
const payoutAmount = ref<number>(0)
const selectedPayoutMethod = ref('bank')

const earnings = ref<Earning[]>([
  {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    customerName: 'John Doe',
    date: '14 Jan 2024',
    amount: 120,
    duration: 2
  },
  {
    id: 2,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    customerName: 'Sarah Wilson',
    date: '13 Jan 2024',
    amount: 180,
    duration: 3
  },
  {
    id: 3,
    serviceName: 'Carpentry',
    serviceIcon: '🪚',
    customerName: 'Mike Johnson',
    date: '12 Jan 2024',
    amount: 220,
    duration: 4
  },
  {
    id: 4,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    customerName: 'David Brown',
    date: '11 Jan 2024',
    amount: 95,
    duration: 1.5
  }
])

const recentPayouts = ref<Payout[]>([
  {
    id: 1,
    amount: 1000,
    date: '10 Jan 2024',
    status: 'Completed'
  },
  {
    id: 2,
    amount: 850,
    date: '3 Jan 2024',
    status: 'Completed'
  },
  {
    id: 3,
    amount: 1200,
    date: '27 Dec 2023',
    status: 'Completed'
  }
])

const getPayoutStatusClass = (status: string) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Failed': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const requestPayout = () => {
  if (payoutAmount.value > 0 && payoutAmount.value <= availableBalance.value) {
    // In real app, send API request
    recentPayouts.value.unshift({
      id: recentPayouts.value.length + 1,
      amount: payoutAmount.value,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Processing'
    })
    availableBalance.value -= payoutAmount.value
    payoutAmount.value = 0
    alert('Payout request submitted successfully!')
  }
}
</script>