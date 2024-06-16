import { russianPlurals } from "../lib/format";

export default defineI18nConfig(() => ({
  legacy: false,
  pluralRules: {
    ru: russianPlurals,
  },
}));
