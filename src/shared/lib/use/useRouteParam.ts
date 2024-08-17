export const useRouteParam = (
  param: string
): ComputedRef<string | string[] | undefined> => {
  return computed(() => useRoute().params[param]);
};
