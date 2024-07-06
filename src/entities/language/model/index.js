import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from "~/src/shared/lib/browser";

const NAMESPACE = "language-switcher";

export const useLanguageSwitcherStore = defineStore(NAMESPACE, () => {
  const config = useRuntimeConfig();
  const { locales, setLocale } = useI18n();

  const transformedLocales = computed(() => {
    return locales.value.map(({ code }) => ({
      value: code,
      text: code.toUpperCase(),
    }));
  });

  const updateLocale = (event) => {
    setLocale(event.target.value);
    setItemInLocalStorage(config.public.appLangKey, event.target.value);
    window.location.reload(); // because of caching data in store
  };

  const checkLocale = () => {
    const value = getItemFromLocalStorage(config.public.appLangKey);

    if (!value) {
      return;
    }

    setLocale(value);
  };

  return {
    transformedLocales,
    updateLocale,
    checkLocale,
  };
});
