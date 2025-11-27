<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
      <p class="text-gray-600">Manage your scheduled services</p>
    </div>

    <!-- Appointment Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 px-1 border-b-2 font-medium text-sm transition"
            :class="activeTab === tab.id ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.name }} ({{ getAppointmentsCount(tab.id) }})
          </button>
        </nav>
      </div>
    </div>

    <!-- Appointments List -->
    <div class="space-y-4">
      <div 
        v-for="appointment in filteredAppointments" 
        :key="appointment.id"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center space-x-4 flex-1">
            <div class="text-3xl">{{ appointment.serviceIcon }}</div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800 text-lg">{{ appointment.serviceName }}</h3>
              <p class="text-gray-600">for {{ appointment.customerName }}</p>
              
              <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <div class="flex items-center space-x-1">
                  <span>📅</span>
                  <span>{{ appointment.date }} at {{ appointment.time }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{{ appointment.duration }} hours</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{{ appointment.address }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>💰</span>
                  <span class="font-semibold">${{ appointment.amount }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div class="text-right mb-2">
              <div class="text-2xl font-bold text-gray-800">${{ appointment.amount }}</div>
              <div :class="getStatusClass(appointment.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1">
                {{ appointment.status }}
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button 
                v-if="appointment.status === 'Scheduled'"
                @click="startService(appointment.id)"
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
              >
                Start Service
              </button>
              <button 
                v-if="appointment.status === 'In Progress'"
                @click="completeService(appointment.id)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Complete
              </button>
              <button 
                @click="viewAppointmentDetails(appointment.id)"
                class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm"
              >
                Details
              </button>
              <button 
                v-if="appointment.status === 'Scheduled'"
                @click="rescheduleAppointment(appointment.id)"
                class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAppointments.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📅</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No appointments</h3>
        <p class="text-gray-500">You don't have any {{ activeTab.toLowerCase() }} appointments</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Appointment {
  id: number
  serviceName: string
  serviceIcon: string
  customerName: string
  date: string
  time: string
  duration: number
  address: string
  amount: number
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
}

const router = useRouter()
const activeTab = ref<'upcoming' | 'completed'>('upcoming')

const tabs = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'completed', name: 'Completed' }
]

const appointments = ref<Appointment[]>([
  {
    id: 1,
    serviceName: 'Plumbing',
    serviceIcon: '🔧',
    customerName: 'John Doe',
    date: '15 Jan 2024',
    time: '10:00 AM',
    duration: 2,
    address: '123 Main St, Apt 4B',
    amount: 120,
    status: 'Scheduled'
  },
  {
    id: 2,
    serviceName: 'Electrical',
    serviceIcon: '⚡',
    customerName: 'Sarah Wilson',
    date: '16 Jan 2024',
    time: '2:00 PM',
    duration: 3,
    address: '456 Oak Avenue',
    amount: 180,
    status: 'In Progress'
  },
  {
    id: 3,
    serviceName: 'Carpentry',
    serviceIcon: '🪚',
    customerName: 'Mike Johnson',
    date: '10 Jan 2024',
    time: '11:00 AM',
    duration: 4,
    address: '789 Pine Road',
    amount: 220,
    status: 'Completed'
  }
])

const filteredAppointments = computed(() => {
  const now = new Date()
  return appointments.value.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    if (activeTab.value === 'upcoming') {
      return appointmentDate >= now && appointment.status !== 'Completed'
    } else {
      return appointmentDate < now || appointment.status === 'Completed'
    }
  })
})

const getAppointmentsCount = (tabId: string) => {
  const now = new Date()
  return appointments.value.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    if (tabId === 'upcoming') {
      return appointmentDate >= now && appointment.status !== 'Completed'
    } else {
      return appointmentDate < now || appointment.status === 'Completed'
    }
  }).length
}

const getStatusClass = (status: string) => {
  const classes = {
    'Scheduled': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes]
}

const startService = (appointmentId: number) => {
  const appointment = appointments.value.find(a => a.id === appointmentId)
  if (appointment) {
    appointment.status = 'In Progress'
  }
}

const completeService = (appointmentId: number) => {
  const appointment = appointments.value.find(a => a.id === appointmentId)
  if (appointment) {
    appointment.status = 'Completed'
  }
}

const viewAppointmentDetails = (appointmentId: number) => {
  router.push(`/provider/appointments/${appointmentId}`)
}

const rescheduleAppointment = (appointmentId: number) => {
  // In real app, open reschedule modal
  alert('Reschedule functionality would open here')
}
</script>