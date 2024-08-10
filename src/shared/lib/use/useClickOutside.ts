import type { UnwrapRef } from "vue";

export const useClickOutside = <T extends Ref<HTMLElement>>(
  element: T,
  callback: () => void
): void => {
  const onClickOutside = (event: Event): void => {
    // check that click was outside the el and his children
    const { target } = event;
    const el = toValue(element);

    if (!(el === target || el.contains(target as UnwrapRef<T>))) {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", onClickOutside));
  onUnmounted(() => document.removeEventListener("click", onClickOutside));
};
