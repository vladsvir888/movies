import { createFocusTrap } from "focus-trap";

export const useFocusTrap = (element, options) => {
  let trap = null;

  const activate = () => trap && trap.activate();
  const deactivate = () => trap && trap.deactivate();

  watch(
    element,
    (el) => {
      if (!el) {
        return;
      }

      trap = createFocusTrap(toValue(element), {
        escapeDeactivates: false,
        ...options,
      });
    },
    { flush: "post" }
  );

  return {
    activate,
    deactivate,
  };
};
