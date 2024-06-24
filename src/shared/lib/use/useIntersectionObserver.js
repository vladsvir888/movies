export const useIntersectionObserver = (callback = () => {}, options = {}) => {
  const isElementIntersecting = ref(false);

  const observerCallback = (entries) => {
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
