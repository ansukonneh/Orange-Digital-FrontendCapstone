<template>
  <div class="min-h-screen bg-black pt-20">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Search Movies</h1>
        <div class="relative max-w-2xl">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search for movies..."
            class="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-lg"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading">
        <Loader />
      </div>

      <!-- Error State -->
      <Error v-else-if="error" :message="error" @retry="performSearch" />

      <!-- Empty State -->
      <div v-else-if="!searchQuery.trim()" class="text-center py-20">
        <svg
          class="w-24 h-24 text-gray-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <p class="text-gray-400 text-lg">Start typing to search for movies</p>
      </div>

      <!-- No Results -->
      <div v-else-if="movies.length === 0 && !loading" class="text-center py-20">
        <p class="text-gray-400 text-xl mb-2">No movies found</p>
        <p class="text-gray-500">Try a different search term</p>
      </div>

      <!-- Search Results -->
      <div v-else>
        <div class="mb-4">
          <p class="text-gray-400">
            Found <span class="text-white font-semibold">{{ totalResults }}</span> results
            <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
          </p>
        </div>

        <!-- Movie Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          <MovieCard
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-8">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-950 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
          >
            Previous
          </button>
          <span class="text-gray-400">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-950 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as tmdb from '@/services/tmdb'
import MovieCard from '@/components/MovieCard.vue'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)

let searchTimeout = null

// Initialize search query from route
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    performSearch(searchQuery.value, 1)
  }
})

function handleSearch() {
  // Update URL query parameter
  if (searchQuery.value.trim()) {
    router.replace({ query: { q: searchQuery.value } })
  } else {
    router.replace({ query: {} })
    movies.value = []
    return
  }

  // Debounce search
  clearTimeout(searchTimeout)
  currentPage.value = 1
  searchTimeout = setTimeout(() => {
    performSearch(searchQuery.value, 1)
  }, 300)
}

async function performSearch(query, page = 1) {
  if (!query || !query.trim()) {
    movies.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const data = await tmdb.searchMovies(query, page)
    movies.value = data.results || []
    currentPage.value = data.page || 1
    totalPages.value = data.total_pages || 1
    totalResults.value = data.total_results || 0
  } catch (err) {
    error.value = err.message || 'Failed to search movies'
    movies.value = []
  } finally {
    loading.value = false
  }
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  performSearch(searchQuery.value, page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>


