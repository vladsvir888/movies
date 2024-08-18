<template>
  <div class="page page-detail">
    <PageSeoData
      :title="`${(heroDetail?.title || heroDetail?.name) ?? ''}`"
      :description="`${heroDetail?.overview ?? ''}`"
    />
    <HeroSectionDetail v-if="heroDetail" :data="heroDetail" />

    <div class="page-detail__tabs container">
      <InfoTabs v-model:hero-detail="heroDetail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSectionDetail from "./hero-section";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import InfoTabs from "~/src/widgets/info-tabs";
import type { Media } from "~/src/shared/config";

const heroDetail = ref<Media | null>(null);
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding: 50px var(--container-padding);
  }
}
</style>
