<template>
  <NuxtLoadingIndicator color="var(--palette-puerto-rico)" />
  <FirstScreenLoader v-if="isFirstScreenBlockVisible" />
  <Header v-model:is-menu-visible="isMenuVisible" />
  <Sidebar
    v-model:is-menu-visible="isMenuVisible"
    v-model:is-search-dialog-visible="isSearchDialogVisible"
  />
  <main class="page-wrapper">
    <slot />
  </main>
  <Footer />
  <SearchDialog v-model:is-search-dialog-visible="isSearchDialogVisible" />
</template>

<script setup>
import Header from "~/src/widgets/header";
import Footer from "~/src/widgets/footer";
import Sidebar from "~/src/widgets/sidebar";
import SearchDialog from "~/src/features/search";
import { FirstScreenLoader } from "~/src/shared/ui/loaders";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "~/src/shared/lib/browser";

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
