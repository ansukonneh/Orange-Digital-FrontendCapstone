<template>
  <div class="min-h-screen bg-black">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <Loader />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <Error :message="error" @retry="fetchMovieDetails" />
    </div>

    <!-- Movie Details -->
    <div v-else-if="movie" class="relative">
      <!-- Hero Section with Backdrop -->
      <div
        class="relative h-[60vh] md:h-[80vh] bg-cover bg-center"
        :style="{ backgroundImage: `url(${backdropUrl})` }"
      >
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <!-- Back Button -->
        <button
          @click="$router.go(-1)"
          class="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>

        <!-- Movie Info Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
          <div class="max-w-4xl">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {{ movie.title }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 mb-4">
              <!-- Rating -->
              <div class="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span class="text-white font-semibold">{{ movie.vote_average?.toFixed(1) }}</span>
              </div>
              <!-- Release Date -->
              <span class="text-white">{{ formatDate(movie.release_date) }}</span>
              <!-- Runtime -->
              <span v-if="movie.runtime" class="text-white">{{ formatRuntime(movie.runtime) }}</span>
              <!-- Genres -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in movie.genres"
                  :key="genre.id"
                  class="bg-red-600/80 text-white px-3 py-1 rounded text-sm"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>
            <p class="text-gray-200 text-lg md:text-xl line-clamp-3 md:line-clamp-none max-w-3xl">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Trailer Section -->
            <div v-if="trailer" class="mb-8">
              <h2 class="text-2xl font-bold text-white mb-4">Trailer</h2>
              <div class="aspect-video rounded-lg overflow-hidden bg-gray-900">
                <iframe
                  :src="trailerUrl"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Cast Section -->
            <div v-if="cast.length > 0">
              <h2 class="text-2xl font-bold text-white mb-4">Cast</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div
                  v-for="actor in cast.slice(0, 10)"
                  :key="actor.id"
                  class="text-center"
                >
                  <div class="mb-2 rounded-lg overflow-hidden bg-gray-800 aspect-[2/3]">
                    <img
                      :src="getImageUrl(actor.profile_path)"
                      :alt="actor.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <h3 class="text-white font-semibold text-sm">{{ actor.name }}</h3>
                  <p class="text-gray-400 text-xs">{{ actor.character }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h3 class="text-xl font-bold text-white mb-4">Movie Details</h3>
              <div class="space-y-4">
                <!-- Status -->
                <div v-if="movie.status">
                  <span class="text-gray-400 text-sm">Status</span>
                  <p class="text-white">{{ movie.status }}</p>
                </div>
                <!-- Original Language -->
                <div v-if="movie.original_language">
                  <span class="text-gray-400 text-sm">Original Language</span>
                  <p class="text-white uppercase">{{ movie.original_language }}</p>
                </div>
                <!-- Budget -->
                <div v-if="movie.budget">
                  <span class="text-gray-400 text-sm">Budget</span>
                  <p class="text-white">${{ formatCurrency(movie.budget) }}</p>
                </div>
                <!-- Revenue -->
                <div v-if="movie.revenue">
                  <span class="text-gray-400 text-sm">Revenue</span>
                  <p class="text-white">${{ formatCurrency(movie.revenue) }}</p>
                </div>
                <!-- Production Companies -->
                <div v-if="movie.production_companies && movie.production_companies.length > 0">
                  <span class="text-gray-400 text-sm">Production Companies</span>
                  <div class="space-y-1">
                    <p
                      v-for="company in movie.production_companies.slice(0, 3)"
                      :key="company.id"
                      class="text-white text-sm"
                    >
                      {{ company.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import * as tmdb from '@/services/tmdb'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'

const route = useRoute()
const movie = ref(null)
const cast = ref([])
const trailer = ref(null)
const loading = ref(false)
const error = ref(null)

const backdropUrl = computed(() => {
  if (!movie.value?.backdrop_path) return ''
  return tmdb.getImageUrl(movie.value.backdrop_path, 'w1280')
})

const trailerUrl = computed(() => {
  if (!trailer.value) return ''
  return `https://www.youtube.com/embed/${trailer.value.key}`
})

async function fetchMovieDetails() {
  const movieId = route.params.id
  if (!movieId) {
    error.value = 'Movie ID not found'
    return
  }

  loading.value = true
  error.value = null

  try {
    // Fetch movie details
    movie.value = await tmdb.getMovieDetails(movieId)

    // Fetch videos (trailers)
    try {
      const videosData = await tmdb.getMovieVideos(movieId)
      // Find first YouTube trailer
      trailer.value = videosData.results?.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      ) || videosData.results?.[0] || null
    } catch (err) {
      console.error('Failed to fetch videos:', err)
    }

    // Fetch credits (cast)
    try {
      const creditsData = await tmdb.getMovieCredits(movieId)
      cast.value = creditsData.cast || []
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    }
  } catch (err) {
    error.value = err.message || 'Failed to fetch movie details'
  } finally {
    loading.value = false
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatRuntime(minutes) {
  if (!minutes) return ''
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US').format(amount)
}

function getImageUrl(path) {
  return tmdb.getImageUrl(path, 'w500')
}

function handleImageError(event) {
  event.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
}

onMounted(() => {
  fetchMovieDetails()
})
</script>


