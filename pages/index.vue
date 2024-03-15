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
      :data="store[item.type][transformWord(item.category)]"
      :carousel-title="$t(`${item.type}_${item.category}.title`)"
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
    store.movie.popular = response._data.results;
    store.movie.heroBlock = response._data.results[0];
  },
});

useApi("/tv/popular", {
  onResponse({ response }) {
    store.tv.popular = response._data.results;
  },
});
</script>
