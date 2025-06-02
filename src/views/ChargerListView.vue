<template>
  <div class="min-h-screen p-6 bg-gradient-to-tr from-gray-100 to-white">
    <div class="max-w-4xl mx-auto">

      <div
        :class="['flex sm:flex-row flex-col md:gap-0 gap-3 items-center mb-6', showForm ? 'justify-center' : 'justify-between']">
        <h1 class="md:text-3xl text-2xl text-nowrap font-bold text-gray-800">
          {{ showForm ? 'Create Charging Station' : 'Charging Stations' }}
        </h1>

        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <RouterLink v-if="!showForm && chargers.length > 0" to="/map"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-1 md:text-lg text-sm justify-center cursor-pointer">
            View Map
          </RouterLink>

          <button v-if="!showForm" @click="showAddForm"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-1 md:text-lg text-sm justify-center cursor-pointer"
            :disabled="loading">
            <span v-if="!loading" class="md:text-xl">+</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Add Station
          </button>
        </div>
      </div>

      
      <div v-if="loading" class="text-center py-12">
        <svg class="animate-spin mx-auto h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p class="mt-2 text-gray-500">Loading stations...</p>
      </div>

  
      <div v-if="!loading && showForm" class="mb-6">
        <ChargerForm :data="editData" :isEdit="!!editData" @create="addCharger" @update="updateCharger"
          @cancel="cancelForm" />
      </div>

   
      <template v-if="!loading && !showForm">

        <div class="bg-white p-4 rounded-xl shadow mb-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          
            <div class="relative">
              <input v-model="searchQuery" @input="updateSuggestions" type="text" placeholder="🔍 Search by name..."
                class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <ul v-if="suggestions.length"
                class="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow mt-1 max-h-40 overflow-y-auto">
                <li v-for="(s, i) in suggestions" :key="i" @click="selectSuggestion(s)"
                  class="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-all">
                  {{ s }}
                </li>
              </ul>
            </div>

          
            <select v-model="filters.status"
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

        
            <select v-model.number="filters.power"
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">All Power Outputs</option>
              <option v-for="item in uniquePowerOutputs" :key="item" :value="Number(item)">
                {{ item }} kW
              </option>
            </select>

         
            <select v-model="filters.connectorType"
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">All Connector Types</option>
              <option v-for="type in uniqueConnectorTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <span class="text-gray-400 text-sm">Found {{ filteredChargers.length }} stations</span>
        </div>

      
        <div v-if="filteredChargers.length" class="grid gap-6 sm:grid-cols-2 grid-cols-1">
          <ChargerCard v-for="charger in filteredChargers" :key="charger._id" :charger="charger" @edit="editCharger"
            @delete="deleteCharger" />
        </div>

        <div v-else class="text-center text-gray-400 mt-8">
          No stations found matching "<strong>{{ searchQuery }}</strong>"
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ChargerCard from '../components/ChargerCard.vue'
import ChargerForm from '../components/ChargerForm.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  components: { ChargerCard, ChargerForm },
  data() {
    return {
      chargers: [],
      showForm: false,
      editData: null,
      searchQuery: '',
      suggestions: [],
      filters: {
        status: '',
        power: '',
        connectorType: ''
      },
      loading: false
    }
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter(c => {
        const matchesName = c.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = !this.filters.status || c.status === this.filters.status;
        const matchesPower = !this.filters.power || c.powerOutput === this.filters.power;
        const matchesConnector = !this.filters.connectorType || c.connectorType === this.filters.connectorType;
        return matchesName && matchesStatus && matchesPower && matchesConnector;
      });
    },
    uniquePowerOutputs() {
      return [...new Set(this.chargers.map(c => c.powerOutput))].sort((a, b) => a - b);
    },
    uniqueConnectorTypes() {
      return [...new Set(this.chargers.map(c => c.connectorType))];
    }
  },
  methods: {
    async fetchChargers() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/chargers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.chargers = res.data;
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        this.loading = false;
      }
    },
    async addCharger(data) {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login to add.");
      this.loading = true;
      try {
        await axios.post(`${API_BASE_URL}/chargers`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchChargers();
        this.showForm = false;
      } catch (error) {
        console.error("Add failed:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateCharger(data) {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login to update.");
      try {
        await axios.put(`${API_BASE_URL}/chargers/${data._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchChargers();
        this.showForm = false;
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
    async deleteCharger(id) {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login to delete.");
      try {
        await axios.delete(`${API_BASE_URL}/chargers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchChargers();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    },
    showAddForm() {
      this.editData = null;
      this.showForm = true;
    },
    editCharger(data) {
      this.editData = data;
      this.showForm = true;
    },
    cancelForm() {
      this.editData = null;
      this.showForm = false;
    },
    updateSuggestions() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) {
        this.suggestions = [];
        return;
      }
      const allNames = [...new Set(this.chargers.map(c => c.name))];
      const prefixMatches = allNames.filter(name =>
        name.toLowerCase().startsWith(query)
      );
      const substringMatches = allNames.filter(name =>
        !name.toLowerCase().startsWith(query) &&
        name.toLowerCase().includes(query)
      );
      this.suggestions = [...prefixMatches, ...substringMatches];
    },
    selectSuggestion(name) {
      this.searchQuery = name;
      this.suggestions = [];
    }
  },
  mounted() {
    this.fetchChargers();
  }
}
</script>
