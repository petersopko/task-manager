<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 mb-2">{{ label }}</label>
    <div class="relative" @click="openDatePicker">
      <input
        :id="id"
        ref="datePickerInput"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="date"
        :required="required"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 cursor-pointer date-input"
      />
      <div
        class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
    <p v-if="hint" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  placeholder: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

const datePickerInput = ref<HTMLInputElement | null>(null);

// Function to open the date picker
function openDatePicker() {
  if (datePickerInput.value) {
    datePickerInput.value.showPicker
      ? datePickerInput.value.showPicker()
      : datePickerInput.value.focus();
  }
}
</script>

<style scoped>
/* Hide the default calendar icon in date inputs */
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
