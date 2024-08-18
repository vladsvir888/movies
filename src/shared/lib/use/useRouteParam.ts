export const useRouteParam = <T>(param: string): ComputedRef<T> => {
  return computed(() => useRoute().params[param] as T);
};
