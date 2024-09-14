<template>
  <div class="page page-detail">
    <PageSeoData
      :title="(state?.title || state?.name) ?? ''"
      :description="state?.overview ?? ''"
    />
    <HeroSectionDetail v-if="state" :data="state" />

    <div class="page-detail__tabs container">
      <InfoTabs v-if="state" :data="state" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSectionDetail from "./hero-section";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import InfoTabs from "~/src/widgets/info-tabs";
import type { Media, MediaTypes } from "~/src/shared/config";
import { useRouteParam } from "~/src/shared/lib/use";
import { useCustomFetch } from "~/src/shared/api";

const { locale } = useI18n();
const type = useRouteParam<MediaTypes>("type");
const id = useRouteParam<string>("id");

const { state } = await useCustomFetch<Media>(`/${type.value}/${id.value}`, {
  query: {
    language: locale,
    append_to_response: "videos,images,reviews,similar",
  },
});

if (!state.value) {
  throw createError({ statusCode: 404, fatal: true });
}
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding-top: 50px;
    padding-bottom: 20px;
  }
}
</style>
