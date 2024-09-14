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
import {
  Filter,
  FILTER,
  FILTER_VALUES,
  type TFilter,
  type FilterKeys,
} from "~/src/features/media";
import { useCustomFetch } from "~/src/shared/api";
import { buildQuery } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { isEmptyObject, isObjectsEqual } from "~/src/shared/lib/is";
import { scrollUp } from "~/src/shared/lib/dom";
import { MEDIA_TYPES, useMediaStore } from "~/src/entities/media";
import type {
  MediaTypes,
  Media,
  PageResult,
  IResponse,
} from "~/src/shared/config";

const mediaStore = useMediaStore();
const route = useRoute();
const { t, locale } = useI18n();
const params = ref({
  ...FILTER,
});
const removedVariant = ref<FilterKeys | undefined>(undefined);

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref<Media[]>([]);
const isPendingAutoload = ref(false);

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

useCustomFetch(
  () =>
    `/discover/${type.value}?${buildQuery(params.value as unknown as Record<string, string>)}`,
  {
    query: {
      page,
      include_adult: false,
      language: locale,
    },
    server: false,
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

watch(
  () => route.query,
  () => {
    page.value = 1;
    totalPages.value = 0;
    totalResults.value = [];
    params.value = route.query as unknown as TFilter;

    if (isObjectsEqual(params.value, FILTER)) {
      removedVariant.value = undefined;
    }

    scrollUp();
  },
);

onMounted(() => {
  const { query } = route;

  if (isEmptyObject(query)) {
    return;
  }

  params.value = query as unknown as TFilter;
});
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
