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
import SearchDialog from "~/src/entities/search";
import { FirstScreenLoader } from "~/src/shared/ui/loaders";
import { useAuthStore } from "~/src/features/auth";

const authStore = useAuthStore();

const isSearchDialogVisible = ref(false);
const isMenuVisible = ref(false);
const isFirstScreenBlockVisible = ref(true);

onMounted(() => {
  isFirstScreenBlockVisible.value = false;
  authStore.getDataFromLSAndSetInStore();
});
</script>
