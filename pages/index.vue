<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('home_page.seo.title')"
      :description="$t('home_page.seo.meta.description')"
    />
    <HeroBlock :data="store.movie.heroBlock" />

    <TheCarousel
      :data="store.movie.popular"
      :carousel-title="$t('popular_movies.title')"
    />

    <TheCarousel
      :data="store.tv.popular"
      :carousel-title="$t('popular_tv.title')"
    />
  </div>
</template>

<script setup>
const store = useStore();

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
