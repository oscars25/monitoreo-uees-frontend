import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([]);
let idCounter = 0;

export function useToast() {
  const show = (message: string, type: ToastType = 'info', duration = 3500) => {
    const id = idCounter++;
    toasts.value.push({ id, message, type });
    
    // Auto-eliminar después del tiempo especificado
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, duration);
  };

  return {
    toasts,
    success: (msg: string) => show(msg, 'success'),
    error: (msg: string) => show(msg, 'error'),
    warning: (msg: string) => show(msg, 'warning'),
    info: (msg: string) => show(msg, 'info'),
    remove: (id: number) => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }
  };
}