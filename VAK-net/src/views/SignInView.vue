<template>
  <div class="min-h-screen bg-black pt-20 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-red-600 hover:text-red-500 transition-colors">
            MovieHub
          </h1>
        </router-link>
      </div>

      <!-- Sign In Form -->
      <div class="bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h2 class="text-3xl font-bold text-white mb-6">Sign In</h2>
        
        <form @submit.prevent="handleSignIn" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="w-4 h-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600 focus:ring-offset-0"
              />
              <span class="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
            <a href="#" class="text-sm text-red-600 hover:text-red-500 transition-colors">
              Forgot password?
            </a>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded text-sm">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded text-sm">
            {{ success }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            New to MovieHub?
            <router-link to="/signup" class="text-red-600 hover:text-red-500 font-semibold transition-colors">
              Sign up now
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleSignIn() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Basic validation
    if (!formData.value.email || !formData.value.password) {
      throw new Error('Please fill in all fields')
    }

    // In a real app, you would make an API call here
    // For now, we'll simulate successful login
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      u => u.email === formData.value.email && u.password === formData.value.password
    )

    if (user) {
      // Store user session
      const session = {
        email: user.email,
        name: user.name,
        loggedIn: true,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('session', JSON.stringify(session))
      
      success.value = 'Sign in successful! Redirecting...'
      
      // Redirect to home after short delay
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (err) {
    error.value = err.message || 'Failed to sign in. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>


