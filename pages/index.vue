<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('home_page.seo.title')"
      :description="$t('home_page.seo.meta.description')"
    />
    <HeroBlock v-if="heroBlockData" :data="heroBlockData" />

    <TheCarousel
      v-if="popularMoviesData"
      :data="popularMoviesData"
      :carousel-title="$t('popular_movies.title')"
    />

    <TheCarousel
      v-if="popularShowsData"
      :data="popularShowsData"
      :carousel-title="$t('popular_shows.title')"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { locale } = useI18n();

const heroBlockData = ref(null);
const popularMoviesData = ref(null);
const popularShowsData = ref(null);

useFetch(`${config.public.apiUrl}/movie/popular`, {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.public.apiToken}`,
  },
  query: {
    language: locale,
  },
  server: false,
  onResponse({ response }) {
    heroBlockData.value = response._data.results[0];
    popularMoviesData.value = response._data.results;
  },
});

useFetch(`${config.public.apiUrl}/tv/popular`, {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.public.apiToken}`,
  },
  query: {
    language: locale,
  },
  server: false,
  onResponse({ response }) {
    popularShowsData.value = response._data.results;
  },
});
</script>
