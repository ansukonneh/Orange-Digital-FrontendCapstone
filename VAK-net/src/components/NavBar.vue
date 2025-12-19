<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-black' : 'bg-gradient-to-b from-black via-black/80 to-transparent'">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <router-link to="/" class="flex items-center gap-2 z-10" @click="mobileMenuOpen = false">
          <span class="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-500 transition-colors duration-200"> VAK-net </span>
        </router-link>
        <!-- Right Side (Search Icon + Hamburger) - Always Visible -->
        <div class="flex items-center gap-4">
          <!-- Search Icon -->
          <router-link
            to="/search"
            class="text-white hover:text-gray-300 transition-colors"
            aria-label="Search"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </router-link>

          <!-- Hamburger Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class=" text-white hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
            :aria-expanded="mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Overlay - Always Visible When Open -->
    <Transition name="slide-down">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 top-[73px] bg-black z-40 overflow-y-auto"
        @click.self="mobileMenuOpen = false"
      >
        <div class="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <!-- Navigation Links -->
          <div class="space-y-1 mb-6">
            <router-link
              to="/"
              @click="closeMenu"
              class="block px-4 py-3 text-white hover:bg-gray-900/50 hover:text-white rounded transition-colors duration-200 text-base font-medium"
              :class="{ 'bg-gray-900/50 text-white': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link
              to="/browse"
              @click="closeMenu"
              class="block px-4 py-3 text-white hover:bg-gray-900/50 hover:text-white rounded transition-colors duration-200 text-base font-medium"
              :class="{ 'bg-gray-900/50 text-white': $route.path === '/browse' }"
            >
              Browse
            </router-link>
            <router-link
              to="/search"
              @click="closeMenu"
              class="block px-4 py-3 text-white hover:bg-gray-900/50 hover:text-white rounded transition-colors duration-200 text-base font-medium"
              :class="{ 'bg-gray-900/50 text-white': $route.path === '/search' }"
            >
              Search
            </router-link>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-800 my-6"></div>

          <!-- Login/Signup Buttons -->
          <div class="space-y-3 px-4">
            <router-link
              to="/signin"
              @click="closeMenu"
              class="block w-full px-4 py-3 text-white hover:bg-gray-900/50 rounded transition-colors duration-200 text-base font-medium border border-gray-800 hover:border-gray-700 text-center"
            >
              Sign In
            </router-link>
            <router-link
              to="/signup"
              @click="closeMenu"
              class="block w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-all duration-200 text-base text-center"
            >
              Sign Up
            </router-link>
          </div>

          <!-- User Info (if logged in) -->
          <div v-if="isLoggedIn" class="mt-6 px-4 border-t border-gray-800 pt-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-white font-medium">{{ userName }}</p>
                <p class="text-gray-400 text-sm">{{ userEmail }}</p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="w-full px-4 py-2 text-red-600 hover:bg-gray-900/50 rounded transition-colors duration-200 text-sm font-medium border border-gray-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

// Check if user is logged in
const isLoggedIn = computed(() => {
  const session = localStorage.getItem('session')
  return session ? JSON.parse(session).loggedIn : false
})

const userName = computed(() => {
  const session = localStorage.getItem('session')
  if (!session) return ''
  const data = JSON.parse(session)
  return data.name || ''
})

const userEmail = computed(() => {
  const session = localStorage.getItem('session')
  if (!session) return ''
  const data = JSON.parse(session)
  return data.email || ''
})

// Handle scroll for navbar background
function handleScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Close menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

function closeMenu() {
  mobileMenuOpen.value = false
}

function handleLogout() {
  localStorage.removeItem('session')
  mobileMenuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
/* Slide down animation for mobile menu */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


