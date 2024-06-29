<template>
  <div class="page">
    <Heading class="visually-hidden">
      {{ title }}
    </Heading>

    <PageSeoData :title="title" :description="title" />

    <Hero :data="movieStore[type].heroBlock" />

    <MediaCarousel
      v-for="item in LISTS[type]"
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
import { useMovie } from "~/src/entities/movie";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import { LISTS } from "~/src/shared/config";

const movieStore = useMovie();
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
    movieStore[type.value].heroBlock = response._data.results[0];
  },
});
</script>
