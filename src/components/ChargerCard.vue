<template>
  <div
    class="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200 mx-auto">
 
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-2">
      <h3 class="text-2xl font-bold text-gray-900 tracking-tight truncate" :title="charger.name">
        {{ charger.name }}
      </h3>
      <span :class="[
        'text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider select-none w-max',
        charger.status === 'Active'
          ? 'bg-green-500 text-white shadow-md'
          : 'bg-red-500 text-white shadow-md'
      ]">
        {{ charger.status }}
      </span>
    </div>


    <div class="space-y-4 text-gray-700">
      <div class="flex items-start gap-4">
        <PowerIcon class="w-6 h-6 text-yellow-500 mt-1" />
        <div>
          <p class="font-semibold text-base">Power Output</p>
          <p class="text-gray-500 text-sm">{{ charger.power }} kW</p>
        </div>
      </div>

      <div class="flex items-start gap-4">
        <ConnectorIcon class="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <p class="font-semibold text-base">Connector Type</p>
          <p class="text-gray-500 text-sm">{{ charger.connectorType }}</p>
        </div>
      </div>

      <div class="flex items-start gap-4">
        <AddressIcon class="w-6 h-6 text-green-500 mt-1" />
        <div class="w-full">
          <p class="font-semibold text-base">Address</p>
          <p class="text-gray-500 text-sm truncate" :title="charger.address">{{ charger.address || 'N/A' }}</p>
        </div>
      </div>

      <div class="flex items-start gap-4">
        <LocationIcon class="w-6 h-6 text-red-500 mt-1" />
        <div>
          <p class="font-semibold text-base">Coordinates</p>
          <p class="text-gray-500 text-sm">{{ charger.location.lat }}, {{ charger.location.lng }}</p>
        </div>
      </div>
    </div>


    <div class="flex flex-col sm:flex-row justify-end gap-3 mt-6">
      <button @click="$emit('edit', charger)"
        class="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md font-semibold transition duration-300 ease-in-out cursor-pointer">
        <EditIcon class="w-5 h-5" />
        Edit
      </button>
      <button @click="$emit('delete', charger._id)"
        class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-md font-semibold transition duration-300 ease-in-out cursor-pointer">
        <DeleteIcon class="w-5 h-5" />
        Delete
      </button>
    </div>
  </div>
</template>


<script>
const PowerIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M13 2L3 14h7v8l7-12h-7z"/></svg>`,
};

const ConnectorIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M16 2l4 4-4 4M4 12v6a2 2 0 002 2h8a2 2 0 002-2v-6"/></svg>`,
};

const LocationIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

const AddressIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
  <circle cx="12" cy="9" r="2.5"/>
</svg>`,
};

const EditIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
};

const DeleteIcon = {
  template: `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
};

export default {
  props: ['charger'],
  components: {
    PowerIcon,
    ConnectorIcon,
    LocationIcon,
    AddressIcon,
    EditIcon,
    DeleteIcon,
  },
};
</script>
