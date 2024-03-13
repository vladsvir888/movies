<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('home_page.seo.title')"
      :description="$t('home_page.seo.meta.description')"
    />
    <HeroBlock v-if="heroBlockData" :data="heroBlockData" />

    <div class="container">
      <TheCarousel v-if="popularMoviesData" :data="popularMoviesData" />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { locale } = useI18n();

const heroBlockData = ref(null);
const popularMoviesData = ref(null);

const { data, error } = await useFetch(
  `${config.public.apiUrl}/movie/popular`,
  {
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
  }
);
</script>
