<template>
  <div class="page">
    <PageSeoData :title="$t('Home')" :description="$t('Home')" />

    <Heading class="visually-hidden">
      {{ $t("Home") }}
    </Heading>

    <Hero :data="movieStore.movie.heroBlock" />

    <MediaCarousel
      v-for="item in preparedLists"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
    />
  </div>
</template>

<script setup>
import Hero from "~/src/widgets/hero";
import MediaCarousel from "~/src/widgets/media-carousel";
import { useMovieStore } from "~/src/entities/movie";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { LISTS } from "~/src/shared/config";

const movieStore = useMovieStore();

const preparedLists = computed(() => {
  return [LISTS.movie[0], LISTS.tv[0]];
});

useCustomFetch("/movie/popular", {
  onResponse({ response }) {
    movieStore.movie.heroBlock = response._data.results[0];
  },
});
</script>
