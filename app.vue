<template>
  <Header />
  <div class="page-layout">
    <NuxtPage />
  </div>
  <Footer />
</template>

<script setup></script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all var(--transition300ms);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px);
}
</style>
