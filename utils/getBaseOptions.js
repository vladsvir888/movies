export default () => {
  const config = useRuntimeConfig();

  return {
    baseURL: config.public.apiUrl,
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${config.public.apiToken}`,
    },
  };
};
