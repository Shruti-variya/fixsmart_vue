<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">My Wallet</h1>
      <p class="text-gray-600">Manage your payments and transactions</p>
    </div>

    <!-- Wallet Balance Card -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-8">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-blue-100">Current Balance</p>
          <h2 class="text-4xl font-bold mt-2">${{ walletBalance.toFixed(2) }}</h2>
        </div>
        <div class="text-5xl">💰</div>
      </div>
      
      <div class="flex space-x-4 mt-6">
        <button 
          @click="showAddMoneyModal = true"
          class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Money</span>
        </button>
        <button class="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition">
          Withdraw
        </button>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6">Transaction History</h3>
      
      <div class="space-y-4">
        <div 
          v-for="transaction in transactions" 
          :key="transaction.id"
          class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
        >
          <div class="flex items-center space-x-4">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center text-white"
              :class="transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'"
            >
              {{ transaction.type === 'credit' ? '⬇️' : '⬆️' }}
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">{{ transaction.description }}</h4>
              <p class="text-sm text-gray-600">{{ transaction.date }} • {{ transaction.time }}</p>
            </div>
          </div>
          
          <div class="text-right">
            <div 
              class="text-lg font-semibold"
              :class="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'"
            >
              {{ transaction.type === 'credit' ? '+' : '-' }}${{ transaction.amount }}
            </div>
            <div class="text-sm text-gray-500">{{ transaction.status }}</div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="transactions.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">💸</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No transactions yet</h3>
        <p class="text-gray-500">Your transaction history will appear here</p>
      </div>
    </div>

    <!-- Add Money Modal -->
    <div v-if="showAddMoneyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Add Money to Wallet</h3>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input 
            type="number" 
            v-model="addMoneyAmount"
            placeholder="Enter amount"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id"
              class="border-2 rounded-lg p-3 cursor-pointer transition text-center"
              :class="selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
              @click="selectedPaymentMethod = method.id"
            >
              <div class="text-2xl mb-2">{{ method.icon }}</div>
              <div class="text-sm font-medium">{{ method.name }}</div>
            </div>
          </div>
        </div>

        <div class="flex space-x-3">
          <button 
            @click="showAddMoneyModal = false"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button 
            @click="addMoney"
            :disabled="!addMoneyAmount || addMoneyAmount <= 0"
            class="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add ${{ addMoneyAmount || 0 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Transaction {
  id: number
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: string
  time: string
  status: string
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
}

const walletBalance = ref(500.00)
const showAddMoneyModal = ref(false)
const addMoneyAmount = ref<number>(0)
const selectedPaymentMethod = ref<string>('card')

const paymentMethods = ref<PaymentMethod[]>([
  { id: 'card', name: 'Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Other Wallet', icon: '💰' }
])

const transactions = ref<Transaction[]>([
  {
    id: 1,
    type: 'credit',
    amount: 200,
    description: 'Wallet Top-up',
    date: '15 Jan 2024',
    time: '10:30 AM',
    status: 'Completed'
  },
  {
    id: 2,
    type: 'debit',
    amount: 100,
    description: 'Plumbing Service - John Smith',
    date: '14 Jan 2024',
    time: '2:15 PM',
    status: 'Completed'
  },
  {
    id: 3,
    type: 'credit',
    amount: 50,
    description: 'Refund - Cancelled Booking',
    date: '12 Jan 2024',
    time: '4:45 PM',
    status: 'Completed'
  },
  {
    id: 4,
    type: 'debit',
    amount: 80,
    description: 'Cleaning Service - Sarah Wilson',
    date: '10 Jan 2024',
    time: '11:20 AM',
    status: 'Completed'
  }
])

const addMoney = () => {
  if (addMoneyAmount.value > 0) {
    walletBalance.value += addMoneyAmount.value
    transactions.value.unshift({
      id: transactions.value.length + 1,
      type: 'credit',
      amount: addMoneyAmount.value,
      description: 'Wallet Top-up',
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed'
    })
    showAddMoneyModal.value = false
    addMoneyAmount.value = 0
  }
}
</script>