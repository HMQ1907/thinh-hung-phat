<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm uppercase tracking-[0.4em] text-gray-400">New User</p>
      <h1 class="text-3xl font-bold text-gray-900">Thêm người dùng mới</h1>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="name" class="mb-2 block text-sm font-semibold text-gray-700">Tên đầy đủ *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label for="email" class="mb-2 block text-sm font-semibold text-gray-700">Email *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-semibold text-gray-700">Mật khẩu *</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tối thiểu 6 ký tự"
            />
          </div>

          <div>
            <label for="role" class="mb-2 block text-sm font-semibold text-gray-700">Vai trò *</label>
            <select
              id="role"
              v-model="form.role"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="user">User (Người dùng)</option>
              <option value="admin">Admin (Quản trị viên)</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {{ error }}
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <UiButton
            to="/admin/users"
            variant="outline"
            size="md"
          >
            Hủy
          </UiButton>
          <UiButton
            type="submit"
            :disabled="submitting"
            :loading="submitting"
            loading-text="Đang tạo..."
            variant="primary"
            size="md"
          >
            Tạo người dùng
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Thêm người dùng mới - Admin",
});

const router = useRouter();
const toast = useToast();

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const submitting = ref(false);
const error = ref("");

const handleSubmit = async () => {
  submitting.value = true;
  error.value = "";

  try {
    await $fetch("/api/admin/users", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      },
    });

    toast.success('Đã tạo người dùng thành công');
    router.push("/admin/users");
  } catch (err: any) {
    console.error("Create user error:", err);
    error.value = err.data?.message || err.message || "Có lỗi xảy ra khi tạo người dùng";
  } finally {
    submitting.value = false;
  }
};
</script>
