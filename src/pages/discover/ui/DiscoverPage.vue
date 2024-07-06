<template>
  <div class="page page-discover container">
    <PageSeoData :title="title" :description="title" />

    <Heading class="page-discover__title" variant="underline">
      {{ title }}
    </Heading>

    <div class="page-discover__wrapper">
      <Filter v-model:removed-variant="removedVariant" />
      <div class="page-discover__cards">
        <ul class="page-discover__variants">
          <template
            v-for="(variantValue, variantKey) in params"
            :key="variantKey"
          >
            <li v-if="variantValue" class="page-discover__variant">
              <Button
                variant="primary"
                class="page-discover__variant-button"
                :pill="true"
                size="medium"
                @click="removedVariant = variantKey"
              >
                {{ variantValue }}
                <Icon icon="close" />
              </Button>
            </li>
          </template>
        </ul>
        <Catalog
          v-if="totalResults.length"
          :data="totalResults"
          v-model:page="page"
          :total-pages="totalPages"
          :is-pending="isPendingAutoload"
          :is-back-button="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import Catalog from "~/src/widgets/catalog";
import Filter from "~/src/features/filter";
import { useCustomFetch } from "~/src/shared/api";
import { buildQuery } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { isEmptyObject } from "~/src/shared/lib/is";
import { FILTER_VALUES } from "~/src/shared/config";

const route = useRoute();
const { t, locale } = useI18n();

const params = ref({
  [FILTER_VALUES["with_genres"]]: "",
  [FILTER_VALUES["sort_by"]]: "",
  [FILTER_VALUES["vote_average.gte"]]: "",
  [FILTER_VALUES["release_date.gte"]]: "",
  [FILTER_VALUES["release_date.lte"]]: "",
});
const removedVariant = ref(null);

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

useCustomFetch(
  () => `/discover/${category.value}?${buildQuery(params.value)}`,
  {
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
  }
);

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
  padding: var(--header-margin) var(--container-padding) 20px;

  &__wrapper {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 20px;

    @media (width <= 1200px) {
      grid-template-columns: 1fr;
    }
  }

  &__variants {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--grid-gap);

    &:not(:empty) {
      margin-bottom: 20px;
    }
  }

  &__variant-button {
    column-gap: 6px;

    .icon > svg {
      margin-top: 1px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>
