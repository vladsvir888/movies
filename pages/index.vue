<template>
  <div class="page">
    <AtomHeading class="visually-hidden">
      {{ $t("Home • Movies") }}
    </AtomHeading>

    <MoleculePageSeoData
      :lang="$t('lang')"
      :title="$t('Home • Movies')"
      :description="$t('Home • Movies')"
    />

    <MoleculeHeroBlock :data="store.movie.heroBlock" />

    <OrganismCarousel
      v-for="item in preparedLists"
      :key="item.category"
      :type="item.type"
      :category="item.category"
      :title="item.title"
    />
  </div>
</template>

<script setup>
import { LISTS } from "~/constants";

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
