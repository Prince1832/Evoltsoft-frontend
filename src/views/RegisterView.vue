<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
    <div
      class="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 w-full max-w-md animate-fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
      <form @submit.prevent="register" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm text-gray-700 font-medium">Name</label>
          <input v-model="name" type="text" placeholder="Your name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
        </div>
        <div>
          <label class="block mb-1 text-sm text-gray-700 font-medium">Email</label>
          <input v-model="email" type="email" placeholder="Email address"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
        </div>
        <div>
          <label class="block mb-1 text-sm text-gray-700 font-medium">Password</label>
          <input v-model="password" type="password" placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
        </div>
        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg cursor-pointer">
          Register
        </button>

        <p v-if="error" class="text-red-500 text-center text-sm mt-2">{{ error }}</p>
      </form>

      <p class="text-sm text-center mt-5 text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline font-medium">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/chargers')
      } catch (e) {
        this.error = 'Registration failed. Try another email.'
      }
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
