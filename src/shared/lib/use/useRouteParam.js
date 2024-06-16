export const useRouteParam = (param) => {
  return computed(() => useRoute().params[param]);
};
