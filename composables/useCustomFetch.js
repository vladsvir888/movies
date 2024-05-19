import { hash as ohash } from "ohash";

export default async (url, options = {}) => {
  const nuxtApp = useNuxtApp();
  const { $i18n } = nuxtApp;
  const hash = ohash([url, options]);
  const state = useState(hash, () => null);

  if (!state.value) {
    const { data, error } = await useFetch(url, {
      ...getBaseOptions(),
      query: {
        language: $i18n.locale,
      },
      server: false, // todo: разобраться, почему происходит какая-то ошибка с themoviedb при получении данных на сервере
      ...options,
    });

    if (error.value) {
      throw createError({
        statusCode: 404,
        fatal: true,
      });
    }

    state.value = data.value;

    return state.value;
  }

  return state.value;
};
