import { createFocusTrap } from "focus-trap";

let trap = null;

const createTrap = (element, fallbackElement) => {
  trap = createFocusTrap(element, {
    escapeDeactivates: false,
    fallbackFocus: fallbackElement,
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("trap", (element, binding) => {
    if (!trap && binding.value.value) {
      createTrap(element, binding.value.fallbackElement);
      trap.activate();
    } else if (trap && !binding.value.value) {
      trap.deactivate();
      trap = null;
    }
  });
});
