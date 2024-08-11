export const debounce = <T extends (...args: unknown[]) => ReturnType<T>>(
  callback: T,
  timeout: number = 300,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
