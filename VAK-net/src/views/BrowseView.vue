<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-6">Browse Movies</h1>

        <!-- Genre Filters -->
        <div v-if="genresLoading">
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="i in 8"
              :key="i"
              class="h-10 w-24 bg-gray-800 rounded-full animate-pulse"
            ></div>
          </div>
        </div>
        <div v-else-if="genres.length > 0" class="flex flex-wrap gap-3">
          <button
            @click="selectGenre(null)"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-all duration-200',
              selectedGenre === null
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            ]"
          >
            All
          </button>
          <button
            v-for="genre in genres"
            :key="genre.id"
            @click="selectGenre(genre.id)"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-all duration-200',
              selectedGenre === genre.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            ]"
          >
            {{ genre.name }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="moviesLoading">
        <Loader />
      </div>

      <!-- Error State -->
      <Error v-else-if="moviesError" :message="moviesError" @retry="fetchMovies" />

      <!-- Empty State -->
      <div v-else-if="movies.length === 0 && !moviesLoading" class="text-center py-20">
        <p class="text-gray-400 text-xl">No movies found for this genre</p>
      </div>

      <!-- Movie Grid -->
      <div v-else>
        <div v-if="selectedGenre" class="mb-4">
          <p class="text-gray-400">
            Showing movies in <span class="text-white font-semibold">{{ selectedGenreName }}</span>
          </p>
        </div>

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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import * as tmdb from '@/services/tmdb'
import MovieCard from '@/components/MovieCard.vue'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'

const route = useRoute()

const genres = ref([])
const genresLoading = ref(false)
const selectedGenre = ref(null)
const movies = ref([])
const moviesLoading = ref(false)
const moviesError = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const selectedGenreName = computed(() => {
  if (!selectedGenre.value) return ''
  const genre = genres.value.find(g => g.id === selectedGenre.value)
  return genre?.name || ''
})

// Initialize selected genre from route
onMounted(async () => {
  await fetchGenres()
  
  if (route.params.genreId) {
    const genreId = parseInt(route.params.genreId)
    selectGenre(genreId)
  } else {
    // Default: show popular movies
    fetchMovies()
  }
})

async function fetchGenres() {
  genresLoading.value = true
  try {
    const data = await tmdb.getGenres()
    genres.value = data.genres || []
  } catch (err) {
    console.error('Failed to fetch genres:', err)
  } finally {
    genresLoading.value = false
  }
}

async function fetchMovies(page = 1) {
  moviesLoading.value = true
  moviesError.value = null
  currentPage.value = page

  try {
    let data
    if (selectedGenre.value) {
      data = await tmdb.getMoviesByGenre(selectedGenre.value, page)
    } else {
      // If no genre selected, show popular movies
      data = await tmdb.getPopularMovies(page)
    }
    movies.value = data.results || []
    totalPages.value = data.total_pages || 1
  } catch (err) {
    moviesError.value = err.message || 'Failed to fetch movies'
    movies.value = []
  } finally {
    moviesLoading.value = false
  }
}

function selectGenre(genreId) {
  selectedGenre.value = genreId
  currentPage.value = 1
  fetchMovies(1)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  fetchMovies(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>


