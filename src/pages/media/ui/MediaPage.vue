<template>
  <div class="page">
    <Heading class="visually-hidden">
      {{ title }}
    </Heading>

    <PageSeoData :title="title" :description="title" />

    <HeroSection :data="mediaStore[type].heroBlock" />

    <Category
      v-for="item in MEDIA_LIST[type]"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
    />
  </div>
</template>

<script setup>
import HeroSection from "~/src/widgets/hero-section";
import Category from "~/src/widgets/category";
import { useMediaStore, MEDIA_LIST, MEDIA_TYPES } from "~/src/entities/media";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";

const mediaStore = useMediaStore();
const { t } = useI18n();

const type = useRouteParam("type");

const title = computed(() => {
  if (type.value === MEDIA_TYPES[0]) {
    return t("Movies");
  } else if (type.value === MEDIA_TYPES[1]) {
    return t("TV Shows");
  }

  return "";
});

if (!MEDIA_LIST[type.value]) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useCustomFetch(`/${type.value}/popular`, {
  onResponse({ response }) {
    mediaStore[type.value].heroBlock = response._data.results[0];
  },
});
</script>
