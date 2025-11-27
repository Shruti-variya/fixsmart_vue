<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Profile Management</h1>
      <p class="text-gray-600">Manage your provider profile and settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                v-model="profile.firstName"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                v-model="profile.lastName"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="profile.email"
                type="email" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                v-model="profile.phone"
                type="tel" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
          </div>
        </div>

        <!-- Service Details -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Service Details</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Primary Service</label>
              <select 
                v-model="profile.primaryService"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="painting">Painting</option>
                <option value="carpentry">Carpentry</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
              <input 
                v-model="profile.hourlyRate"
                type="number" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
              <input 
                v-model="profile.experience"
                type="number" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
              <textarea 
                v-model="profile.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your services and expertise..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Portfolio Images -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Portfolio Images</h2>
            <button 
              @click="showUploadModal = true"
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
            >
              Upload Images
            </button>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div 
              v-for="image in portfolioImages" 
              :key="image.id"
              class="relative group"
            >
              <img :src="image.url" :alt="image.title" class="w-full h-32 object-cover rounded-lg">
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center rounded-lg">
                <button 
                  @click="deleteImage(image.id)"
                  class="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition"
                >
                  🗑️
                </button>
              </div>
              <p class="text-sm text-gray-600 mt-2 truncate">{{ image.title }}</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="portfolioImages.length === 0" class="text-center py-8">
            <div class="text-6xl mb-4">🖼️</div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No portfolio images</h3>
            <p class="text-gray-500">Upload images to showcase your work</p>
          </div>
        </div>

        <!-- Availability Schedule -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Availability Schedule</h2>
          <div class="space-y-4">
            <div 
              v-for="day in availability" 
              :key="day.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  v-model="day.available"
                  class="rounded border-gray-300 text-green-500 focus:ring-green-500"
                >
                <span class="font-medium text-gray-800">{{ day.name }}</span>
              </div>
              <div class="flex space-x-2" v-if="day.available">
                <select 
                  v-model="day.startTime"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <span class="text-gray-500">to</span>
                <select 
                  v-model="day.endTime"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- KYC Verification -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">KYC Verification</h2>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-800">Identity Verification</h4>
                  <p class="text-sm text-gray-600">Upload government ID for verification</p>
                </div>
                <div :class="getVerificationStatusClass(kycStatus.identity)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ kycStatus.identity }}
                </div>
              </div>
              <button class="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                Upload ID
              </button>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-800">Address Verification</h4>
                  <p class="text-sm text-gray-600">Verify your residential address</p>
                </div>
                <div :class="getVerificationStatusClass(kycStatus.address)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ kycStatus.address }}
                </div>
              </div>
              <button class="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                Verify Address
              </button>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-800">Background Check</h4>
                  <p class="text-sm text-gray-600">Complete background verification</p>
                </div>
                <div :class="getVerificationStatusClass(kycStatus.background)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ kycStatus.background }}
                </div>
              </div>
              <button class="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                Start Check
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button 
            @click="saveProfile"
            class="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Profile Photo -->
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {{ getInitials(profile.firstName + ' ' + profile.lastName) }}
          </div>
          <h3 class="font-semibold text-gray-800">{{ profile.firstName }} {{ profile.lastName }}</h3>
          <p class="text-gray-600 text-sm">{{ profile.primaryService }} Expert</p>
          <button class="text-green-500 text-sm mt-3 hover:text-green-700 transition">
            Change Photo
          </button>
        </div>

        <!-- Verification Status -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-semibold text-gray-800 mb-4">Verification Status</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Profile Completion</span>
              <span class="font-semibold text-green-600">85%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
            </div>
            
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-600">Trust Score</span>
              <span class="font-semibold text-green-600">4.8/5</span>
            </div>
            
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-600">Response Rate</span>
              <span class="font-semibold text-green-600">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Upload Portfolio Image</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image Title</label>
            <input 
              v-model="newImage.title"
              type="text" 
              placeholder="e.g., Kitchen Plumbing Work"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div class="text-4xl mb-2">📁</div>
              <p class="text-sm text-gray-600">Drag & drop or click to upload</p>
              <input type="file" class="hidden" @change="handleImageUpload">
              <button class="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                Choose File
              </button>
            </div>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button 
            @click="showUploadModal = false"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button 
            @click="addPortfolioImage"
            :disabled="!newImage.title"
            class="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Profile {
  firstName: string
  lastName: string
  email: string
  phone: string
  primaryService: string
  hourlyRate: number
  experience: number
  description: string
}

interface PortfolioImage {
  id: number
  title: string
  url: string
}

interface Availability {
  id: number
  name: string
  available: boolean
  startTime: string
  endTime: string
}

interface KYCStatus {
  identity: string
  address: string
  background: string
}

const profile = ref<Profile>({
  firstName: 'Mike',
  lastName: 'Smith',
  email: 'mike.smith@example.com',
  phone: '+1 (555) 123-4567',
  primaryService: 'plumbing',
  hourlyRate: 60,
  experience: 8,
  description: 'Professional plumber with 8+ years of experience specializing in residential plumbing, leak repairs, and fixture installations.'
})

const portfolioImages = ref<PortfolioImage[]>([
  {
    id: 1,
    title: 'Kitchen Sink Installation',
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
  },
  {
    id: 2,
    title: 'Bathroom Plumbing',
    url: 'https://images.unsplash.com/photo-1584620787279-01ac0e42dfa8?w=400'
  },
  {
    id: 3,
    title: 'Pipe Repair Work',
    url: 'https://images.unsplash.com/photo-1621544402535-5cf6e86c6c2a?w=400'
  }
])

const availability = ref<Availability[]>([
  { id: 1, name: 'Monday', available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 2, name: 'Tuesday', available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 3, name: 'Wednesday', available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 4, name: 'Thursday', available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 5, name: 'Friday', available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 6, name: 'Saturday', available: false, startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 7, name: 'Sunday', available: false, startTime: '9:00 AM', endTime: '5:00 PM' }
])

const kycStatus = ref<KYCStatus>({
  identity: 'Verified',
  address: 'Pending',
  background: 'Not Started'
})

const showUploadModal = ref(false)
const newImage = ref({
  title: '',
  url: ''
})

const timeOptions = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
]

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getVerificationStatusClass = (status: string) => {
  const classes = {
    'Verified': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Not Started': 'bg-gray-100 text-gray-800',
    'Failed': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    // In real app, you would upload to server and get URL
    const reader = new FileReader()
    reader.onload = (e) => {
      newImage.value.url = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const addPortfolioImage = () => {
  if (newImage.value.title && newImage.value.url) {
    portfolioImages.value.push({
      id: portfolioImages.value.length + 1,
      title: newImage.value.title,
      url: newImage.value.url
    })
    showUploadModal.value = false
    newImage.value = { title: '', url: '' }
  }
}

const deleteImage = (imageId: number) => {
  portfolioImages.value = portfolioImages.value.filter(img => img.id !== imageId)
}

const saveProfile = () => {
  // In real app, send to API
  console.log('Saving profile:', profile.value)
  console.log('Availability:', availability.value)
  alert('Profile updated successfully!')
}
</script>