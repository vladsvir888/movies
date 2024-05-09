<template>
  <FirstScreenBlock v-if="isShowFirstScreenBlock" />
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

const nuxtApp = useNuxtApp();
const isShowFirstScreenBlock = ref(true);

nuxtApp.hook("app:mounted", () => (isShowFirstScreenBlock.value = false));
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
