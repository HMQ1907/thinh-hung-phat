import { toast } from 'vue-sonner';

export const useToast = () => {
  return {
    success: (message: string, options?: { title?: string; duration?: number }) => {
      toast.success(message, {
        description: options?.title,
        duration: options?.duration || 5000,
      });
    },
    error: (message: string, options?: { title?: string; duration?: number }) => {
      toast.error(message, {
        description: options?.title,
        duration: options?.duration || 5000,
      });
    },
    warning: (message: string, options?: { title?: string; duration?: number }) => {
      toast.warning(message, {
        description: options?.title,
        duration: options?.duration || 5000,
      });
    },
    info: (message: string, options?: { title?: string; duration?: number }) => {
      toast.info(message, {
        description: options?.title,
        duration: options?.duration || 5000,
      });
    },
  };
};
