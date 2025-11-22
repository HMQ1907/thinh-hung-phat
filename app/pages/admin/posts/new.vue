<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm uppercase tracking-[0.4em] text-gray-400">New Post</p>
      <h1 class="text-3xl font-bold text-gray-900">Tạo bài viết mới</h1>
    </div>
    <AdminPostForm @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Tạo bài viết mới - Admin",
});

const router = useRouter();

const handleSaved = () => {
  router.push("/admin/posts");
};
</script>

