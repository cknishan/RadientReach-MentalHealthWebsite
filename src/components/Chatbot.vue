<!-- src/components/Chatbot.vue -->
<template>
  <div>
    <!-- Floating chat window -->
    <div
      v-if="isChatOpen"
      class="fixed bottom-4 right-0 w-full max-w-sm bg-white shadow-lg rounded-lg z-50 md:max-w-md"
    >
      <!-- Chat header -->
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-700">Gemini Assistant</h2>
        <button
          @click="toggleChat"
          class="text-gray-500 hover:text-red-600 transition"
        >
          ✖
        </button>
      </div>

      <!-- Chat messages -->
      <div
        class="h-[60vh] max-h-96 overflow-y-auto p-4 space-y-3"
        ref="messageContainer"
      >
        <div v-for="(message, index) in messages" :key="index">
          <div :class="{
            'flex justify-end': message.role === 'user',
            'flex justify-start': message.role === 'assistant'
          }">
            <div :class="{
              'bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[75%] break-words': message.role === 'user',
              'bg-gray-100 text-gray-800 rounded-lg py-2 px-4 max-w-[75%] break-words': message.role === 'assistant'
            }">
              {{ message.content }}
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-100 text-gray-800 rounded-lg py-2 px-4">
            <span class="animate-pulse">Thinking...</span>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="border-t p-4">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            :disabled="isLoading || !userInput.trim()"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>

    <!-- Chat bubble button -->
    <button
      v-if="!isChatOpen"
      @click="toggleChat"
      class="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg z-50 hover:bg-blue-600 transition"
    >
      💬
    </button>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export default {
  name: 'ChatBot',
  setup() {
    const messages = ref([])
    const userInput = ref('')
    const isLoading = ref(false)
    const isChatOpen = ref(false)
    const messageContainer = ref(null)

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const scrollToBottom = async () => {
      await nextTick()
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
      }
    }

    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value
      if (isChatOpen.value && messages.value.length === 0) {
        messages.value.push({
          role: 'assistant',
          content: 'Hello! How can I help you today?'
        })
      }
    }

    const sendMessage = async () => {
      if (!userInput.value.trim() || isLoading.value) return

      const userMessage = userInput.value
      messages.value.push({
        role: 'user',
        content: userMessage
      })

      userInput.value = ''
      isLoading.value = true
      await scrollToBottom()

      try {
        // Generate response using Gemini AI
        const result = await model.generateContent(userMessage)
        const response = await result.response.text()

        messages.value.push({
          role: 'assistant',
          content: response
        })
      } catch (error) {
        console.error('Error:', error)
        messages.value.push({
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        })
      } finally {
        isLoading.value = false
        await scrollToBottom()
      }
    }

    return {
      messages,
      userInput,
      isLoading,
      isChatOpen,
      messageContainer,
      sendMessage,
      toggleChat
    }
  }
}
</script>
