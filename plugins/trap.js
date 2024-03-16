// todo: подумать о прокидывании массива дом нод или строк селекторов, так как, например, при открытии диалогового окна с поиском ловушка на сайдбаре не дает взаимодействовать с ним, приходится скрывать сайдбар при открытии поиска.
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
