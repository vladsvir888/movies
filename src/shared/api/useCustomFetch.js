import { hash as ohash } from "ohash";

export const useCustomFetch = async (url, options = {}) => {
  const {
    $i18n: { locale },
    $api,
  } = useNuxtApp();
  const hash = ohash([url, options]);
  const state = useState(hash, () => null);

  if (state.value) {
    return {
      state,
    };
  }

  const { data, error, status, refresh } = await useFetch(url, {
    query: {
      language: locale,
    },
    server: false, // todo: разобраться, почему происходит какая-то ошибка с themoviedb при получении данных на сервере
    $fetch: $api,
    ...options,
  });

  state.value = data.value;

  return {
    state,
    error,
    status,
    refresh,
  };
};
