<template>
  <div class="page page-discover container">
    <PageSeoData :lang="$t('lang')" :title="title" :description="title" />
    <h1 class="page-discover__title">
      {{ title }}
    </h1>
    <div class="page-discover__wrapper">
      <TheFilter />
      <AutoloadCardBlock
        :data="totalResults"
        v-model:page="page"
        :total-pages="totalPages"
        :is-pending="isPendingAutoload"
        :is-title="false"
        :is-back-button="false"
      />
    </div>
  </div>
</template>

<script setup>
import qs from "qs";

const route = useRoute();
const { t, locale } = useI18n();

const params = ref({
  with_genres: "",
  sort_by: "",
});

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref([]);
const isPendingAutoload = ref(false);

const category = computed(() => {
  return route.params.category;
});

const title = computed(() => {
  return `${t("discover.title")} ${t(`discover.${category.value}`)}`;
});

useApi(() => `/discover/${category.value}?${qs.stringify(params.value)}`, {
  query: {
    page,
    include_adult: false,
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

watch(
  () => route.query,
  () => {
    page.value = 1;
    totalPages.value = 0;
    totalResults.value = [];
    params.value = route.query;
  }
);
</script>

<style lang="scss">
.page-discover {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 50px var(--container-padding) 20px;

  &__wrapper {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 20px;
  }
}
</style>
