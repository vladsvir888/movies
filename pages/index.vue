<template>
  <div class="page">
    <PageSeoData title="Movies" description="Movies" />
    <HeroBlock v-if="heroBlockData" :data="heroBlockData" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const heroBlockData = ref(null);

const { data: popularMovieData } = useFetch(
  `${config.public.apiUrl}/movie/popular`,
  {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.public.apiToken}`,
    },
    query: {
      language: "en",
    },
    server: false,
    onResponse({ response }) {
      heroBlockData.value = response._data.results[0];
    },
  }
);
</script>
