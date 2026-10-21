<template>
  <NuxtLayout>
    <LoadingSplash />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "vi" },
  meta: [{ name: "theme-color", content: "#05070a" }],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/logo-thp-removebg.png",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
    },
  ],
});
</script>
