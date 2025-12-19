const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

/**
 * Fetch data from TMDB API
 */
async function fetchFromAPI(endpoint) {
  try {
    const separator = endpoint.includes('?') ? '&' : '?'
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('TMDB API Error:', error)
    throw error
  }
}

/**
 * Get image URL for a poster or backdrop
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
  return `${IMAGE_BASE_URL.replace('/w500', `/${size}`)}${path}`
}

/**
 * Get trending movies
 */
export async function getTrendingMovies(timeWindow = 'week') {
  return await fetchFromAPI(`/trending/movie/${timeWindow}`)
}

/**
 * Get popular movies
 */
export async function getPopularMovies(page = 1) {
  return await fetchFromAPI(`/movie/popular?page=${page}`)
}

/**
 * Get top rated movies
 */
export async function getTopRatedMovies(page = 1) {
  return await fetchFromAPI(`/movie/top_rated?page=${page}`)
}

/**
 * Get now playing movies
 */
export async function getNowPlayingMovies(page = 1) {
  return await fetchFromAPI(`/movie/now_playing?page=${page}`)
}

/**
 * Search movies
 */
export async function searchMovies(query, page = 1) {
  const encodedQuery = encodeURIComponent(query)
  return await fetchFromAPI(`/search/movie?query=${encodedQuery}&page=${page}`)
}

/**
 * Get movie details by ID
 */
export async function getMovieDetails(id) {
  return await fetchFromAPI(`/movie/${id}`)
}

/**
 * Get movie videos (trailers, )
 */
export async function getMovieVideos(id) {
  return await fetchFromAPI(`/movie/${id}/videos`)
}

/**
 * Get movie credits (cast and crew)
 */
export async function getMovieCredits(id) {
  return await fetchFromAPI(`/movie/${id}/credits`)
}

/**
 * Get all movie genres
 */
export async function getGenres() {
  return await fetchFromAPI('/genre/movie/list')
}

/**
 * Get movies by genre
 */
export async function getMoviesByGenre(genreId, page = 1) {
  return await fetchFromAPI(`/discover/movie?with_genres=${genreId}&page=${page}`)
}


