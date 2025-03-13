<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 max-w-full md:max-w-md w-full h-full md:h-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <Button
          @click="$emit('close')"
          variant="text"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <span class="text-2xl">&times;</span>
        </Button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);
</script>
