<!-- src/components/Footer.vue -->
<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">FixSmart</h3>
          <p class="text-gray-400">Professional home services at your fingertips.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Services</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition">Plumbing</a></li>
            <li><a href="#" class="hover:text-white transition">Cleaning</a></li>
            <li><a href="#" class="hover:text-white transition">Electrical</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition">About Us</a></li>
            <li><a href="#" class="hover:text-white transition">Contact</a></li>
            <li><a href="#" class="hover:text-white transition">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition">Help Center</a></li>
            <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 FixSmart. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>