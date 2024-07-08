<template>
  <div class="page">
    <PageSeoData :title="$t('Home')" :description="$t('Home')" />

    <Heading class="visually-hidden">
      {{ $t("Home") }}
    </Heading>

    <HeroSection :data="mediaStore.movie.heroBlock" />

    <Category
      v-for="item in preparedLists"
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
import { useMediaStore } from "~/src/entities/media";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import { useCustomFetch } from "~/src/shared/api";
import { MEDIA_LIST } from "~/src/entities/media";

const mediaStore = useMediaStore();

const preparedLists = computed(() => {
  return [MEDIA_LIST.movie[0], MEDIA_LIST.tv[0]];
});

useCustomFetch("/movie/popular", {
  onResponse({ response }) {
    mediaStore.movie.heroBlock = response._data.results[0];
  },
});
</script>
