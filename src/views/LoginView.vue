<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
    <div class="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 w-full max-w-md animate-fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
      
      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm text-gray-700 font-medium">Email</label>
          <input v-model="email" type="email" placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        <div class="relative">
          <label class="block mb-1 text-sm text-gray-700 font-medium">Password</label>

          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            v-if="password"
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.944-9.543-7a10.056 10.056 0 012.964-4.568m3.639-2.115A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.507 2.592M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3L3 3m18 18l-6-6" />
            </svg>
          </button>
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg cursor-pointer">
          Login
        </button>

        <p v-if="error" class="text-red-500 text-center text-sm mt-2">{{ error }}</p>
      </form>

      <p class="text-sm text-center mt-5 text-gray-600">
        Don’t have an account?
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      showPassword: false
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/chargers')
      } catch (e) {
        this.error = 'Invalid credentials'
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
