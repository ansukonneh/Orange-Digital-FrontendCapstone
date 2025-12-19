<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
    <div class="mb-4">
      <svg class="w-24 h-24 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h3 class="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h3>
    <p class="text-gray-400 mb-6">{{ message || 'An error occurred while loading data.' }}</p>
    <button
      v-if="showRetry"
      @click="$emit('retry')"
      class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  showRetry: {
    type: Boolean,
    default: true
  }
})

defineEmits(['retry'])
</script>


