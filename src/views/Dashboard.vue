<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <!-- User Info -->
            <div class="flex items-center space-x-3 mb-8">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">John Doe</h3>
                <p class="text-sm text-gray-500">Customer</p>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="space-y-2">
              <router-link 
                to="/dashboard/book-service" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('book-service') }"
              >
                <span>📅</span>
                <span>Book a Service</span>
              </router-link>
              
              <router-link 
                to="/dashboard/bookings" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('bookings') }"
              >
                <span>📋</span>
                <span>My Bookings</span>
              </router-link>
              
              <router-link 
                to="/dashboard/chat" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('chat') }"
              >
                <span>💬</span>
                <span>Chat</span>
              </router-link>
              
              <router-link 
                to="/dashboard/wallet" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('wallet') }"
              >
                <span>💰</span>
                <span>Wallet</span>
              </router-link>
              
              <router-link 
                to="/dashboard/profile" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('profile') }"
              >
                <span>👤</span>
                <span>Profile & Settings</span>
              </router-link>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
</script>