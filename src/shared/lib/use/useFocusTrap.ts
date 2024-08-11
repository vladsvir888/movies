import { createFocusTrap, type Options, type FocusTrap } from "focus-trap";

type ReturnTypeUseFocusTrap = {
  activate: () => FocusTrap | null;
  deactivate: () => FocusTrap | null;
};

export const useFocusTrap = <T extends Ref<HTMLElement | null>>(
  element: T,
  options: Options = {},
): ReturnTypeUseFocusTrap => {
  let trap: FocusTrap | null = null;

  const activate = () => trap && trap.activate();
  const deactivate = () => trap && trap.deactivate();

  watch(
    element,
    (el) => {
      if (!el) {
        return;
      }

      trap = createFocusTrap(toValue(el), {
        escapeDeactivates: false,
        ...options,
      });
    },
    { flush: "post" },
  );

  return {
    activate,
    deactivate,
  };
};
