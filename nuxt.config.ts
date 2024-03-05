export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_API_KEY_AUTH || "",
      apiUrl: process.env.NUXT_API_URL || "",
    },
  },

  app: {
    pageTransition:
      process.env.NODE_ENV === "production"
        ? { name: "page", mode: "out-in" }
        : false,
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
          sizes: "any",
        },
        {
          rel: "icon",
          href: "/icon.svg",
          type: "image/svg+xml",
        },
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
      noscript: ["JavaScript is required"],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  css: [
    "~/assets/styles/styles.scss",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],

  modules: ["@nuxtjs/google-fonts", "nuxt-primevue"],

  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    preload: true,
  },
});
