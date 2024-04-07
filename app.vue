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
const route = useRoute();

const isSearchDialogShow = ref(false);
provide("isSearchDialogShow", isSearchDialogShow);

const isDiscoverDialogShow = ref(false);
provide("isDiscoverDialogShow", isDiscoverDialogShow);

const setScrollbarCustomPropertiesToBody = () => {
  document.body.style.setProperty(
    "--scrollbar-compensate",
    `${getScrollbarWidth()}px`
  );
};

onMounted(setScrollbarCustomPropertiesToBody);

watch(() => route.path, setScrollbarCustomPropertiesToBody);
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
