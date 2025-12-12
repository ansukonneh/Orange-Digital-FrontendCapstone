<template>
  <footer class="bg-black border-t border-gray-900 mt-20">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold text-white mb-4">MovieHub</h3>
          <p class="text-gray-400 text-sm">
            Your ultimate destination for discovering and exploring movies. Built with Vue 3 and powered by TMDB.
          </p>
        </div>

        <!-- Links Section -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-red-600 transition-colors text-sm">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/browse" class="text-gray-400 hover:text-red-600 transition-colors text-sm">
                Browse Movies
              </router-link>
            </li>
            <li>
              <router-link to="/search" class="text-gray-400 hover:text-red-600 transition-colors text-sm">
                Search
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Attribution Section -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Powered By</h4>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.75 0H5.25C2.35 0 0 2.35 0 5.25v13.5C0 21.65 2.35 24 5.25 24h13.5C21.65 24 24 21.65 24 18.75V5.25C24 2.35 21.65 0 18.75 0zM20.25 18.75c0 .825-.675 1.5-1.5 1.5H5.25c-.825 0-1.5-.675-1.5-1.5V5.25c0-.825.675-1.5 1.5-1.5h13.5c.825 0 1.5.675 1.5 1.5v13.5z"/>
              <path d="M12 6L8.25 10.5h7.5L12 6zm0 12l3.75-4.5h-7.5L12 18z"/>
            </svg>
            The Movie Database (TMDB)
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-900 pt-6 text-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ currentYear }} VAK-Net. All rights reserved. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

