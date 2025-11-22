<template>
  <div class="space-y-8">
    <div>
      <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Edit Project</p>
      <h1 class="text-3xl font-bold text-gray-900">Chỉnh sửa dự án</h1>
      <p class="text-sm text-gray-500">Cập nhật thông tin dự án tiêu biểu.</p>
    </div>

    <div v-if="pending" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Đang tải...</p>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
      Không tải được dự án: {{ error }}
    </div>

    <div v-else-if="project" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <form @submit.prevent="handleSubmit" class="grid gap-5 md:grid-cols-2">
        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Tên dự án *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Nhập tên dự án"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Slug *</label>
          <input
            v-model="form.slug"
            type="text"
            required
            @input="manualSlug = true"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="ten-du-an"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Vị trí</label>
          <input
            v-model="form.location"
            type="text"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Vị trí dự án"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Ngày hoàn thành</label>
          <input
            v-model="form.completed_at"
            type="date"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div class="md:col-span-2">
          <AdminImageUpload v-model="form.thumbnail" label="Hình ảnh thumbnail" />
        </div>

        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Mô tả</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Mô tả về dự án"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Trạng thái</label>
          <select
            v-model="form.status"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="md:col-span-2 flex justify-end gap-3">
          <UiButton
            to="/admin/projects"
            variant="outline"
            size="md"
          >
            Hủy
          </UiButton>
          <UiButton
            type="submit"
            :disabled="submitting"
            :loading="submitting"
            variant="primary"
            size="md"
          >
            Cập nhật dự án
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateSlug } from "~/utils/constants";
import type { Project, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Chỉnh sửa dự án - Admin",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const toast = useToast();

const { data: response, pending, error } = await useFetch<APIResponse<Project>>(`/api/admin/projects/${id}`);

const project = computed(() => response.value?.data);

const submitting = ref(false);
const manualSlug = ref(false);

const form = reactive({
  name: "",
  slug: "",
  description: "",
  location: "",
  thumbnail: "",
  status: "active" as "active" | "inactive",
  completed_at: "",
});

watch(
  () => form.name,
  (value) => {
    if (!manualSlug.value) {
      form.slug = generateSlug(value || "");
    }
  }
);

watch(
  () => project.value,
  (newProject) => {
    if (newProject) {
      form.name = newProject.name;
      form.slug = newProject.slug;
      form.description = newProject.description || "";
      form.location = newProject.location || "";
      form.thumbnail = newProject.thumbnail || "";
      form.status = newProject.status;
      form.completed_at = newProject.completed_at ? newProject.completed_at.split("T")[0] : "";
      manualSlug.value = true;
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (!form.name || !form.slug) return;
  submitting.value = true;

  try {
    await $fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      body: {
        ...form,
        description: form.description || null,
        location: form.location || null,
        thumbnail: form.thumbnail || null,
        completed_at: form.completed_at || null,
      },
    });
    toast.success("Đã cập nhật dự án thành công");
    router.push("/admin/projects");
  } catch (err: any) {
    console.error("Update project error:", err);
    toast.error("Có lỗi xảy ra: " + (err.message || "Không xác định"));
  } finally {
    submitting.value = false;
  }
};
</script>

