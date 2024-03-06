export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      apiToken: process.env.NUXT_ACCESS_TOKEN_AUTH || "",
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

  css: ["~/assets/styles/styles.scss"],

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    [
      "@nuxtjs/i18n",
      {
        detectBrowserLanguage: false,
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "ru",
            file: "ru.json",
          },
        ],
        lazy: true,
        langDir: "lang",
        defaultLocale: "en",
      },
    ],
  ],

  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    preload: true,
  },
});
