<template>
  <div class="space-y-2">
    <label class="block text-sm font-semibold text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div v-if="previewUrl" class="relative">
      <img
        :src="previewUrl"
        :alt="label"
        class="h-48 w-full rounded-xl object-cover border border-gray-200"
      />
      <div class="absolute top-2 right-2 flex gap-2">
        <button
          type="button"
          @click="fileInput?.click()"
          class="rounded-full bg-primary p-2 text-white shadow-lg hover:bg-primary/90 transition"
          title="Thay đổi hình ảnh"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
        <button
          type="button"
          @click="removeImage"
          class="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600 transition"
          title="Xóa hình ảnh"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <div
      v-else
      class="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors"
      :class="{ 'border-primary bg-primary/5': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
      <div class="space-y-2">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div class="text-sm text-gray-600">
          <button
            type="button"
            @click="fileInput?.click()"
            class="font-medium text-primary hover:text-primary/80"
          >
            Click để upload
          </button>
          <span> hoặc kéo thả hình vào đây</span>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
      </div>
    </div>

    <div v-if="uploading" class="flex items-center space-x-2 text-sm text-gray-600">
      <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Đang upload...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  label?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Hình ảnh',
  required: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const fileInput = ref<HTMLInputElement>();
const previewUrl = ref<string | null>(props.modelValue || null);
const uploading = ref(false);
const isDragging = ref(false);

watch(() => props.modelValue, (newValue) => {
  previewUrl.value = newValue || null;
});

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    await uploadFile(file);
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files[0];
  if (file && file.type.startsWith('image/')) {
    await uploadFile(file);
  }
};

const uploadFile = async (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    const toast = useToast();
    toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB');
    return;
  }

  uploading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await $fetch<{ success: boolean; data: { url: string; path: string } }>('/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (response.success && response.data?.url) {
      previewUrl.value = response.data.url;
      emit('update:modelValue', response.data.url);
      // Reset file input để có thể chọn lại cùng file nếu cần
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    }
  } catch (error: any) {
    const toast = useToast();
    toast.error('Upload thất bại: ' + (error.message || 'Không xác định'));
  } finally {
    uploading.value = false;
  }
};

const removeImage = () => {
  previewUrl.value = null;
  emit('update:modelValue', '');
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

