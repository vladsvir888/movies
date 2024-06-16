<template>
  <div class="page">
    <PageSeoData
      :title="$t('Home • Movies')"
      :description="$t('Home • Movies')"
    />

    <Heading class="visually-hidden">
      {{ $t("Home • Movies") }}
    </Heading>

    <Hero :data="store.movie.heroBlock" />

    <Carousel
      v-for="item in preparedLists"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
      v-slot="{ data, type }"
    >
      <MovieCard :data="data" :type="type" />
    </Carousel>
  </div>
</template>

<script setup>
import Hero from "~/src/widgets/hero";
import Carousel from "~/src/shared/ui/carousel";
import { MovieCard } from "~/src/entities/movie";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { LISTS } from "~/src/shared/config";

const store = useStore();

const preparedLists = computed(() => {
  return [LISTS.movie[0], LISTS.tv[0]];
});

useCustomFetch("/movie/popular", {
  onResponse({ response }) {
    store.movie.heroBlock = response._data.results[0];
  },
});
</script>
