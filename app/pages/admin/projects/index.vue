<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Projects</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý dự án</h1>
        <p class="text-sm text-gray-500">Thêm, chỉnh sửa hoặc xoá các dự án tiêu biểu hiển thị ngoài website.</p>
      </div>
      <button
        @click="showForm = !showForm"
        class="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
      >
        {{ showForm ? "Đóng form" : "Thêm dự án" }}
      </button>
    </div>

    <div v-if="showForm" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
            placeholder="TP.HCM"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Thumbnail URL</label>
          <input
            v-model="form.thumbnail"
            type="url"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="https://..."
          />
        </div>

        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Mô tả</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Mô tả ngắn gọn về dự án"
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

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Ngày hoàn thành</label>
          <input
            v-model="form.completed_at"
            type="date"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div class="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            @click="resetForm"
            class="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700"
          >
            Reset
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ submitting ? "Đang lưu..." : "Lưu dự án" }}
          </button>
        </div>
      </form>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Danh sách dự án</h2>
        <p class="text-sm text-gray-500">{{ projects.length }} dự án</p>
      </div>

      <div v-if="pending" class="mt-6 grid gap-4">
        <div v-for="s in 3" :key="s" class="h-20 animate-pulse rounded-xl bg-gray-100"></div>
      </div>

      <div v-else-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Không tải được dự án: {{ error }}
      </div>

      <div v-else-if="projects.length === 0" class="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
        Chưa có dự án nào.
      </div>

      <div v-else class="mt-6 space-y-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="project.thumbnail"
              :src="project.thumbnail"
              :alt="project.name"
              class="h-16 w-16 rounded-xl object-cover"
            />
            <div v-else class="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-600">
              {{ project.name.charAt(0) }}
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.3em] text-gray-400">{{ project.status }}</p>
              <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
              <p class="text-sm text-gray-500">{{ project.location || "Không rõ vị trí" }}</p>
            </div>
          </div>
          <button
            @click="handleDelete(project.id)"
            class="inline-flex items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateSlug } from "~/utils/constants";
import type { Project } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý dự án - Admin",
});

const showForm = ref(false);
const submitting = ref(false);

const form = reactive({
  name: "",
  slug: "",
  description: "",
  location: "",
  thumbnail: "",
  status: "active",
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

const manualSlug = ref(false);

const { data, pending, error, refresh } = useFetch<Project[]>("/api/admin/projects", {
  default: () => [],
});

const projects = computed(() => data.value || []);

const resetForm = () => {
  form.name = "";
  form.slug = "";
  form.description = "";
  form.location = "";
  form.thumbnail = "";
  form.status = "active";
  form.completed_at = "";
  manualSlug.value = false;
};

const handleSubmit = async () => {
  if (!form.name || !form.slug) return;
  submitting.value = true;

  try {
    await $fetch("/api/admin/projects", {
      method: "POST",
      body: {
        ...form,
        completed_at: form.completed_at || null,
      },
    });

    resetForm();
    showForm.value = false;
    await refresh();
  } catch (err: any) {
    console.error("Create project error:", err);
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async (id: string) => {
  if (!confirm("Bạn có chắc muốn xoá dự án này?")) return;

  try {
    await $fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });
    await refresh();
  } catch (err: any) {
    console.error("Delete project error:", err);
  }
};
</script>


