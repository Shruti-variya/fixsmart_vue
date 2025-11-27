<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <!-- Provider Info -->
            <div class="flex items-center space-x-3 mb-8">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                MS
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Mike Smith</h3>
                <p class="text-sm text-gray-500">Plumbing Expert</p>
                <div class="flex items-center space-x-1 mt-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-xs text-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="space-y-2">
              <router-link 
                to="/provider/jobs" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
                :class="{ 'bg-green-50 text-green-600': $route.path.includes('jobs') }"
              >
                <span>📋</span>
                <span>Job Requests</span>
                <span v-if="pendingJobsCount > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  {{ pendingJobsCount }}
                </span>
              </router-link>
              
              <router-link 
                to="/provider/appointments" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
                :class="{ 'bg-green-50 text-green-600': $route.path.includes('appointments') }"
              >
                <span>📅</span>
                <span>My Appointments</span>
              </router-link>
              
              <router-link 
                to="/provider/earnings" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
                :class="{ 'bg-green-50 text-green-600': $route.path.includes('earnings') }"
              >
                <span>💰</span>
                <span>Earnings & Payouts</span>
              </router-link>
              
              <router-link 
                to="/provider/profile" 
                class="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
                :class="{ 'bg-green-50 text-green-600': $route.path.includes('profile') }"
              >
                <span>👤</span>
                <span>Profile Management</span>
              </router-link>
            </nav>

            <!-- Quick Stats -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">This Week</span>
                  <span class="font-semibold">$1,240</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Completed Jobs</span>
                  <span class="font-semibold">8</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Rating</span>
                  <span class="font-semibold">4.8/5</span>
                </div>
              </div>
            </div>
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
import { ref } from 'vue'
import Header from '../../components/Header.vue'

const pendingJobsCount = ref(3)
</script>