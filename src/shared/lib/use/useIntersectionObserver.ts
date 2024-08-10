type ReturnTypeUseIntersectionObserver = {
  observer: IntersectionObserver;
  isElementIntersecting: Ref<boolean>;
};

export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
): ReturnTypeUseIntersectionObserver => {
  const isElementIntersecting = ref(false);

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

  const observer = new IntersectionObserver(observerCallback, {
    ...options,
  });

  return {
    observer,
    isElementIntersecting,
  };
};
