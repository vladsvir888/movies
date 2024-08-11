type ToastVariants = "danger" | "success";

type Toast = {
  id: number;
  variant: ToastVariants;
  content: string;
  duration: number;
};

type ToastId = Toast["id"];

const NAMESPACE = "toast";

export const useToastStore = defineStore(NAMESPACE, () => {
  const toasts = ref<Toast[]>([]);

  const removeToast = (id: ToastId): void => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const addToast = (toast: Toast): void => {
    toasts.value.push(toast);

    if (!toast.duration) {
      return;
    }

    setTimeout(() => removeToast(toast.id), toast.duration);
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
