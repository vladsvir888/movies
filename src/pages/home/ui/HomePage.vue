<template>
  <div class="page">
    <PageSeoData :title="$t('Home')" :description="$t('Home')" />
    <Heading class="visually-hidden">
      {{ $t("Home") }}
    </Heading>
    <HeroSection
      v-if="mediaStore.movie.heroBlock"
      :data="mediaStore.movie.heroBlock"
    />
    <Category
      v-for="item in preparedLists"
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
import { useMediaStore, MEDIA_LIST } from "~/src/entities/media";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import type { Media, PageResult, IResponse } from "~/src/shared/config";

const mediaStore = useMediaStore();

const preparedLists = computed(() => {
  return [MEDIA_LIST.movie[0], MEDIA_LIST.tv[0]];
});

await useCustomFetch("/movie/popular", {
  onResponse({ response }: IResponse<PageResult<Media>>) {
    const responseData = response._data;

    if (!responseData) {
      return;
    }

    mediaStore.movie.heroBlock = responseData.results[0];
  },
});
</script>
