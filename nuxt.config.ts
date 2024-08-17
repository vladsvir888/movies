import i18n from "./src/shared/i18n";

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  dir: {
    pages: "./src/app/routes",
  },

  plugins: [
    { src: "~/src/entities/user/model/auth-middleware.js", mode: "client" },
    { src: "~/src/shared/api/api.ts" },
  ],

  runtimeConfig: {
    public: {
      apiToken: process.env.NUXT_ACCESS_TOKEN_AUTH || "",
      apiUrl: process.env.NUXT_API_URL || "",
      apiImgUrl: process.env.NUXT_API_IMG_URL || "",
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

  css: ["~/src/shared/ui/styles/index.scss"],

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/eslint",
  ],

  routeRules: {
    "/": { redirect: "/en" },
  },

  i18n,

  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    preload: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @import '~/src/shared/ui/styles/helpers/breakpoints/index.scss';
              @import '~/src/shared/ui/styles/helpers/mixins/hover.scss';
              @import "~/src/shared/ui/styles/helpers/mixins/scrollbar.scss";
            `,
        },
      },
    },
  },

  postcss: {
    plugins: {
      "postcss-custom-media": {},
    },
  },
});
