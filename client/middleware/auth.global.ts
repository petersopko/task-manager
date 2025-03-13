export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  if (to.path.includes("error")) return;

  const authStore = useAuthStore();

  if (!authStore.user && !authStore.loading && !authStore.initialized) {
    await authStore.initialize();
  }

  if (authStore.isAuthenticated) {
    if (to.path === "/" || to.path.startsWith("/auth/")) {
      return navigateTo("/tasks");
    }
  } else {
    if (to.path === "/" || to.path.startsWith("/auth/")) {
      return;
    }
    return navigateTo("/auth/login");
  }
});
