import { debounce } from "../events";

export const useDebouncedRef = (
  source: Ref<unknown>,
  wait: number = 300,
): Ref<unknown> => {
  const debouncedSource = ref(source.value);

  watch(
    source,
    debounce((value) => {
      debouncedSource.value = value;
    }, wait),
  );

  return debouncedSource;
};
