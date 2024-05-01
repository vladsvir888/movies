<template>
  <div class="similar-block">
    <AutoloadCardBlock
      v-if="data.results.length"
      :data="totalResults"
      v-model:page="page"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
      :is-back-button="false"
    />
    <p v-else class="similar-block__text">{{ $t("No similar") }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const { locale } = useI18n();

const page = ref(props.data.page);
const totalPages = ref(props.data.total_pages);
const totalResults = ref(props.data.results);
const isPendingAutoload = ref(false);

const id = useRouteParam("id");

useApi(`/movie/${id.value}/similar`, {
  immediate: false,
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
