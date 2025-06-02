<template>
  <div class="h-screen w-full">
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
import { ref, onMounted } from "vue";
import axios from "axios";
import L from "leaflet";

import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import redIconUrl from "../assets/marker-icon-red.png";
import greenIconUrl from "../assets/marker-icon-green.png";
import shadowUrl from "../assets/marker-shadow.png";


const redIcon = new L.Icon({
  iconUrl: redIconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: greenIconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


function getMarkerIcon(status) {
  return status === "Active" ? greenIcon : redIcon;
}

const chargers = ref([]);


onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chargers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    chargers.value = res.data;
    console.log("Chargers loaded:", chargers.value);
  } catch (error) {
    console.error("Failed to load chargers:", error);
  }
});

</script>
