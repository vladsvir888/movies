<template>
  <div class="page page-category">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t(`${$route.params.type}_${$route.params.category}.title`)"
      :description="$t(`${$route.params.type}_${$route.params.category}.title`)"
    />
    <CardBlock :data="totalResults" />
    <div class="container page-category__container">
      <TheLoader v-if="isPendingAutoload" />
      <div v-intersection-observer="{ callback, options }" ref="target"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();

const target = ref(null);
const page = ref(1);
const totalPages = ref(null);
const totalResults = ref([]);
const isPendingAutoload = ref(false);

useApi(`/${route.params.type}/${route.params.category}`, {
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

const options = {
  rootMargin: "-150px 0px 0px 0px",
};
const callback = (entries) => {
  if (
    entries[0].isIntersecting &&
    page.value < totalPages.value &&
    !isPendingAutoload.value
  ) {
    page.value += 1;
  }
};
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
