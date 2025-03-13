<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 mb-2">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement)?.value || ''
        )
      "
      :required="required"
      :rows="rows"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    ></textarea>
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
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [String, Number],
    default: 3,
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
</script>
