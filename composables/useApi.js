import { hash as ohash } from "ohash";

export default async (url, options = {}) => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const hash = ohash([url, options]);
  const state = useState(hash, () => null);

  if (!state.value) {
    const { data, error } = await useFetch(url, {
      baseURL: config.public.apiUrl,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.public.apiToken}`,
      },
      query: {
        language: locale,
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
