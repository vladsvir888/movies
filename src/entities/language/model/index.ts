import { cacheUtil, cacheKey } from "~/src/shared/lib/browser";

const NAMESPACE = "language-switcher";

export const useLanguageSwitcherStore = defineStore(NAMESPACE, () => {
  const { locales, setLocale } = useI18n();

  const transformedLocales = computed(() => {
    return locales.value.map(({ code }) => ({
      value: code,
      text: code.toUpperCase(),
    }));
  });

  const updateLocale = (event: Event & { target: HTMLSelectElement }): void => {
    setLocale(event.target.value);
    cacheUtil.set(cacheKey.appLangKey, event.target.value);
    window.location.reload(); // because of caching data in store
  };

  const checkLocale = (): void => {
    const value = cacheUtil.get(cacheKey.appLangKey);

    if (!value) {
      return;
    }

    setLocale(value);
  };

  onBeforeMount(checkLocale);

  return {
    transformedLocales,
    updateLocale,
    checkLocale,
  };
});
