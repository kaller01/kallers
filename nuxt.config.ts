// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-mongoose',
    'vuetify-nuxt-module',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: "lang/",
    locales: [
      { code: "sv", iso: "sv-SE", file: "sv.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
  },
})
