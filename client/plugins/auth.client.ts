// This plugin runs only on the client side and initializes the auth state
export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client-side
  if (import.meta.server) return;

  // Import the auth store
  const authStore = useAuthStore();

  // Initialize the auth state
  await authStore.initialize();

  // Add auth store to the context for easier access
  nuxtApp.provide("auth", authStore);
});
