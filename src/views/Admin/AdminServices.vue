<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Services Management</h1>
          <p class="text-gray-600">Manage all platform services and pricing</p>
        </div>
        <button 
          @click="showAddServiceModal = true"
          class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Add New Service
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Services</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ services.length }}</h3>
          </div>
          <div class="text-3xl text-blue-500">🛠️</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Services</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ activeServicesCount }}</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Categories</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">8</h3>
          </div>
          <div class="text-3xl text-purple-500">📁</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg. Price</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$65</h3>
          </div>
          <div class="text-3xl text-yellow-500">💰</div>
        </div>
      </div>
    </div>

    <!-- Services Table -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-800">All Services</h2>
          <div class="flex space-x-3">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search services..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <select 
              v-model="categoryFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Providers</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="service in filteredServices" 
              :key="service.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-2xl">{{ service.icon }}</div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ service.name }}</div>
                    <div class="text-sm text-gray-500">{{ service.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {{ service.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${{ service.minPrice }} - ${{ service.maxPrice }}</div>
                <div class="text-sm text-gray-500">Avg: ${{ service.averagePrice }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ service.providerCount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ service.bookingCount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ service.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    @click="editService(service)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button 
                    @click="toggleServiceStatus(service.id)"
                    :class="service.active ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'"
                  >
                    {{ service.active ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button 
                    @click="deleteService(service.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredServices.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🛠️</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
        <p class="text-gray-500">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div v-if="showAddServiceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ editingService ? 'Edit Service' : 'Add New Service' }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
            <input 
              v-model="newService.name"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Plumbing Repair"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              v-model="newService.category"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <select 
              v-model="newService.icon"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="🔧">🔧 Plumbing</option>
              <option value="⚡">⚡ Electrical</option>
              <option value="🧹">🧹 Cleaning</option>
              <option value="🎨">🎨 Painting</option>
              <option value="🪚">🪚 Carpentry</option>
              <option value="🔌">🔌 Appliances</option>
              <option value="🛡️">🛡️ Rost Control</option>
              <option value="🚗">🚗 Lamboaging</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Average Price ($)</label>
            <input 
              v-model="newService.averagePrice"
              type="number" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="65"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="newService.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the service..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Price ($)</label>
            <input 
              v-model="newService.minPrice"
              type="number" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="50"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Price ($)</label>
            <input 
              v-model="newService.maxPrice"
              type="number" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="120"
            >
          </div>
          
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                v-model="newService.active"
                id="serviceActive"
                class="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              >
              <label for="serviceActive" class="text-sm text-gray-700">Service is active and available for booking</label>
            </div>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button 
            @click="closeModal"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button 
            @click="saveService"
            :disabled="!newService.name || !newService.category"
            class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ editingService ? 'Update' : 'Add' }} Service
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Service {
  id: number
  name: string
  description: string
  icon: string
  category: string
  minPrice: number
  maxPrice: number
  averagePrice: number
  providerCount: number
  bookingCount: number
  active: boolean
}

const services = ref<Service[]>([
  {
    id: 1,
    name: 'Plumbing',
    description: 'Professional plumbing services including repairs and installations',
    icon: '🔧',
    category: 'Home Repair',
    minPrice: 50,
    maxPrice: 120,
    averagePrice: 65,
    providerCount: 12,
    bookingCount: 45,
    active: true
  },
  {
    id: 2,
    name: 'Electrical',
    description: 'Electrical wiring, repairs, and installations',
    icon: '⚡',
    category: 'Home Repair',
    minPrice: 60,
    maxPrice: 150,
    averagePrice: 85,
    providerCount: 8,
    bookingCount: 32,
    active: true
  },
  {
    id: 3,
    name: 'Cleaning',
    description: 'Home and office cleaning services',
    icon: '🧹',
    category: 'Home Maintenance',
    minPrice: 40,
    maxPrice: 100,
    averagePrice: 60,
    providerCount: 15,
    bookingCount: 78,
    active: true
  },
  {
    id: 4,
    name: 'Painting',
    description: 'Interior and exterior painting services',
    icon: '🎨',
    category: 'Home Improvement',
    minPrice: 45,
    maxPrice: 110,
    averagePrice: 70,
    providerCount: 6,
    bookingCount: 23,
    active: true
  },
  {
    id: 5,
    name: 'Carpentry',
    description: 'Woodwork and furniture services',
    icon: '🪚',
    category: 'Home Improvement',
    minPrice: 55,
    maxPrice: 130,
    averagePrice: 80,
    providerCount: 4,
    bookingCount: 18,
    active: false
  },
  {
    id: 6,
    name: 'Rost Control',
    description: 'Protection and prevention services',
    icon: '🛡️',
    category: 'Pest Control',
    minPrice: 65,
    maxPrice: 140,
    averagePrice: 90,
    providerCount: 3,
    bookingCount: 12,
    active: true
  },
  {
    id: 7,
    name: 'Lamboaging',
    description: 'Luxury vehicle maintenance services',
    icon: '🚗',
    category: 'Automotive',
    minPrice: 120,
    maxPrice: 300,
    averagePrice: 180,
    providerCount: 2,
    bookingCount: 8,
    active: true
  }
])

const categories = ref(['Home Repair', 'Home Maintenance', 'Home Improvement', 'Pest Control', 'Automotive', 'Emergency'])
const searchQuery = ref('')
const categoryFilter = ref('')
const showAddServiceModal = ref(false)
const editingService = ref(false)

const newService = ref({
  name: '',
  description: '',
  icon: '🔧',
  category: '',
  minPrice: 0,
  maxPrice: 0,
  averagePrice: 0,
  active: true
})

const activeServicesCount = computed(() => {
  return services.value.filter(service => service.active).length
})

const filteredServices = computed(() => {
  return services.value.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || service.category === categoryFilter.value
    return matchesSearch && matchesCategory
  })
})

const editService = (service: Service) => {
  newService.value = { ...service }
  editingService.value = true
  showAddServiceModal.value = true
}

const toggleServiceStatus = (serviceId: number) => {
  const service = services.value.find(s => s.id === serviceId)
  if (service) {
    service.active = !service.active
  }
}

const deleteService = (serviceId: number) => {
  if (confirm('Are you sure you want to delete this service?')) {
    services.value = services.value.filter(s => s.id !== serviceId)
  }
}

const saveService = () => {
  if (editingService.value) {
    // Update existing service
    const index = services.value.findIndex(s => s.id === newService.value.id)
    if (index !== -1) {
      services.value[index] = { ...newService.value }
    }
  } else {
    // Add new service
    const newId = Math.max(...services.value.map(s => s.id)) + 1
    services.value.push({
      id: newId,
      providerCount: 0,
      bookingCount: 0,
      ...newService.value
    })
  }
  closeModal()
}

const closeModal = () => {
  showAddServiceModal.value = false
  editingService.value = false
  newService.value = {
    name: '',
    description: '',
    icon: '🔧',
    category: '',
    minPrice: 0,
    maxPrice: 0,
    averagePrice: 0,
    active: true
  }
}
</script>