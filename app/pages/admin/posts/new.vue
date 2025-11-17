<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Tạo bài viết mới</h1>
    <PostForm @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Tạo bài viết mới - Admin",
});

const router = useRouter();

const handleSaved = () => {
  router.push("/admin/posts");
};
</script>

