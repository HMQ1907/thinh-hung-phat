<template>
  <div class="min-h-screen bg-slate-950 px-4 py-12">
    <div class="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-1 shadow-[0_25px_80px_rgba(2,6,23,0.8)] backdrop-blur">
      <div class="rounded-[1.4rem] bg-white p-10">
        <div class="space-y-8 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white">
            THP
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Admin Portal</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Thịnh Hưng Phát</h1>
            <p class="mt-3 text-sm text-slate-500">Quản trị nội dung & người dùng</p>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="mt-10 space-y-6">
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-slate-600">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="admin@example.com"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-slate-600">Mật khẩu</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="loading" class="flex items-center space-x-2">
              <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"></path>
              </svg>
              <span>Đang đăng nhập</span>
            </span>
            <span v-else>Đăng nhập</span>
          </button>

          <div class="text-center text-sm text-slate-500">
            <NuxtLink to="/" class="font-medium text-primary transition hover:text-primary/80">
              Về trang chủ
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "Đăng nhập - Admin",
});

const { login } = useAuth();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const result = await login(form.email, form.password);

    if (result.success) {
      router.push("/admin");
    } else {
      error.value = result.error || "Đăng nhập thất bại";
    }
  } catch (err: any) {
    error.value = err.message || "Có lỗi xảy ra";
  } finally {
    loading.value = false;
  }
};
</script>


