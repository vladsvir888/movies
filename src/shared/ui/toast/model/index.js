const NAMESPACE = "toast";

export const useToastStore = defineStore(NAMESPACE, () => {
  const toasts = ref([]);

  const removeToast = (toast) => {
    toasts.value = toasts.value.filter((t) => t.id !== toast.id);
  };

  const addToast = (toast) => {
    toasts.value.push(toast);

    if (!toast.duration) {
      return;
    }

    setTimeout(() => removeToast(toast), toast.duration);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
}
