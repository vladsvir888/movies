<template>
  <div class="page">
    <Heading v-if="preparedTitle" class="visually-hidden">
      {{ preparedTitle }}
    </Heading>
    <PageSeoData
      v-if="preparedTitle"
      :title="preparedTitle"
      :description="preparedTitle"
    />
    <HeroSection
      v-if="mediaStore[type].heroBlock"
      :data="mediaStore[type].heroBlock"
    />
    <Category
      v-for="item in MEDIA_LIST[type]"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
    />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "~/src/widgets/hero-section";
import Category from "~/src/widgets/category";
import { useMediaStore, MEDIA_LIST, MEDIA_TYPES } from "~/src/entities/media";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import type { MediaTypes, Media, PageResult } from "~/src/shared/config";

const mediaStore = useMediaStore();
const { t } = useI18n();
const type = useRouteParam<MediaTypes>("type");

const preparedTitle = computed(() => {
  if (type.value === MEDIA_TYPES[0]) {
    return t("Movies");
  } else if (type.value === MEDIA_TYPES[1]) {
    return t("TV Shows");
  }

  return undefined;
});

if (!MEDIA_LIST[type.value]) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

const { state } = await useCustomFetch<PageResult<Media>>(
  `/${type.value}/popular`,
);

if (state.value) {
  mediaStore[type.value].heroBlock = state.value.results[0];
}
</script>
