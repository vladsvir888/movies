import { createFocusTrap } from "focus-trap";

let trap = null;

const createTrap = (element) => {
  trap = createFocusTrap(element, {
    escapeDeactivates: false,
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("trap", (element, binding) => {
    if (!trap && binding.value) {
      createTrap(element);
      trap.activate();
    } else if (trap && !binding.value) {
      trap.deactivate();
      trap = null;
    }
  });
});
