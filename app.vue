<template>
  <NuxtLoadingIndicator color="var(--primary-color)" />
  <MenuButton />
  <TheSidebar />
  <div class="page-wrapper">
    <NuxtPage />
    <TheFooter />
  </div>
</template>

<script setup>
const isMenuExpanded = ref(false);
provide("isMenuExpanded", isMenuExpanded);
</script>

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

.page-wrapper {
  min-height: inherit;
  display: flex;
  flex-direction: column;
  padding-left: var(--sidebar-width);

  @media (width <= 600px) {
    padding-left: 0;
  }
}
</style>
