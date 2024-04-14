<template>
  <NuxtLoadingIndicator color="var(--primary-color)" />
  <TheSidebar />
  <div class="page-wrapper">
    <NuxtPage />
    <TheFooter />
  </div>
  <SearchDialog />
  <DiscoverDialog />
</template>

<script setup>
const isSearchDialogShow = ref(false);
const isDiscoverDialogShow = ref(false);

provide("isSearchDialogShow", isSearchDialogShow);
provide("isDiscoverDialogShow", isDiscoverDialogShow);
</script>

<style lang="scss">
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
