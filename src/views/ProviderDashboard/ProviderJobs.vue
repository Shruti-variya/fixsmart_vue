<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Job Requests</h1>
      <p class="text-gray-600">Manage incoming service requests</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Requests</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">3</h3>
          </div>
          <div class="text-3xl text-yellow-500">⏳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Accepted Jobs</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">12</h3>
          </div>
          <div class="text-3xl text-green-500">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">45</h3>
          </div>
          <div class="text-3xl text-blue-500">📊</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Earnings</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">$2,450</h3>
          </div>
          <div class="text-3xl text-purple-500">💰</div>
        </div>
      </div>
    </div>

    <!-- Job Requests -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">New Job Requests</h2>
      </div>

      <div class="divide-y divide-gray-200">
        <div 
          v-for="job in jobRequests" 
          :key="job.id"
          class="p-6 hover:bg-gray-50 transition"
        >
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">{{ job.serviceIcon }}</div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 text-lg">{{ job.serviceName }}</h3>
                  <p class="text-gray-600 mt-1">Requested by {{ job.customerName }}</p>
                  
                  <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <div class="flex items-center space-x-1">
                      <span>📅</span>
                      <span>{{ job.date }} at {{ job.time }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{{ job.duration }} hours</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span>📍</span>
                      <span>{{ job.distance }} away</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span>💰</span>
                      <span class="font-semibold">${{ job.amount }}</span>
                    </div>
                  </div>

                  <div class="mt-3">
                    <p class="text-sm text-gray-700">{{ job.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <div class="text-right mb-2">
                <div class="text-2xl font-bold text-gray-800">${{ job.amount }}</div>
                <div class="text-sm text-gray-600">Total</div>
              </div>
              
              <div class="flex space-x-3">
                <button 
                  @click="acceptJob(job.id)"
                  class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium text-sm"
                >
                  Accept
                </button>
                <button 
                  @click="rejectJob(job.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm"
                >
                  Reject
                </button>
                <button 
                  @click="viewJobDetails(job.id)"
                  class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition font-medium text-sm"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="jobRequests.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No job requests</h3>
        <p class="text-gray-500">New service requests will appear here</p>
      </div>
    </div>

    <!-- Time Slot Management -->
    <div class="bg-white rounded-xl shadow-sm mt-8">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Time Slot Management</h2>
          <button 
            @click="showTimeSlotModal = true"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
          >
            Add Time Slot
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="slot in timeSlots" 
            :key="slot.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-800">{{ slot.day }}</h4>
                <p class="text-sm text-gray-600">{{ slot.date }}</p>
              </div>
              <button 
                @click="removeTimeSlot(slot.id)"
                class="text-red-500 hover:text-red-700 transition"
              >
                🗑️
              </button>
            </div>
            <div class="space-y-2">
              <div 
                v-for="time in slot.times" 
                :key="time"
                class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Time Slot Modal -->
    <div v-if="showTimeSlotModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Add Available Time Slot</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input 
              type="date" 
              v-model="newTimeSlot.date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="time in availableTimes" 
                :key="time"
                class="text-center p-2 border rounded-lg cursor-pointer transition"
                :class="newTimeSlot.times.includes(time) ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-300'"
                @click="toggleTimeSlot(time)"
              >
                {{ time }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button 
            @click="showTimeSlotModal = false"
            class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button 
            @click="addTimeSlot"
            :disabled="!newTimeSlot.date || newTimeSlot.times.length === 0"
            class="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add Time Slots
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface JobRequest {
  id: number
  serviceName: string
  serviceIcon: string
  customerName: string
  date: string
  time: string
  duration: number
  distance: string
  amount: number
  description: string
  status: 'pending' | 'accepted' | 'rejected'
}

interface TimeSlot {
  id: number
  day: string
  date: string
  times: string[]
}

const router = useRouter()
const showTimeSlotModal = ref(false)

const jobRequests = ref<JobRequest[]>([
  {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    customerName: 'John Doe',
    date: '15 Jan 2024',
    time: '10:00 AM',
    duration: 2,
    distance: '2.3 km',
    amount: 120,
    description: 'Kitchen sink leakage and drainage issue. Need immediate assistance.',
    status: 'pending'
  },
  {
    id: 2,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    customerName: 'Sarah Wilson',
    date: '16 Jan 2024',
    time: '2:00 PM',
    duration: 3,
    distance: '1.8 km',
    amount: 180,
    description: 'Complete house wiring check and socket installation in living room.',
    status: 'pending'
  },
  {
    id: 3,
    serviceName: 'Carpentry',
    serviceIcon: '🪚',
    customerName: 'Mike Johnson',
    date: '17 Jan 2024',
    time: '11:00 AM',
    duration: 4,
    distance: '3.1 km',
    amount: 220,
    description: 'Custom bookshelf installation and furniture assembly required.',
    status: 'pending'
  }
])

const timeSlots = ref<TimeSlot[]>([
  {
    id: 1,
    day: 'Monday',
    date: '15 Jan 2024',
    times: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM']
  },
  {
    id: 2,
    day: 'Tuesday',
    date: '16 Jan 2024',
    times: ['10:00 AM', '11:00 AM', '4:00 PM']
  },
  {
    id: 3,
    day: 'Wednesday',
    date: '17 Jan 2024',
    times: ['9:00 AM', '1:00 PM', '2:00 PM']
  }
])

const newTimeSlot = ref({
  date: '',
  times: [] as string[]
})

const availableTimes = ref([
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
])

const acceptJob = (jobId: number) => {
  const job = jobRequests.value.find(j => j.id === jobId)
  if (job) {
    job.status = 'accepted'
    jobRequests.value = jobRequests.value.filter(j => j.id !== jobId)
    // In real app, send API request
  }
}

const rejectJob = (jobId: number) => {
  const job = jobRequests.value.find(j => j.id === jobId)
  if (job) {
    job.status = 'rejected'
    jobRequests.value = jobRequests.value.filter(j => j.id !== jobId)
    // In real app, send API request
  }
}

const viewJobDetails = (jobId: number) => {
  router.push(`/provider/jobs/${jobId}`)
}

const toggleTimeSlot = (time: string) => {
  const index = newTimeSlot.value.times.indexOf(time)
  if (index > -1) {
    newTimeSlot.value.times.splice(index, 1)
  } else {
    newTimeSlot.value.times.push(time)
  }
}

const addTimeSlot = () => {
  if (newTimeSlot.value.date && newTimeSlot.value.times.length > 0) {
    const date = new Date(newTimeSlot.value.date)
    const newSlot: TimeSlot = {
      id: timeSlots.value.length + 1,
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      times: [...newTimeSlot.value.times]
    }
    timeSlots.value.push(newSlot)
    showTimeSlotModal.value = false
    newTimeSlot.value = { date: '', times: [] }
  }
}

const removeTimeSlot = (slotId: number) => {
  timeSlots.value = timeSlots.value.filter(slot => slot.id !== slotId)
}
</script>