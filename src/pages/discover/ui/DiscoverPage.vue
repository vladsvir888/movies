<template>
  <div class="page page-discover container">
    <PageSeoData
      v-if="preparedTitle"
      :title="preparedTitle"
      :description="preparedTitle"
    />
    <Heading class="page-discover__title" variant="underline">
      {{ preparedTitle }}
    </Heading>
    <div class="page-discover__wrapper">
      <Filter v-model:filter="filter" v-model:rating-count="ratingCount" />
      <div class="page-discover__cards">
        <ul class="page-discover__variants">
          <template
            v-for="(variantValue, variantKey) in filter"
            :key="variantKey"
          >
            <li v-if="variantValue" class="page-discover__variant">
              <Button
                variant="primary"
                class="page-discover__variant-button"
                :pill="true"
                size="medium"
                @click="onClickVariant(variantKey)"
              >
                {{ getRemovedVariant(variantKey, variantValue) }}
                <Icon icon="close" />
              </Button>
            </li>
          </template>
        </ul>
        <Catalog
          v-if="totalResults.length"
          v-model:page="page"
          :data="totalResults"
          :total-pages="totalPages"
          :is-pending="isPendingAutoload"
          :is-back-button="false"
        />
        <BaseLoader v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import Catalog from "~/src/widgets/catalog";
import BaseLoader from "~/src/shared/ui/loaders";
import {
  Filter,
  FILTER_VALUES,
  type TFilter,
  type FilterKeys,
} from "~/src/features/media";
import { useCustomFetch } from "~/src/shared/api";
import { buildQuery } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { isEmptyObject } from "~/src/shared/lib/is";
import { scrollUp } from "~/src/shared/lib/dom";
import { MEDIA_TYPES, useMediaStore } from "~/src/entities/media";
import type {
  MediaTypes,
  Media,
  PageResult,
  IResponse,
  Genre,
} from "~/src/shared/config";

const mediaStore = useMediaStore();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

const filter = ref({
  [FILTER_VALUES.with_genres]: undefined,
  [FILTER_VALUES.sort_by]: undefined,
  [FILTER_VALUES["vote_average.gte"]]: undefined,
  [FILTER_VALUES["release_date.gte"]]: undefined,
  [FILTER_VALUES["release_date.lte"]]: undefined,
} as TFilter);

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref<Media[]>([]);
const isPendingAutoload = ref(false);
const ratingCount = ref(0);

const type = useRouteParam<MediaTypes>("type");

const preparedTitle = computed(() => {
  if (type.value === MEDIA_TYPES[0]) {
    return `${t("Discover")} ${t("Movies")}`;
  } else if (type.value === MEDIA_TYPES[1]) {
    return `${t("Discover")} ${t("TV Shows")}`;
  }

  return undefined;
});

const getRemovedVariant = (key: FilterKeys, value: string | number): string => {
  if (key === FILTER_VALUES.with_genres) {
    const genre = mediaStore[type.value].genres.find(
      (item) => item.id === Number(value),
    );
    return `${t(key)}: ${genre?.name}`;
  }

  return `${t(key)}: ${value}`;
};

const onClickVariant = (key: FilterKeys): void => {
  filter.value[key] = undefined;

  router.push({
    query: {
      ...route.query,
      [key]: undefined,
    },
  });

  if (key === "vote_average.gte") {
    ratingCount.value = 0;
  }
};

if (!isEmptyObject(route.query)) {
  filter.value = {
    ...filter.value,
    ...route.query,
  };
}

await useCustomFetch<{ genres: Genre[] }>(() => `/genre/${type.value}/list`, {
  onResponse({ response }: IResponse<{ genres: Genre[] }>) {
    const responseData = response._data;

    if (!responseData) {
      return;
    }

    const value = import.meta.client
      ? type.value
      : (route.params.type as MediaTypes); // [nuxt] Calling `useRoute` within middleware may lead to misleading results. Instead, use the (to, from) arguments passed to the middleware to access the new and old routes.

    mediaStore[value].genres = responseData.genres;
  },
});

const { state } = await useCustomFetch<PageResult<Media>>(
  () => `/discover/${type.value}?${buildQuery(filter.value)}`,
  {
    query: {
      page,
      include_adult: false,
      language: locale,
    },
    onRequest() {
      isPendingAutoload.value = true;
    },
    onResponse({ response }: IResponse<PageResult<Media>>) {
      const responseData = response._data;

      if (!responseData) {
        return;
      }

      isPendingAutoload.value = false;
      totalResults.value = [...totalResults.value, ...responseData.results];
      totalPages.value = responseData.total_pages;
    },
  },
);

if (state.value) {
  totalResults.value = state.value.results;
  totalPages.value = state.value.total_pages;
}

watch(
  () => route.query,
  () => {
    page.value = 1;
    totalPages.value = 0;
    totalResults.value = [];

    scrollUp();
  },
);
</script>

<style lang="scss">
.page-discover {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  &__wrapper {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 20px;

    @media (--desktop) {
      grid-template-columns: 1fr;
    }
  }

  &__variants {
    position: sticky;
    top: calc(var(--header-height) + 10px);
    z-index: 3;
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
