import { type NuxtI18nOptions } from "@nuxtjs/i18n";

export default <NuxtI18nOptions>{
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
  langDir: "./src/shared/i18n/lang",
  strategy: "prefix",
  defaultLocale: "en",
  detectBrowserLanguage: false,
  vueI18n: "./src/shared/i18n/i18n.config.ts",
};
