export const useRouteParam = (
  param: string,
): ComputedRef<string | string[]> => {
  return computed(() => useRoute().params[param]);
};
