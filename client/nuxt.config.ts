// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Add modules
  modules: ["@nuxtjs/strapi", "@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // Configure Strapi
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },

  // Expose runtime config
  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || "http://localhost:1337",
      },
      baseUrl: process.env.PUBLIC_BASE_URL || "http://localhost:3000",
    },
  },
});
