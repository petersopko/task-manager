<template>
  <div>
    <header class="bg-white shadow sticky top-0 z-10">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
      >
        <NuxtLink to="/" class="text-xl font-bold text-gray-900">
          Task Manager
        </NuxtLink>
        <div class="flex space-x-6">
          <ClientOnly>
            <div v-if="authStore.loading" class="text-sm text-gray-500">
              Loading...
            </div>
            <template v-else-if="!authStore.isAuthenticated">
              <Button
                @click="navigateTo('/auth/login')"
                variant="text"
                size="sm"
              >
                Login
              </Button>
              <Button
                @click="navigateTo('/auth/register')"
                variant="text"
                size="sm"
              >
                Register
              </Button>
            </template>
            <div v-else class="flex items-center">
              <span class="text-sm text-gray-600 mr-4">{{
                authStore.userEmail
              }}</span>
              <Button @click="handleLogout" variant="text" size="sm">
                Logout
              </Button>
            </div>
          </ClientOnly>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Use the auth store
const authStore = useAuthStore();
import Button from "~/components/Button.vue";
const router = useRouter();

// Navigation function
function navigateTo(path) {
  router.push(path);
}

// Handle logout
async function handleLogout() {
  try {
    const success = await authStore.logout();
    if (success) {
      // Force page reload to clear all state
      window.location.href = "/";
    } else {
      alert("Failed to logout. Please try again.");
    }
  } catch (e) {
    console.error("Layout: Logout error:", e);
    alert("Failed to logout. Please try again.");
  }
}
</script>
