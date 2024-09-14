type ReturnTypeUseIntersectionObserver = {
  observer: IntersectionObserver | undefined;
  isElementIntersecting: Ref<boolean>;
};

export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {},
): ReturnTypeUseIntersectionObserver => {
  const isElementIntersecting = ref(false);

  let observer: IntersectionObserver | undefined;

  if (import.meta.client) {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          isElementIntersecting.value = true;
          callback();
        } else {
          isElementIntersecting.value = false;
        }
      });
    };

    observer = new IntersectionObserver(observerCallback, {
      ...options,
    });
  }

  return {
    observer,
    isElementIntersecting,
  };
};
