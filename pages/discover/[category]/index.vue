<template>
  <div class="page page-discover container">
    <PageSeoData :lang="$t('lang')" :title="title" :description="title" />

    <TheHeading class="page-discover__title">
      {{ title }}
    </TheHeading>

    <div class="page-discover__wrapper">
      <TheFilter />

      <AutoloadCardBlock
        :data="totalResults"
        v-model:page="page"
        :total-pages="totalPages"
        :is-pending="isPendingAutoload"
        :is-back-button="false"
      />
    </div>
  </div>
</template>

<script setup>
import { FILTER_VALUES } from "~/constants";

const route = useRoute();
const { t, locale } = useI18n();

const params = ref({
  [FILTER_VALUES["with_genres"]]: "",
  [FILTER_VALUES["sort_by"]]: "",
  [FILTER_VALUES["vote_average.gte"]]: "",
  [FILTER_VALUES["release_date.gte"]]: "",
  [FILTER_VALUES["release_date.lte"]]: "",
});

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref([]);
const isPendingAutoload = ref(false);

const category = useRouteParam("category");

const title = computed(() => {
  if (category.value === "movie") {
    return `${t("Discover")} ${t("Movies")}`;
  } else if (category.value === "tv") {
    return `${t("Discover")} ${t("TV Shows")}`;
  }

  return "";
});

useApi(() => `/discover/${category.value}?${buildQuery(params.value)}`, {
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

onMounted(() => {
  const { query } = route;

  if (isEmptyObject(query)) {
    return;
  }

  params.value = route.query;
});
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

    @media (width <= 1200px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
