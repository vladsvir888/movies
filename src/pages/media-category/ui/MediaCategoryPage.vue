<template>
  <div class="page page-category container">
    <PageSeoData
      v-if="preparedTitle"
      :title="$t(preparedTitle)"
      :description="$t(preparedTitle)"
    />
    <Catalog
      v-if="totalResults.length"
      v-model:page="page"
      :data="totalResults"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
      :title="preparedTitle"
      class="page-category__card-block"
    />
  </div>
</template>

<script setup lang="ts">
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Catalog from "~/src/widgets/catalog";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import { MEDIA_LIST } from "~/src/entities/media";
import type {
  MediaTypes,
  MediaCategories,
  Media,
  PageResult,
} from "~/src/shared/config";

const { locale } = useI18n();
const type = useRouteParam<MediaTypes>("type");
const category = useRouteParam<MediaCategories>("category");

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref<Media[]>([]);
const isPendingAutoload = ref(false);

const listItem = MEDIA_LIST[type.value].find(
  (item) => item.category === category.value,
);

const preparedTitle = computed(() => {
  return listItem?.title;
});

if (!listItem) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

await useCustomFetch(`/${type.value}/${category.value}`, {
  query: {
    page,
    language: locale,
  },
  onRequest() {
    isPendingAutoload.value = true;
  },
  onResponse({ response }) {
    const responseData = response._data as PageResult<Media>;
    isPendingAutoload.value = false;
    totalResults.value = [...totalResults.value, ...responseData.results];
    totalPages.value = responseData.total_pages;
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
