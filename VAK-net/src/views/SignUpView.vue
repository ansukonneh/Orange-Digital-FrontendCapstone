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

      <!-- Sign Up Form -->
      <div class="bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h2 class="text-3xl font-bold text-white mb-6">Sign Up</h2>
        
        <form @submit.prevent="handleSignUp" class="space-y-6">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter your full name"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

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
              minlength="6"
              placeholder="Enter your password (min. 6 characters)"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <!-- Terms Agreement -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="formData.agreeToTerms"
              type="checkbox"
              required
              class="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600 focus:ring-offset-0"
            />
            <label for="terms" class="ml-2 text-sm text-gray-300">
              I agree to the
              <a href="#" class="text-red-600 hover:text-red-500 transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-red-600 hover:text-red-500 transition-colors">Privacy Policy</a>
            </label>
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
            <span v-if="loading">Creating account...</span>
            <span v-else>Sign Up</span>
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            Already have an account?
            <router-link to="/signin" class="text-red-600 hover:text-red-500 font-semibold transition-colors">
              Sign in
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleSignUp() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Validation
    if (!formData.value.name || !formData.value.email || !formData.value.password || !formData.value.confirmPassword) {
      throw new Error('Please fill in all fields')
    }

    if (formData.value.password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    if (formData.value.password !== formData.value.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (!formData.value.agreeToTerms) {
      throw new Error('Please agree to the Terms of Service and Privacy Policy')
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // Check if email already exists
    const emailExists = users.some(u => u.email === formData.value.email)
    if (emailExists) {
      throw new Error('Email already registered. Please sign in instead.')
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password, // In production, this should be hashed
      createdAt: new Date().toISOString()
    }

    // Save user
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto sign in
    const session = {
      email: newUser.email,
      name: newUser.name,
      loggedIn: true,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('session', JSON.stringify(session))

    success.value = 'Account created successfully! Redirecting...'

    // Redirect to home after short delay
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    error.value = err.message || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>


