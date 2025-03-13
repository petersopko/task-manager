<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
    <p class="text-xl mb-8 text-gray-600">
      A simple application to manage your tasks efficiently
    </p>

    <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <p class="mb-6">
        Task Manager helps you organize your work and personal tasks in one
        place. Create, track, and complete tasks with ease.
      </p>

      <div class="flex flex-col items-center">
        <ClientOnly>
          <div v-if="authStore.isAuthenticated" class="w-full">
            <Button
              @click="router.push('/tasks')"
              variant="primary"
              size="lg"
              fullWidth
            >
              Go to My Tasks
            </Button>
          </div>
          <div v-else class="text-gray-600 italic">
            Please login or register to start managing your tasks
          </div>
        </ClientOnly>
      </div>
    </div>

    <div class="mt-12 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-2">Task Organization</h3>
          <p>Create and organize tasks with different statuses and due dates</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-2">Progress Tracking</h3>
          <p>Track your progress as you complete tasks and projects</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-2">Secure Access</h3>
          <p>Your tasks are securely stored and accessible only to you</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use the auth store
const authStore = useAuthStore();
const router = useRouter();
</script>
