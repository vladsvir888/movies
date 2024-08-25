import { debounce } from "../events";

export const useDebouncedRef = <T>(
  source: Ref<T>,
  wait: number = 300,
): Ref<T> => {
  const debouncedSource = ref(source.value) as Ref<T>; // https://github.com/vuejs/core/issues/1324#issuecomment-747479802

  watch(
    source,
    debounce((value) => {
      debouncedSource.value = value as T;
    }, wait),
  );

  return debouncedSource;
};
