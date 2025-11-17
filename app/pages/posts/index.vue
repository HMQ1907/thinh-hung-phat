<template>
  <div class="posts-page">
    <div class="container">
      <h1>All Posts</h1>

      <!-- Loading state -->
      <div v-if="pending" class="loading">
        <p>Loading posts...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>❌ Error loading posts: {{ error.message }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="!posts || posts.length === 0" class="empty">
        <p>No posts found</p>
      </div>

      <!-- Posts list -->
      <div v-else class="posts-list">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <!-- Refresh button -->
      <button @click="refreshPosts" class="refresh-btn" :disabled="pending">
        {{ pending ? "Loading..." : "Refresh Posts" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";
import PostCard from "~/components/post/PostCard.vue";

useHead({
  title: "All Posts - THP Blog",
  meta: [{ name: "description", content: "Browse all blog posts" }],
});

const {
  data: response,
  pending,
  error,
  refresh,
} = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 20 },
});

const posts = computed(() => {
  return response.value?.success ? response.value.data : [];
});

const refreshPosts = () => {
  refresh();
};
</script>

<style scoped>
.posts-page {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #111827;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.125rem;
}

.error {
  color: #dc2626;
}

.empty {
  color: #6b7280;
}

.posts-list {
  margin-bottom: 2rem;
}

.refresh-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
