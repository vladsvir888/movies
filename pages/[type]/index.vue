<template>
  <div class="page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t(`${type}_page.seo.title`)"
      :description="$t(`${type}_page.seo.meta.description`)"
    />

    <HeroBlock :data="store[type].heroBlock" />

    <TheCarousel
      v-for="item in lists[type]"
      :key="item.category"
      :type="item.type"
      :category="item.category"
    />
  </div>
</template>

<script setup>
import { lists } from "~/constants";

const route = useRoute();

const store = useStore();

const type = computed(() => {
  return route.params.type;
});

if (!lists[type.value]) {
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
