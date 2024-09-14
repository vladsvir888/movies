import { hash as ohash } from "ohash";
import type { UseFetchOptions } from "#app";

export const useCustomFetch = async <DataT>(
  url: string | (() => string),
  options: UseFetchOptions<DataT> = {},
) => {
  const {
    $i18n: { locale },
    $api,
  } = useNuxtApp();
  const hash = ohash([url, options]);
  const state = useState<DataT | null>(hash, () => null);

  if (state.value) {
    return {
      state,
    };
  }

  const { data, error, status, refresh, execute } = await useFetch(url, {
    query: {
      language: locale,
    },
    $fetch: $api,
    ...options,
  });

  state.value = data.value as DataT;

  return {
    state,
    error,
    status,
    refresh,
    execute,
  };
};
