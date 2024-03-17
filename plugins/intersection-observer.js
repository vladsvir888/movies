export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersection-observer", {
    mounted(element, binding) {
      if (typeof binding.value.callback !== "function") {
        return;
      }

      const observer = new IntersectionObserver(binding.value.callback, {
        ...binding.value.options,
      });
      observer.observe(element);
    },
  });
});
