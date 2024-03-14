// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
    }
  },
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASEURL
    },
  },
})