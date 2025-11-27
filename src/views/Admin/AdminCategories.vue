<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Categories Management</h1>
          <p class="text-gray-600">Organize services into categories</p>
        </div>
        <button 
          @click="showAddCategoryModal = true"
          class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Add New Category
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Categories</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ categories.length }}</h3>
          </div>
          <div class="text-3xl text-blue-500">📁</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Categories</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ activeCategoriesCount }}</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Services</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ totalServices }}</h3>
          </div>
          <div class="text-3xl text-purple-500">🛠️</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg. Services/Category</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ averageServicesPerCategory }}</h3>
          </div>
          <div class="text-3xl text-yellow-500">📊</div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="text-2xl">{{ category.icon }}</div>
            <div>
              <h3 class="font-semibold text-gray-800 text-lg">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.services.length }} services</p>
            </div>
          </div>
          <span 
            :class="category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            class="px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ category.active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>

        <!-- Services in this category -->
        <div class="mb-4">
          <h4 class="font-medium text-gray-700 mb-2 text-sm">Services:</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="service in category.services.slice(0, 3)" 
              :key="service.id"
              class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {{ service.name }}
            </span>
            <span 
              v-if="category.services.length > 3"
              class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              +{{ category.services.length - 3 }} more
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div>
            <span class="font-semibold">{{ category.providerCount }}</span> providers
          </div>
          <div>
            <span class="font-semibold">{{ category.bookingCount }}</span> bookings
          </div>
        </div>

        <div class="flex space-x-2">
          <button 
            @click="editCategory(category)"
            class="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm"
          >
            Edit
          </button>
          <button 
            @click="toggleCategoryStatus(category.id)"
            :class="category.active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'"
            class="flex-1 text-white py-2 rounded-lg transition text-sm"
          >
            {{ category.active ? 'Deactivate' : 'Activate' }}
          </button>
          <button 
            @click="deleteCategory(category.id)"
            class="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="categories.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">📁</div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
      <p class="text-gray-500">Create your first category to organize services</p>
    </div>

    <!-- Add/Edit Category Modal -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <input 
              v-model="newCategory.name"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Home Repair"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <select 
              v-model="newCategory.icon"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="🔧">🔧 Tools</option>
              <option value="⚡">⚡ Electrical</option>
              <option value="🧹">🧹 Cleaning</option>
              <option value="🎨">🎨 Painting</option>
              <option value="🛠️">🛠️ Repair</option>
              <option value="🏠">🏠 Home</option>
              <option value="🚗">🚗 Automotive</option>
              <option value="🌿">🌿 Garden</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="newCategory.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the category..."
            ></textarea>
          </div>
          
          <div>
            <div class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                v-model="newCategory.active"
                id="categoryActive"
                class="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              >
              <label for="categoryActive" class="text-sm text-gray-700">Category is active</label>
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
            @click="saveCategory"
            :disabled="!newCategory.name"
            class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ editingCategory ? 'Update' : 'Add' }} Category
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
}

interface Category {
  id: number
  name: string
  description: string
  icon: string
  services: Service[]
  providerCount: number
  bookingCount: number
  active: boolean
}

const categories = ref<Category[]>([
  {
    id: 1,
    name: 'Home Repair',
    description: 'Professional home repair and maintenance services',
    icon: '🔧',
    services: [
      { id: 1, name: 'Plumbing' },
      { id: 2, name: 'Electrical' },
      { id: 3, name: 'Carpentry' }
    ],
    providerCount: 20,
    bookingCount: 89,
    active: true
  },
  {
    id: 2,
    name: 'Home Maintenance',
    description: 'Regular home maintenance and cleaning services',
    icon: '🧹',
    services: [
      { id: 4, name: 'Cleaning' },
      { id: 5, name: 'Painting' }
    ],
    providerCount: 21,
    bookingCount: 101,
    active: true
  },
  {
    id: 3,
    name: 'Home Improvement',
    description: 'Home improvement and renovation services',
    icon: '🏠',
    services: [
      { id: 6, name: 'Painting' },
      { id: 7, name: 'Carpentry' }
    ],
    providerCount: 10,
    bookingCount: 41,
    active: true
  },
  {
    id: 4,
    name: 'Pest Control',
    description: 'Pest control and prevention services',
    icon: '🛡️',
    services: [
      { id: 8, name: 'Rost Control' }
    ],
    providerCount: 3,
    bookingCount: 12,
    active: true
  },
  {
    id: 5,
    name: 'Automotive',
    description: 'Vehicle maintenance and repair services',
    icon: '🚗',
    services: [
      { id: 9, name: 'Lamboaging' }
    ],
    providerCount: 2,
    bookingCount: 8,
    active: true
  },
  {
    id: 6,
    name: 'Emergency Services',
    description: '24/7 emergency repair services',
    icon: '🚨',
    services: [
      { id: 1, name: 'Plumbing' },
      { id: 2, name: 'Electrical' }
    ],
    providerCount: 8,
    bookingCount: 25,
    active: false
  }
])

const showAddCategoryModal = ref(false)
const editingCategory = ref(false)

const newCategory = ref({
  name: '',
  description: '',
  icon: '🔧',
  active: true
})

const activeCategoriesCount = computed(() => {
  return categories.value.filter(category => category.active).length
})

const totalServices = computed(() => {
  return categories.value.reduce((total, category) => total + category.services.length, 0)
})

const averageServicesPerCategory = computed(() => {
  return categories.value.length > 0 ? Math.round(totalServices.value / categories.value.length) : 0
})

const editCategory = (category: Category) => {
  newCategory.value = { 
    name: category.name,
    description: category.description,
    icon: category.icon,
    active: category.active
  }
  editingCategory.value = true
  showAddCategoryModal.value = true
}

const toggleCategoryStatus = (categoryId: number) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    category.active = !category.active
  }
}

const deleteCategory = (categoryId: number) => {
  if (confirm('Are you sure you want to delete this category?')) {
    categories.value = categories.value.filter(c => c.id !== categoryId)
  }
}

const saveCategory = () => {
  if (editingCategory.value) {
    // Update existing category
    const index = categories.value.findIndex(c => c.id === newCategory.value.id)
    if (index !== -1) {
      categories.value[index] = { 
        ...categories.value[index],
        ...newCategory.value 
      }
    }
  } else {
    // Add new category
    const newId = Math.max(...categories.value.map(c => c.id)) + 1
    categories.value.push({
      id: newId,
      services: [],
      providerCount: 0,
      bookingCount: 0,
      ...newCategory.value
    })
  }
  closeModal()
}

const closeModal = () => {
  showAddCategoryModal.value = false
  editingCategory.value = false
  newCategory.value = {
    name: '',
    description: '',
    icon: '🔧',
    active: true
  }
}
</script>