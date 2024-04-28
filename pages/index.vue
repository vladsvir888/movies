<template>
  <div class="page">
    <TheHeading class="visually-hidden">
      {{ $t("Home • Movies") }}
    </TheHeading>

    <PageSeoData
      :lang="$t('lang')"
      :title="$t('Home • Movies')"
      :description="$t('Home • Movies')"
    />

    <HeroBlock :data="store.movie.heroBlock" />

    <TheCarousel
      v-for="item in computedLists"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const store = useStore();

const computedLists = computed(() => {
  return [lists.movie[0], lists.tv[0]];
});

useApi("/movie/popular", {
  onResponse({ response }) {
    store.movie.heroBlock = response._data.results[0];
  },
});
</script>
