const onClickOutside = (el, binding, target) => {
  // check that click was outside the el and his children
  if (!(el === target || el.contains(target))) {
    binding.value();
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    mounted(el, binding) {
      document.addEventListener("click", (event) =>
        onClickOutside(el, binding, event.target)
      );
    },

    unmounted() {
      document.removeEventListener("click", onClickOutside);
    },
  });
});
