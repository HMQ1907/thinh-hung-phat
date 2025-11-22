export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'default';
}

export const useConfirm = () => {
  const isOpen = ref(false);
  const options = ref<ConfirmOptions>({
    title: 'Xác nhận',
    message: 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
    variant: 'default',
  });

  let resolvePromise: ((value: boolean) => void) | null = null;

  const confirm = (opts?: ConfirmOptions): Promise<boolean> => {
    options.value = {
      ...options.value,
      ...opts,
    };
    isOpen.value = true;

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  };

  const handleConfirm = () => {
    isOpen.value = false;
    resolvePromise?.(true);
    resolvePromise = null;
  };

  const handleCancel = () => {
    isOpen.value = false;
    resolvePromise?.(false);
    resolvePromise = null;
  };

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  };
};
