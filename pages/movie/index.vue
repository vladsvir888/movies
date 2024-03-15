<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('movie_page.seo.title')"
      :description="$t('movie_page.seo.meta.description')"
    />

    <HeroBlock :data="store.movie.heroBlock" />

    <TheCarousel
      v-for="item in lists.movie"
      :key="item.category"
      :data="store[item.type][transformWord(item.category)]"
      :carousel-title="$t(`${item.type}_${item.category}.title`)"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const store = useStore();

useApi("/movie/popular", {
  onResponse({ response }) {
    store.movie.popular = response._data.results;
    store.movie.heroBlock = response._data.results[0];
  },
});

useApi("/movie/now_playing", {
  onResponse({ response }) {
    store.movie.nowPlaying = response._data.results;
  },
});

useApi("/movie/top_rated", {
  onResponse({ response }) {
    store.movie.topRated = response._data.results;
  },
});

useApi("/movie/upcoming", {
  onResponse({ response }) {
    store.movie.upcoming = response._data.results;
  },
});
</script>
