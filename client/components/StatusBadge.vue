<template>
  <span
    :class="{
      'bg-yellow-100 text-yellow-800': status === 'pending',
      'bg-blue-100 text-blue-800': status === 'in-progress',
      'bg-green-100 text-green-800': status === 'done',
      'px-2 py-1 rounded text-sm': true,
    }"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  status: {
    type: String,
    required: true,
    validator: (value: string) =>
      ["pending", "in-progress", "done"].includes(value),
  },
});
</script>
