<template>
  <NuxtLoadingIndicator color="var(--palette-puerto-rico)" />
  <FirstScreenLoader v-if="isFirstScreenBlockVisible" />
  <Toast />
  <Header
    v-model:is-menu-visible="isMenuVisible"
    v-model:is-search-dialog-visible="isSearchDialogVisible"
  />
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
import { SearchDialog } from "~/src/features/media";
import { FirstScreenLoader } from "~/src/shared/ui/loaders";
import { useAuthStore } from "~/src/entities/user";
import { Toast } from "~/src/shared/ui/toast";

const authStore = useAuthStore();

const isSearchDialogVisible = ref(false);
const isMenuVisible = ref(false);
const isFirstScreenBlockVisible = ref(true);

onMounted(() => {
  isFirstScreenBlockVisible.value = false;
  authStore.getDataFromLSAndSetInStore();
});
</script>
