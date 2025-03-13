<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 mb-2">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :autocomplete="autocomplete"
      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    >
      <slot></slot>
    </select>
    <p v-if="hint" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
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
    type: [String, Number],
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
  hint: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
