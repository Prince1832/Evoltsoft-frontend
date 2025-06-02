<template>
  <form
    @submit.prevent="submitForm"
    class="bg-white p-5 md:p-8 rounded-xl shadow-lg max-w-xl w-full mx-auto space-y-5"
  >
  
    <input
      v-model="form.name"
      type="text"
      placeholder="Name"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      required
    />


    <input
      v-model.number="form.power"
      type="number"
      min="1"
      placeholder="Power Output (kW)"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      required
    />


    <input
      v-model="form.connectorType"
      type="text"
      placeholder="Connector Type"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      required
    />


    <input
      v-model="form.address"
      type="text"
      placeholder="Address"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />


    <div class="flex flex-col sm:flex-row gap-4">
      <input
        v-model.number="form.location.lat"
        type="number"
        step="any"
        placeholder="Latitude"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <input
        v-model.number="form.location.lng"
        type="number"
        step="any"
        placeholder="Longitude"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
    </div>

  
    <select
      v-model="form.status"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <div class="flex flex-col sm:flex-row justify-end gap-3 pt-2">
      <button
        type="submit"
        :disabled="!isFormValid"
        :class="[
          'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-300',
          !isFormValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]"
      >
        {{ isEdit ? 'Update' : 'Add' }} Station
      </button>

      <button
        type="button"
        @click="$emit('cancel')"
        class="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    data: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      form: this.data
        ? { ...this.data }
        : {
          name: '',
          power: null,
          connectorType: '',
          status: 'Active',
          address: '',
          location: { lat: null, lng: null },
        },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.name.trim() !== '' &&
        this.form.power > 0 &&
        this.form.connectorType.trim() !== '' &&
        this.form.location.lat !== null &&
        this.form.location.lng !== null
      )
    },
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        this.$emit(this.isEdit ? 'update' : 'create', this.form)
      }
    },
  },
}
</script>