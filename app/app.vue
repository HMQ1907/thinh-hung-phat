<template>
  <NuxtLayout>
    <LoadingSplash />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/logo-thp-removebg.png",
    },
  ],
});
</script>
