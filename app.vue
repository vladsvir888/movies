<template>
  <NuxtLoadingIndicator color="var(--palette-puerto-rico)" />
  <AtomFirstScreenBlock v-if="isFirstScreenBlockVisible" />
  <MoleculeHeader v-model:is-menu-visible="isMenuVisible" />
  <OrganismSidebar
    v-model:is-menu-visible="isMenuVisible"
    v-model:is-search-dialog-visible="isSearchDialogVisible"
  />
  <main class="page-wrapper">
    <NuxtPage />
  </main>
  <MoleculeFooter />
  <OrganismSearchDialog
    v-model:is-search-dialog-visible="isSearchDialogVisible"
  />
</template>

<script setup>
const authStore = useAuth();
const config = useRuntimeConfig();

const isSearchDialogVisible = ref(false);
const isMenuVisible = ref(false);
const isFirstScreenBlockVisible = ref(true);

const getAuthDataFromLocalStorageAndSetInStore = () => {
  const authData = getItemFromLocalStorage(config.public.appTokenDataKey);

  if (!authData) {
    return;
  }

  const currentDate = new Date();
  const expireTokenDate = new Date(authData.expiresAt);

  if (currentDate > expireTokenDate) {
    removeItemFromLocalStorage(config.public.appTokenDataKey);
  } else {
    authStore.token = authData.token;
    authStore.expiresAt = authData.expiresAt;
    authStore.sessionId = authData.sessionId;
  }
};

onMounted(() => {
  isFirstScreenBlockVisible.value = false;

  getAuthDataFromLocalStorageAndSetInStore();
});
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
