<template>
  <div class="upload-test-page">
    <div class="container">
      <h1>Test Upload Image to Supabase</h1>

      <!-- Upload Form -->
      <div class="upload-section">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileSelect"
          accept="image/*"
          class="file-input"
        />
        <button
          @click="handleUpload"
          :disabled="!selectedFile || uploading"
          class="upload-btn"
        >
          {{ uploading ? "Uploading..." : "Upload Image" }}
        </button>
      </div>

      <!-- Uploaded Image -->
      <div v-if="imageUrl" class="result-section">
        <h2>Uploaded Image:</h2>
        <img :src="imageUrl" alt="Uploaded" class="uploaded-image" />
        <div class="url-section">
          <p><strong>URL:</strong></p>
          <code class="url-code">{{ imageUrl }}</code>
          <button @click="copyUrl" class="copy-btn">Copy URL</button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="error-section">
        <p class="error-text">❌ Error: {{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Upload Test - THP",
  meta: [{ name: "description", content: "Test image upload to Supabase" }],
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const imageUrl = ref<string>("");
const uploading = ref(false);
const error = ref<string>("");

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedFile.value = file;
    error.value = "";
  }
};

const handleUpload = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  error.value = "";

  try {
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    const response = await $fetch<{
      status: number;
      success: boolean;
      data: { url: string; path: string };
    }>("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    if (response.success) {
      imageUrl.value = response.data.url;
      console.log("Upload successful:", response.data);
    }
  } catch (err: any) {
    error.value = err.message || "Failed to upload image";
    console.error("Upload error:", err);
  } finally {
    uploading.value = false;
  }
};

const copyUrl = async () => {
  if (imageUrl.value) {
    await navigator.clipboard.writeText(imageUrl.value);
    alert("URL copied to clipboard!");
  }
};
</script>

<style scoped>
.upload-test-page {
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
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.upload-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.file-input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px dashed #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.file-input:hover {
  border-color: #3b82f6;
}

.upload-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.result-section h2 {
  color: #111827;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
}

.url-section {
  margin-top: 1rem;
}

.url-code {
  display: block;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 4px;
  word-break: break-all;
  font-size: 0.875rem;
  margin: 0.5rem 0;
}

.copy-btn {
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.copy-btn:hover {
  background-color: #059669;
}

.error-section {
  background: #fef2f2;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
}

.error-text {
  color: #dc2626;
  margin: 0;
}
</style>

