<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('tv_page.seo.title')"
      :description="$t('tv_page.seo.meta.description')"
    />

    <HeroBlock :data="store.tv.heroBlock" />

    <TheCarousel
      v-for="item in lists.tv"
      :key="item.category"
      :data="store[item.type][transformWord(item.category)]"
      :carousel-title="$t(`${item.type}_${item.category}.title`)"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const store = useStore();

useApi("/tv/popular", {
  onResponse({ response }) {
    store.tv.popular = response._data.results;
    store.tv.heroBlock = response._data.results[0];
  },
});

useApi("/tv/top_rated", {
  onResponse({ response }) {
    store.tv.topRated = response._data.results;
  },
});
</script>
