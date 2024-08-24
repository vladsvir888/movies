<template>
  <div class="similar">
    <Catalog
      v-if="data.results.length"
      v-model:page="page"
      :data="totalResults"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
      :is-back-button="false"
    />
    <p v-else class="similar__text">{{ $t("No similar") }}</p>
  </div>
</template>

<script setup lang="ts">
import Catalog from "~/src/widgets/catalog";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import type { Media, PageResult } from "~/src/shared/config";

const props = defineProps<{
  data: PageResult<Media>;
}>();

const { locale } = useI18n();

const page = ref(props.data.page);
const totalPages = ref(props.data.total_pages);
const totalResults = ref(props.data.results);
const isPendingAutoload = ref(false);

const id = useRouteParam<string>("id");

useCustomFetch(`/movie/${id.value}/similar`, {
  immediate: false,
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
