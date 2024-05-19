export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      apiToken: process.env.NUXT_ACCESS_TOKEN_AUTH || "",
      apiUrl: process.env.NUXT_API_URL || "",
      apiImgUrl: process.env.NUXT_API_IMG_URL || "",
      appLangKey: process.env.NUXT_APP_LANG_KEY || "",
      appTokenDataKey: process.env.NUXT_APP_TOKEN_DATA || "",
    },
  },

  app: {
    pageTransition: false,
    head: {
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
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  css: ["~/assets/styles/styles.scss"],

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],

  routeRules: {
    "/": { redirect: "/en" },
  },

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "ru",
        file: "ru.js",
      },
    ],
    langDir: "lang",
    strategy: "prefix",
    defaultLocale: "en",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },

  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    preload: true,
  },
});
