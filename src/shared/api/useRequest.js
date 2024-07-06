export const useRequest = async (url, options = {}) => {
  const { t, $api } = useNuxtApp();
  const data = ref(null);
  const error = ref(null);

  const makeRequest = async () => {
    try {
      data.value = null;
      error.value = null;

      data.value = await $api(unref(url), {
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
