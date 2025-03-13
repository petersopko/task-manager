<template>
  <div v-if="message" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>
