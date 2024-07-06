<template>
  <div class="page page-detail">
    <PageSeoData
      :title="`${(heroDetail.title || heroDetail.name) ?? ''}`"
      :description="`${heroDetail.text ?? ''}`"
    />
    <HeroSectionDetail :data="heroDetail" />

    <div class="page-detail__tabs container">
      <InfoTabs v-model:hero-detail="heroDetail" />
    </div>
  </div>
</template>

<script setup>
import HeroSectionDetail from "./hero-section";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import InfoTabs from "~/src/widgets/info-tabs";

const heroDetail = ref({});
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding: 50px var(--container-padding);
  }
}
</style>
