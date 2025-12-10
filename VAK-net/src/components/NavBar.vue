<template>
  <nav class="navbar">
    <div class="container navbar-content">
      <router-link to="/" class="logo">
        <span class="logo-text">VAK-Net</span>
      </router-link>
      
      <div class="nav-links" :class="{ active: mobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search movies..."
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch" class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7));
  backdrop-filter: blur(10px);
  padding: 15px 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-text {
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  font-weight: 500;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--surface-color);
  border-radius: 25px;
  padding: 5px 15px;
  border: 1px solid transparent;
}

.search-box:focus-within {
  border-color: var(--primary-color);
}

.search-box input {
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  width: 200px;
  padding: 8px;
}

.search-box input::placeholder {
  color: var(--text-secondary);
}

.search-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 5px;
}

.search-btn:hover {
  color: var(--primary-color);
}
</style>
