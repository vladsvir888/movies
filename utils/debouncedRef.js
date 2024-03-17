export default (source, wait = 300) => {
  const debouncedSource = ref(source.value);

  watch(
    source,
    debounce((value) => {
      debouncedSource.value = value;
    }, wait)
  );

  return debouncedSource;
};
