<template>
  <NuxtLoadingIndicator color="var(--palette-puerto-rico)" />
  <FirstScreenBlock v-if="isFirstScreenBlockVisible" />
  <TheHeader v-model:is-menu-visible="isMenuVisible" />
  <TheSidebar
    v-model:is-menu-visible="isMenuVisible"
    v-model:is-search-dialog-visible="isSearchDialogVisible"
  />
  <main class="page-wrapper">
    <NuxtPage />
  </main>
  <TheFooter />
  <SearchDialog v-model:is-search-dialog-visible="isSearchDialogVisible" />
</template>

<script setup>
const nuxtApp = useNuxtApp();

const isSearchDialogVisible = ref(false);
const isMenuVisible = ref(false);
const isFirstScreenBlockVisible = ref(true);

nuxtApp.hook("app:mounted", () => (isFirstScreenBlockVisible.value = false));
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
