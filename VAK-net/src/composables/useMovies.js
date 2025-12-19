import { ref } from 'vue'
import * as tmdb from '@/services/tmdb'

/**
 * Composable for fetching and managing movie data
 */
export function useMovies() {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch trending movies
   */
  async function fetchTrending(timeWindow = 'week') {
    loading.value = true
    error.value = null
    try {
      const data = await tmdb.getTrendingMovies(timeWindow)
      movies.value = data.results || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch trending movies'
      movies.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch popular movies
   */
  async function fetchPopular(page = 1) {
    loading.value = true
    error.value = null
    try {
      const data = await tmdb.getPopularMovies(page)
      movies.value = data.results || []
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch popular movies'
      movies.value = []
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch top rated movies
   */
  async function fetchTopRated(page = 1) {
    loading.value = true
    error.value = null
    try {
      const data = await tmdb.getTopRatedMovies(page)
      movies.value = data.results || []
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch top rated movies'
      movies.value = []
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch now playing movies
   */
  async function fetchNowPlaying(page = 1) {
    loading.value = true
    error.value = null
    try {
      const data = await tmdb.getNowPlayingMovies(page)
      movies.value = data.results || []
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch now playing movies'
      movies.value = []
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Search movies
   */
  async function search(query, page = 1) {
    if (!query || query.trim() === '') {
      movies.value = []
      return null
    }

    loading.value = true
    error.value = null
    try {
      const data = await tmdb.searchMovies(query, page)
      movies.value = data.results || []
      return data
    } catch (err) {
      error.value = err.message || 'Failed to search movies'
      movies.value = []
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch movies by genre
   */
  async function fetchByGenre(genreId, page = 1) {
    loading.value = true
    error.value = null
    try {
      const data = await tmdb.getMoviesByGenre(genreId, page)
      movies.value = data.results || []
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch movies by genre'
      movies.value = []
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset state
   */
  function reset() {
    movies.value = []
    loading.value = false
    error.value = null
  }

  return {
    movies,
    loading,
    error,
    fetchTrending,
    fetchPopular,
    fetchTopRated,
    fetchNowPlaying,
    search,
    fetchByGenre,
    reset
  }
}


