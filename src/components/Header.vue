<!-- src/components/Header.vue -->
<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-[#3B82F6] rounded-lg"></div>
          <span class="text-xl font-bold text-gray-800">FixSmart</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-[#3B82F6] transition-colors duration-200"
            :class="{ 'text-[#3B82F6] font-semibold': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/services" 
            class="text-gray-600 hover:text-[#3B82F6] transition-colors duration-200"
            :class="{ 'text-[#3B82F6] font-semibold': $route.path === '/services' }"
          >
            Services
          </router-link>
          <a href="#" class="text-gray-600 hover:text-[#3B82F6] transition-colors duration-200">
            How It Works
          </a>
          <a href="#" class="text-gray-600 hover:text-[#3B82F6] transition-colors duration-200">
            Testimonials
          </a>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-[#3B82F6] transition-colors duration-200">
            Login
          </button>
          <button class="bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition-colors duration-200 font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>