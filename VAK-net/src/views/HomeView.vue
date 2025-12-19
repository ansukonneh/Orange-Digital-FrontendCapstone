<template>
  <div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <div v-if="featuredMovie" class="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
      <!-- Backdrop Image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${heroBackdropUrl})` }"
      >
        <!-- Gradient Overlays -->
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative h-full flex items-center container mx-auto px-4 md:px-6 lg:px-8">
        <div class="max-w-2xl z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {{ featuredMovie.title }}
          </h1>
          <p class="text-gray-200 text-lg md:text-xl mb-6 line-clamp-3 md:line-clamp-none">
            {{ featuredMovie.overview }}
          </p>
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <!-- Rating -->
            <div class="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded">
              <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="text-white font-semibold">{{ featuredMovie.vote_average?.toFixed(1) }}</span>
            </div>
            <!-- Release Year -->
            <span class="text-white text-lg">{{ formatYear(featuredMovie.release_date) }}</span>
            <!-- Genres -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genreId in featuredMovie.genre_ids?.slice(0, 2)"
                :key="genreId"
                class="bg-red-600/80 text-white px-3 py-1 rounded text-sm"
              >
                {{ getGenreName(genreId) }}
              </span>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex gap-4">
            <router-link
              :to="`/movie/${featuredMovie.id}`"
              class="px-6 py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
              Play
            </router-link>
            <router-link
              :to="`/movie/${featuredMovie.id}`"
              class="px-6 py-3 bg-gray-700/80 hover:bg-gray-700 text-white font-semibold rounded transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              More Info
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Movie Sections -->
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      <!-- Trending Movies -->
      <div v-if="trendingLoading">
        <Loader />
      </div>
      <Error v-else-if="trendingError" :message="trendingError" />
      <MovieCarousel v-else-if="trendingMovies.length > 0" title="Trending Now on VAK-net" :movies="trendingMovies" />

      <!-- Popular Movies -->
      <div v-if="popularLoading">
        <Loader />
      </div>
      <Error v-else-if="popularError" :message="popularError" />
      <MovieCarousel v-else-if="popularMovies.length > 0" title="Popular on VAK-NET" :movies="popularMovies" />

      <!-- Top Rated Movies -->
      <div v-if="topRatedLoading">
        <Loader />
      </div>
      <Error v-else-if="topRatedError" :message="topRatedError" />
      <MovieCarousel v-else-if="topRatedMovies.length > 0" title="Top Rated on VAK-net" :movies="topRatedMovies" />

      <!-- Now Playing -->
      <div v-if="nowPlayingLoading">
        <Loader />
      </div>
      <Error v-else-if="nowPlayingError" :message="nowPlayingError" />
      <MovieCarousel v-else-if="nowPlayingMovies.length > 0" title="Now Playing on VAK-net" :movies="nowPlayingMovies" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MovieCarousel from '@/components/MovieCarousel.vue'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'
import * as tmdb from '@/services/tmdb'

const trendingMovies = ref([])
const trendingLoading = ref(false)
const trendingError = ref(null)

const popularMovies = ref([])
const popularLoading = ref(false)
const popularError = ref(null)

const topRatedMovies = ref([])
const topRatedLoading = ref(false)
const topRatedError = ref(null)

const nowPlayingMovies = ref([])
const nowPlayingLoading = ref(false)
const nowPlayingError = ref(null)

const featuredMovie = ref(null)
const genres = ref([])

const heroBackdropUrl = computed(() => {
  if (!featuredMovie.value?.backdrop_path) return ''
  return tmdb.getImageUrl(featuredMovie.value.backdrop_path, 'w1280')
})

async function fetchGenres() {
  try {
    const data = await tmdb.getGenres()
    genres.value = data.genres || []
  } catch (err) {
    console.error('Failed to fetch genres:', err)
  }
}

function getGenreName(genreId) {
  const genre = genres.value.find(g => g.id === genreId)
  return genre?.name || ''
}

function formatYear(dateString) {
  if (!dateString) return ''
  return new Date(dateString).getFullYear()
}

async function fetchAllMovies() {
  // Fetch genres first
  await fetchGenres()

  // Fetch trending movies (use first as featured)
  trendingLoading.value = true
  trendingError.value = null
  try {
    const data = await tmdb.getTrendingMovies('week')
    trendingMovies.value = data.results || []
    // Set first trending movie as featured
    if (trendingMovies.value.length > 0 && !featuredMovie.value) {
      featuredMovie.value = trendingMovies.value[0]
    }
  } catch (err) {
    trendingError.value = err.message || 'Failed to fetch trending movies'
  } finally {
    trendingLoading.value = false
  }

  // Fetch popular movies
  popularLoading.value = true
  popularError.value = null
  try {
    const data = await tmdb.getPopularMovies(1)
    popularMovies.value = data.results || []
  } catch (err) {
    popularError.value = err.message || 'Failed to fetch popular movies'
  } finally {
    popularLoading.value = false
  }

  // Fetch top rated movies
  topRatedLoading.value = true
  topRatedError.value = null
  try {
    const data = await tmdb.getTopRatedMovies(1)
    topRatedMovies.value = data.results || []
  } catch (err) {
    topRatedError.value = err.message || 'Failed to fetch top rated movies'
  } finally {
    topRatedLoading.value = false
  }

  // Fetch now playing movies
  nowPlayingLoading.value = true
  nowPlayingError.value = null
  try {
    const data = await tmdb.getNowPlayingMovies(1)
    nowPlayingMovies.value = data.results || []
  } catch (err) {
    nowPlayingError.value = err.message || 'Failed to fetch now playing movies'
  } finally {
    nowPlayingLoading.value = false
  }
}

onMounted(() => {
  fetchAllMovies()
})
</script>
