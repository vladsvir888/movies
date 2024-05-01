<template>
  <div class="page">
    <TheHeading class="visually-hidden">
      {{ title }}
    </TheHeading>

    <PageSeoData :lang="$t('lang')" :title="title" :description="title" />

    <HeroBlock :data="store[type].heroBlock" />

    <TheCarousel
      v-for="item in LISTS[type]"
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

useApi(`/${type.value}/popular`, {
  onResponse({ response }) {
    store[type.value].heroBlock = response._data.results[0];
  },
});
</script>
