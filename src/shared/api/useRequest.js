import { getBaseOptions } from "../lib/get";

export const useRequest = async (url, options = {}) => {
  const nuxtApp = useNuxtApp();
  const { t } = nuxtApp;
  const data = ref(null);
  const error = ref(null);

  const makeRequest = async () => {
    try {
      data.value = null;
      error.value = null;

      data.value = await $fetch(unref(url), {
        ...getBaseOptions(),
        ...options,
      });
    } catch (err) {
      error.value =
        err?.data?.status_message ??
        t("An error occurred as a result of the request");
    }
  };

  if (isRef(url)) {
    watch(url, makeRequest);
  }

  await makeRequest();

  return {
    data,
    error,
  };
};
