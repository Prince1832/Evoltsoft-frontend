<template>
  <div class="h-screen w-full relative">
   
    <div v-if="loading" class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
      <svg class="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>

    <l-map style="height: 100%; width: 100%" :zoom="5" :center="[22.9734, 78.6569]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      
      <l-marker
        v-for="charger in chargers.filter(c => c.location && typeof c.location.lat === 'number' && typeof c.location.lng === 'number')"
        :key="charger._id" :lat-lng="[charger.location.lat, charger.location.lng]"
        :icon="getMarkerIcon(charger.status)">
        <l-popup>
          <strong>{{ charger.name }}</strong><br />
          {{ charger.address }}<br />
          Power: {{ charger.power }} kW<br />
          Type: {{ charger.connectorType }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import redIconUrl from '../assets/marker-icon-red.png'
import greenIconUrl from '../assets/marker-icon-green.png'
import shadowUrl from '../assets/marker-shadow.png'


function getMarkerIcon(status) {
  return L.icon({
    iconUrl: status === 'Active' ? greenIconUrl : redIconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

const chargers = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chargers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    chargers.value = res.data
  } catch (error) {
    console.error('Failed to load chargers:', error)
  } finally {
    loading.value = false
  }
})
</script>
