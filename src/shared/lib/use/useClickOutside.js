export const useClickOutside = (element, callback) => {
  const onClickOutside = (event) => {
    // check that click was outside the el and his children
    const { target } = event;
    const el = toValue(element);

    if (!(el === target || el.contains(target))) {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", onClickOutside));
  onUnmounted(() => document.removeEventListener("click", onClickOutside));
};
