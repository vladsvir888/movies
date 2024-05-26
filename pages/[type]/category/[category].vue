<template>
  <div class="page page-category container">
    <MoleculePageSeoData
      :lang="$t('lang')"
      :title="$t(title)"
      :description="$t(title)"
    />
    <OrganismAutoloadCardBlock
      :data="totalResults"
      v-model:page="page"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
      :title="title"
      class="page-category__card-block"
    />
  </div>
</template>

<script setup>
import { LISTS } from "~/constants";

const { locale } = useI18n();

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref([]);
const isPendingAutoload = ref(false);

const type = useRouteParam("type");
const category = useRouteParam("category");

const listItem = LISTS[type.value].find(
  (item) => item.category === category.value
);

const title = computed(() => {
  return listItem.title;
});

if (!listItem) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useCustomFetch(`/${type.value}/${category.value}`, {
  query: {
    page,
    language: locale,
  },
  onRequest() {
    isPendingAutoload.value = true;
  },
  onResponse({ response }) {
    isPendingAutoload.value = false;
    totalResults.value = [...totalResults.value, ...response._data.results];
    totalPages.value = response._data.total_pages;
  },
});
</script>

<style lang="scss">
.page-category {
  &__card-block {
    padding: var(--header-margin) 0 20px;
  }
}
</style>
