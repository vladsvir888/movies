import { appLangKey } from "../config";

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
    useCookie(appLangKey).value = event.target.value;
    window.location.reload(); // because of caching data in store
  };

  const checkLocale = (): void => {
    const cookie = useCookie(appLangKey);

    if (!cookie.value) {
      return;
    }

    setLocale(cookie.value);
  };

  checkLocale();

  return {
    transformedLocales,
    updateLocale,
    checkLocale,
  };
});
