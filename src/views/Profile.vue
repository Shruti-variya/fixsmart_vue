<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Profile & Settings</h1>
      <p class="text-gray-600">Manage your account and preferences</p>
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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                v-model="profile.lastName"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="profile.email"
                type="email" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                v-model="profile.phone"
                type="tel" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
          </div>
          
          <div class="flex justify-end mt-6">
            <button 
              @click="updateProfile"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        <!-- Address Management -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Saved Addresses</h2>
            <button 
              @click="showAddAddressModal = true"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              Add New Address
            </button>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="address in addresses" 
              :key="address.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-gray-800">{{ address.name }}</h4>
                  <p class="text-gray-600 mt-1">{{ address.street }}</p>
                  <p class="text-gray-600">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="editAddress(address.id)"
                    class="text-blue-500 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteAddress(address.id)"
                    class="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div class="flex items-center space-x-4 mt-3 text-sm">
                <span v-if="address.isDefault" class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Default
                </span>
                <span class="text-gray-500">{{ address.type }}</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="addresses.length === 0" class="text-center py-8">
            <div class="text-6xl mb-4">🏠</div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No addresses saved</h3>
            <p class="text-gray-500 mb-4">Add your first address to make booking easier</p>
            <button 
              @click="showAddAddressModal = true"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add Address
            </button>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
          <div class="space-y-4">
            <div 
              v-for="setting in notificationSettings" 
              :key="setting.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <h4 class="font-medium text-gray-800">{{ setting.name }}</h4>
                <p class="text-sm text-gray-600">{{ setting.description }}</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="setting.enabled"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
          
          <div class="flex justify-end mt-6">
            <button 
              @click="saveNotificationSettings"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Profile Photo -->
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {{ getInitials(profile.firstName + ' ' + profile.lastName) }}
          </div>
          <h3 class="font-semibold text-gray-800">{{ profile.firstName }} {{ profile.lastName }}</h3>
          <p class="text-gray-600 text-sm">{{ profile.email }}</p>
          <button class="text-blue-500 text-sm mt-3 hover:text-blue-700 transition">
            Change Photo
          </button>
        </div>

        <!-- Account Actions -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-semibold text-gray-800 mb-4">Account Actions</h3>
          <div class="space-y-3">
            <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition text-gray-700">
              Change Password
            </button>
            <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition text-gray-700">
              Privacy Settings
            </button>
            <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition text-gray-700">
              Download My Data
            </button>
            <button 
              @click="showDeleteModal = true"
              class="w-full text-left p-3 rounded-lg hover:bg-red-50 transition text-red-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Address Modal -->
    <div v-if="showAddAddressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ editingAddress ? 'Edit Address' : 'Add New Address' }}</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
            <input 
              v-model="newAddress.name"
              type="text" 
              placeholder="Home, Office, etc."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input 
              v-model="newAddress.street"
              type="text" 
              placeholder="123 Main Street"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input 
                v-model="newAddress.city"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input 
                v-model="newAddress.state"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input 
              v-model="newAddress.zipCode"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="newAddress.isDefault"
              id="defaultAddress"
              class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            >
            <label for="defaultAddress" class="text-sm text-gray-700">Set as default address</label>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button 
            @click="cancelAddressEdit"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button 
            @click="saveAddress"
            class="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {{ editingAddress ? 'Update' : 'Add' }} Address
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div class="text-center">
          <div class="text-6xl mb-4">😢</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Delete Your Account</h3>
          <p class="text-gray-600 mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Type "DELETE" to confirm</label>
            <input 
              v-model="deleteConfirmation"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="DELETE"
            >
          </div>

          <div class="flex space-x-3">
            <button 
              @click="showDeleteModal = false"
              class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button 
              @click="deleteAccount"
              :disabled="deleteConfirmation !== 'DELETE'"
              class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          </div>
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
}

interface Address {
  id: number
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  type: string
  isDefault: boolean
}

interface NotificationSetting {
  id: number
  name: string
  description: string
  enabled: boolean
}

const profile = ref<Profile>({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567'
})

const addresses = ref<Address[]>([
  {
    id: 1,
    name: 'Home',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    type: 'Apartment',
    isDefault: true
  },
  {
    id: 2,
    name: 'Office',
    street: '456 Business Ave, Suite 300',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    type: 'Office',
    isDefault: false
  }
])

const notificationSettings = ref<NotificationSetting[]>([
  {
    id: 1,
    name: 'Email Notifications',
    description: 'Receive updates via email',
    enabled: true
  },
  {
    id: 2,
    name: 'SMS Notifications',
    description: 'Receive text message alerts',
    enabled: true
  },
  {
    id: 3,
    name: 'Push Notifications',
    description: 'Receive app notifications',
    enabled: true
  },
  {
    id: 4,
    name: 'Booking Reminders',
    description: 'Reminders before appointments',
    enabled: true
  },
  {
    id: 5,
    name: 'Promotional Emails',
    description: 'Special offers and discounts',
    enabled: false
  }
])

const showAddAddressModal = ref(false)
const showDeleteModal = ref(false)
const editingAddress = ref(false)
const deleteConfirmation = ref('')

const newAddress = ref<Omit<Address, 'id' | 'type'>>({
  name: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  isDefault: false
})

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const updateProfile = () => {
  // In real app, send to API
  alert('Profile updated successfully!')
}

const editAddress = (addressId: number) => {
  const address = addresses.value.find(a => a.id === addressId)
  if (address) {
    newAddress.value = {
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault
    }
    editingAddress.value = true
    showAddAddressModal.value = true
  }
}

const deleteAddress = (addressId: number) => {
  if (confirm('Are you sure you want to delete this address?')) {
    addresses.value = addresses.value.filter(a => a.id !== addressId)
  }
}

const saveAddress = () => {
  if (editingAddress.value) {
    // Update existing address
    alert('Address updated successfully!')
  } else {
    // Add new address
    const newId = Math.max(...addresses.value.map(a => a.id)) + 1
    addresses.value.push({
      id: newId,
      ...newAddress.value,
      type: 'Residential'
    })
  }
  cancelAddressEdit()
}

const cancelAddressEdit = () => {
  showAddAddressModal.value = false
  editingAddress.value = false
  newAddress.value = {
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  }
}

const saveNotificationSettings = () => {
  // In real app, send to API
  alert('Notification preferences saved!')
}

const deleteAccount = () => {
  if (deleteConfirmation.value === 'DELETE') {
    // In real app, send delete request to API
    alert('Account deletion request submitted. You will receive a confirmation email.')
    showDeleteModal.value = false
    deleteConfirmation.value = ''
  }
}
</script>