<template>
  <div class="page">
    <Heading class="visually-hidden">
      {{ title }}
    </Heading>

    <PageSeoData :title="title" :description="title" />

    <Hero :data="store[type].heroBlock" />

    <Carousel
      v-for="item in LISTS[type]"
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
import { useRouteParam } from "~/src/shared/lib/use";
import { LISTS } from "~/src/shared/config";

const store = useStore();
const { t } = useI18n();

const type = useRouteParam("type");

const title = computed(() => {
  if (type.value === "movie") {
    return t("Movie • Movies");
  } else if (type.value === "tv") {
    return t("TV Shows • Movies");
  }

  return "";
});

if (!LISTS[type.value]) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useCustomFetch(`/${type.value}/popular`, {
  onResponse({ response }) {
    store[type.value].heroBlock = response._data.results[0];
  },
});
</script>
