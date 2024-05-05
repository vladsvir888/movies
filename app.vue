<template>
  <NuxtLoadingIndicator color="var(--palette-puerto-rico)" />
  <TheSidebar />
  <div class="page-wrapper">
    <NuxtPage />
    <TheFooter />
  </div>
  <SearchDialog />
</template>

<script setup>
const isSearchDialogShow = ref(false);
provide("isSearchDialogShow", isSearchDialogShow);
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
