<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('home_page.seo.title')"
      :description="$t('home_page.seo.meta.description')"
    />

    <HeroBlock :data="store.movie.heroBlock" />

    <TheCarousel
      v-for="item in computedLists"
      :key="item.category"
      :type="item.type"
      :category="item.category"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const store = useStore();

const computedLists = computed(() => {
  return [lists.movie[0], lists.tv[0]];
});

useApi("/movie/popular", {
  onResponse({ response }) {
    store.movie.heroBlock = response._data.results[0];
  },
});
</script>
