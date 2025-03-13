<template>
  <div class="bg-white p-4 rounded shadow">
    <div class="flex justify-between items-start">
      <h2
        class="text-lg font-semibold truncate max-w-[70%]"
        :title="task.title"
      >
        {{ task.title }}
      </h2>
      <div class="flex space-x-2">
        <Button @click="$emit('edit', task)" variant="text" size="sm">
          Edit
        </Button>
        <Button
          @click="$emit('delete', task.id)"
          variant="text"
          size="sm"
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </Button>
      </div>
    </div>
    <p
      class="text-gray-600 mt-2 line-clamp-3 overflow-hidden"
      :title="task.description"
    >
      {{ task.description }}
    </p>
    <div class="mt-4 flex justify-between items-center">
      <StatusBadge :status="task.status || 'pending'" />
      <DateDisplay v-if="task.dueDate" :date="task.dueDate" prefix="Due: " />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";
import Button from "~/components/Button.vue";
import StatusBadge from "~/components/StatusBadge.vue";
import DateDisplay from "~/components/DateDisplay.vue";

defineProps<{
  task: Task;
}>();

defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", taskId: number): void;
}>();

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}
</script>

<style scoped>
/* For browsers that don't support line-clamp */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 4.5rem; /* Approximately 3 lines of text */
}
</style>
