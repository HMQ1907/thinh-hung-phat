<template>
  <div>
    <PageHero
      eyebrow="Sản phẩm"
      code="// 02"
      image="/thandep.jpg"
      subtitle="Than đá, than bùn và nhiên liệu chất lượng cao cho lò hơi công nghiệp và sản xuất."
      :crumbs="[{ label: 'Sản phẩm' }]"
    >
      Danh mục <span class="text-grad">than đá</span> chất lượng cao
      <template #extra>
        <div v-if="!pending && products.length" class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-400">
          <span class="text-neon-300">{{ String(products.length).padStart(2, "0") }}</span> sản phẩm đang cung cấp
        </div>
      </template>
    </PageHero>

    <section class="py-20 md:py-28">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div v-if="pending" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="h-[420px] animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]" />
        </div>
        <div v-else-if="error" class="rounded-3xl border border-red-400/30 bg-red-400/10 p-6 text-center text-red-300">
          Có lỗi xảy ra: {{ error.message }}
        </div>
        <div v-else-if="products.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(product, index) in products" :key="product.id" v-reveal="(index % 3) * 90">
            <ProductCard :product="product" :index="index" />
          </div>
        </div>
        <div v-else class="rounded-3xl border border-dashed border-white/10 py-20 text-center text-slate-500">
          Chưa có sản phẩm nào
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product, APIResponse } from "~/types";

useHead({
  title: "Sản phẩm - Thành Hưng Phát",
  meta: [{ name: "description", content: "Danh sách sản phẩm than đá chất lượng cao của Thành Hưng Phát" }],
});

const { data: response, pending, error } = await useFetch<APIResponse<Product[]>>("/api/products", {
  query: { status: "active" },
  default: () => ({ data: [], status: 200, success: true }),
});

const products = computed(() => response.value?.data || []);
</script>
