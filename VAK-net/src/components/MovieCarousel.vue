<template>
  <div class="mb-10 md:mb-12">
    <!-- Section Title -->
    <h2 class="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-6 lg:px-8">{{ title }}</h2>
    
    <!-- Carousel Container -->
    <div class="relative group">
      <!-- Scrollable Container -->
      <div
        ref="scrollContainer"
        class="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-6 lg:px-8 pb-4 scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
        >
          <MovieCard :movie="movie" />
        </div>
      </div>

      <!-- Navigation Arrows (shown on hover for large screens) -->
      <button
        v-if="movies.length > 0"
        @click="scrollLeft"
        class="hidden lg:flex absolute left-0 top-0 bottom-0 items-center justify-center w-12 bg-gradient-to-r from-black/80 to-transparent hover:from-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Scroll left"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        v-if="movies.length > 0"
        @click="scrollRight"
        class="hidden lg:flex absolute right-0 top-0 bottom-0 items-center justify-center w-12 bg-gradient-to-l from-black/80 to-transparent hover:from-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Scroll right"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    default: () => []
  }
})

const scrollContainer = ref(null)

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -500, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 500, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>


