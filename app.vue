<template>
  <NuxtLoadingIndicator color="var(--primary-color)" />
  <TheSidebar />
  <div class="page-wrapper">
    <NuxtPage />
    <TheFooter />
  </div>
  <SearchDialog />
</template>

<script setup>
const route = useRoute();

const isSearchDialogShow = ref(false);
provide("isSearchDialogShow", isSearchDialogShow);

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
