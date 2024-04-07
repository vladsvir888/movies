<template>
  <div class="page page-category">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t(`${$route.params.type}_${$route.params.category}.title`)"
      :description="$t(`${$route.params.type}_${$route.params.category}.title`)"
    />
    <AutoloadCardBlock
      :data="totalResults"
      v-model:page="page"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const route = useRoute();
const { locale } = useI18n();

const page = ref(1);
const totalPages = ref(0);
const totalResults = ref([]);
const isPendingAutoload = ref(false);

const type = computed(() => {
  return route.params.type;
});

const category = computed(() => {
  return route.params.category;
});

if (!lists[type.value].find((item) => item.category === category.value)) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useApi(`/${type.value}/${category.value}`, {
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
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
