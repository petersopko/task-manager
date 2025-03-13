<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">My Tasks</h1>
      <Button @click="showAddTaskForm = true" variant="primary">
        Add Task
      </Button>
    </div>

    <!-- Loading state -->
    <div v-if="taskStore.loading" class="text-center py-8">
      <p class="text-gray-600">Loading tasks...</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="taskStore.error"
      class="bg-red-100 p-4 rounded text-red-700 mb-6"
    >
      {{ taskStore.error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="taskStore.tasks.length === 0" class="text-center py-8">
      <p class="text-gray-600">You don't have any tasks yet.</p>
      <Button
        @click="showAddTaskForm = true"
        variant="primary"
        className="mt-4"
      >
        Add Your First Task
      </Button>
    </div>

    <!-- Tasks list -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <TaskCard
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @delete="handleDeleteTask"
      />
    </div>

    <!-- Task Form Modal -->
    <TaskForm
      v-if="showAddTaskForm"
      :task="taskStore.currentTask"
      :isOpen="showAddTaskForm"
      @close="closeTaskForm"
      @save="saveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useTaskStore } from "~/stores/task";
import type { Task, TaskFormData } from "~/types";
import Button from "~/components/Button.vue";
import TaskCard from "~/components/TaskCard.vue";

const authStore = useAuthStore();
const taskStore = useTaskStore();
const router = useRouter();

const showAddTaskForm = ref(false);

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push("/auth/login");
    return;
  }

  await taskStore.fetchTasks();
  await checkPermissions();
});

async function checkPermissions() {
  try {
    if (authStore.user) {
      return;
    }

    const jwt = localStorage.getItem("strapi_jwt");
    if (!jwt) {
      return;
    }

    const config = useRuntimeConfig();
    const userResponse = await fetch(
      `${config.public.strapi.url}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!userResponse.ok) {
      return;
    }
  } catch (e) {
    // Error handling is silent
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

function editTask(task: Task): void {
  const taskCopy: Task = {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
  };
  taskStore.setCurrentTask(taskCopy);
  showAddTaskForm.value = true;
}

function closeTaskForm(): void {
  showAddTaskForm.value = false;
  taskStore.setCurrentTask(null);
}

async function saveTask(taskData: TaskFormData): Promise<void> {
  const apiTaskData: Partial<Task> = {
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    dueDate: taskData.dueDate,
  };

  if (taskStore.currentTask && taskStore.currentTask.id) {
    await taskStore.updateTask(taskStore.currentTask.id, apiTaskData);
  } else {
    await taskStore.createTask(apiTaskData);
  }

  showAddTaskForm.value = false;
}

async function handleDeleteTask(taskId: number): Promise<void> {
  try {
    const numericTaskId = Number(taskId);
    if (isNaN(numericTaskId)) {
      return;
    }

    const result = await taskStore.deleteTask(numericTaskId);

    if (!result) {
      alert(`Failed to delete task: ${taskStore.error || "Unknown error"}`);
    }
  } catch (error) {
    alert(
      "An error occurred while trying to delete the task. Please try again."
    );
  }
}
</script>
