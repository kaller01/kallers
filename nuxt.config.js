// import colors from "vuetify/es5/util/colors";

import colors from "vuetify/lib/util/colors";
import { getPhotoCaption } from "./common/util";

const axios = require('axios');
const photoToSitemapImg = photo => {
  if (!photo) return {};
  return ({
    url: photo.paths.h1080,
    title: photo.title,
    caption: getPhotoCaption(photo),
    geoLocation: (photo.location ? photo.location.title : undefined)
  })
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - kallers",
    title: "Martin Kaller Landscape Photography",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Martin Kaller, swedish based landscape photographer sharing his photography journey.",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Martin Kaller, swedish based landscape photographer sharing his photography journey.",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Martin Kaller Landscape Photography",
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://photos.kallers.se/1080w/_MK24852.jpg",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  serverMiddleware: [{ path: "/api", handler: "~/api" }],

  env: {
    baseUrl: process.env.BASE_URL,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",

    "@nuxtjs/device",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    "nuxt-i18n",
    '@nuxtjs/sitemap'
  ],

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    seo: false, //https://i18n.nuxtjs.org/seo#improving-performance
    langDir: "lang/",
    lazy: true,
    locales: [
      { code: "sv", iso: "sv-SE", file: "sv.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL, // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.INTERNAL_BASE_URL,
    },
  },

  sitemap: {
    defaults: {
      priority: 1,
      changefreq: 'weekly'
    },
    i18n: false,
    exclude: [
      '/login',
      '/dashboard',
    ],
    routes: async () => {
      const baseUrl = process.env.INTERNAL_BASE_URL || ''
      const photosRequest = axios.get(baseUrl + '/api/photos')
      const locationRequest = axios.get(baseUrl + '/api/locations');
      const albumsRequest = axios.get(baseUrl + '/api/collections');
      const postsRequest = axios.get(baseUrl + '/api/posts')
      const [photosResp, locationResp, albumsResp, postsResp] = await Promise.all([photosRequest, locationRequest, albumsRequest, postsRequest])
      const photos = photosResp.data.map(p => ({
        url: '/photography/' + p.filename.replace(".jpg", ""),
        lastmod: p.date, priority: 0.5,
        changefreq: 'never',
        img: [photoToSitemapImg(p)]
      }))
      const locations = locationResp.data.map(l => ({
        url: '/locations/' + l.link,
        priority: 0.8,
        img: [photoToSitemapImg(l.cover)]
      }))
      const albums = albumsResp.data.map(a => (
        {
          url: '/albums/' + a.link,
          priority: 0.7,
          img: [photoToSitemapImg(a.cover)]
        }))
      const posts = postsResp.data.map(p => (
        {
          url: '/newsletter/' + p.link,
          lastmod: p.date, priority: 1.0,
          changefreq: 'never',
          img: [photoToSitemapImg(p.cover)]
        }))
      return [
        ...photos,
        ...locations,
        ...albums,
        ...posts
      ]
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          base: colors.purple.base,
          primary: colors.lightGreen.darken1,
          accent: colors.red.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.purple.base,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
