<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Messages</h1>
      <p class="text-gray-600">Chat with your service providers</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="flex h-[600px]">
        <!-- Conversations List -->
        <div class="w-1/3 border-r border-gray-200">
          <div class="p-4 border-b border-gray-200">
            <input 
              type="text" 
              placeholder="Search conversations..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div class="overflow-y-auto h-full">
            <div 
              v-for="conversation in conversations" 
              :key="conversation.id"
              @click="selectConversation(conversation.id)"
              class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
              :class="{ 'bg-blue-50': activeConversation === conversation.id }"
            >
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ getInitials(conversation.providerName) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h4 class="font-semibold text-gray-800 truncate">{{ conversation.providerName }}</h4>
                    <span class="text-xs text-gray-500">{{ conversation.lastMessageTime }}</span>
                  </div>
                  <p class="text-sm text-gray-600 truncate">{{ conversation.lastMessage }}</p>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="text-xs px-2 py-1 rounded-full" :class="getServiceClass(conversation.serviceName)">
                      {{ conversation.serviceName }}
                    </span>
                    <span v-if="conversation.unread" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {{ conversation.unread }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="conversations.length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">💬</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">No conversations</h3>
              <p class="text-gray-500">Your messages with providers will appear here</p>
            </div>
          </div>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 flex flex-col">
          <!-- Chat Header -->
          <div v-if="activeConversation" class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ getInitials(getActiveConversation()?.providerName || '') }}
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">{{ getActiveConversation()?.providerName }}</h3>
                  <p class="text-sm text-gray-600">{{ getActiveConversation()?.serviceName }} • Online</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="p-2 hover:bg-gray-100 rounded-lg transition">
                  <span class="text-lg">📞</span>
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition">
                  <span class="text-lg">ⓘ</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div v-if="activeConversation" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <div 
              v-for="message in getActiveMessages()" 
              :key="message.id"
              class="flex"
              :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div 
                class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
                :class="message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-200'"
              >
                <p class="text-sm">{{ message.text }}</p>
                <p class="text-xs mt-1 opacity-70">{{ message.time }}</p>
              </div>
            </div>

            <!-- Empty Chat -->
            <div v-if="getActiveMessages().length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">💭</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
              <p class="text-gray-500">Start a conversation with your service provider</p>
            </div>
          </div>

          <!-- Message Input -->
          <div v-if="activeConversation" class="p-4 border-t border-gray-200">
            <div class="flex space-x-3">
              <button class="p-2 hover:bg-gray-100 rounded-lg transition">
                <span class="text-lg">📎</span>
              </button>
              <input 
                v-model="newMessage"
                @keypress.enter="sendMessage"
                type="text" 
                placeholder="Type a message..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <button 
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>

          <!-- No Conversation Selected -->
          <div v-if="!activeConversation" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">👋</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p class="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Conversation {
  id: number
  providerName: string
  serviceName: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  bookingId: number
}

interface Message {
  id: number
  conversationId: number
  sender: 'user' | 'provider'
  text: string
  time: string
  read: boolean
}

const activeConversation = ref<number | null>(null)
const newMessage = ref('')

const conversations = ref<Conversation[]>([
  {
    id: 1,
    providerName: 'John Smith',
    serviceName: 'Plumbing',
    lastMessage: 'I will arrive in 15 minutes',
    lastMessageTime: '10:45 AM',
    unread: 2,
    bookingId: 1
  },
  {
    id: 2,
    providerName: 'Sarah Wilson',
    serviceName: 'Cleaning',
    lastMessage: 'Thank you for choosing our service!',
    lastMessageTime: 'Yesterday',
    unread: 0,
    bookingId: 2
  },
  {
    id: 3,
    providerName: 'Mike Johnson',
    serviceName: 'Electrical',
    lastMessage: 'The parts have been ordered',
    lastMessageTime: '2 days ago',
    unread: 1,
    bookingId: 3
  }
])

const messages = ref<Message[]>([
  {
    id: 1,
    conversationId: 1,
    sender: 'provider',
    text: 'Hello! I am on my way to your location.',
    time: '10:30 AM',
    read: true
  },
  {
    id: 2,
    conversationId: 1,
    sender: 'user',
    text: 'Great! Looking forward to your arrival.',
    time: '10:32 AM',
    read: true
  },
  {
    id: 3,
    conversationId: 1,
    sender: 'provider',
    text: 'I will arrive in 15 minutes',
    time: '10:45 AM',
    read: false
  }
])

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getServiceClass = (serviceName: string) => {
  const classes: { [key: string]: string } = {
    'Plumbing': 'bg-blue-100 text-blue-800',
    'Cleaning': 'bg-green-100 text-green-800',
    'Electrical': 'bg-yellow-100 text-yellow-800',
    'Painting': 'bg-purple-100 text-purple-800'
  }
  return classes[serviceName] || 'bg-gray-100 text-gray-800'
}

const selectConversation = (conversationId: number) => {
  activeConversation.value = conversationId
  // Mark messages as read
  messages.value.forEach(msg => {
    if (msg.conversationId === conversationId && !msg.read) {
      msg.read = true
    }
  })
  // Reset unread count
  const conversation = conversations.value.find(c => c.id === conversationId)
  if (conversation) {
    conversation.unread = 0
  }
}

const getActiveConversation = () => {
  return conversations.value.find(c => c.id === activeConversation.value)
}

const getActiveMessages = () => {
  return messages.value.filter(msg => msg.conversationId === activeConversation.value)
}

const sendMessage = () => {
  if (newMessage.value.trim() && activeConversation.value) {
    const message: Message = {
      id: messages.value.length + 1,
      conversationId: activeConversation.value,
      sender: 'user',
      text: newMessage.value.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: true
    }
    messages.value.push(message)
    newMessage.value = ''
    
    // Update conversation last message
    const conversation = conversations.value.find(c => c.id === activeConversation.value)
    if (conversation) {
      conversation.lastMessage = message.text
      conversation.lastMessageTime = 'Just now'
    }
  }
}
</script>