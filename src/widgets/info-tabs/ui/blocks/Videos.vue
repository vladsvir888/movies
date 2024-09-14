<template>
  <div class="videos">
    <Select
      v-if="selectedVariantSortedData"
      v-model="selectedVariantSortedData"
      :options="sortedData"
      :label="$t('Sort by')"
      class="videos__select"
    />
    <div v-if="filteredData.length" class="videos__wrapper">
      <Video v-for="item in filteredData" :key="item.key" :data="item" />
    </div>
    <p v-else class="videos__text">{{ $t("No videos") }}</p>
  </div>
</template>

<script setup lang="ts">
import { Video, useVideoStore } from "~/src/entities/media";
import Select from "~/src/shared/ui/select";
import type { BaseVideo, Video as TVideo } from "~/src/shared/config";

const { t } = useI18n();
const videoStore = useVideoStore();

const props = defineProps<{
  data: BaseVideo[];
}>();

const localData = computed<TVideo[]>(() => {
  return props.data.map(({ key, name, type, published_at }) => ({
    key,
    name,
    type,
    published_at,
  }));
});

const sortedData = computed(() => {
  const data = [...new Set(localData.value.map((item) => item.type))].map(
    (item) => ({
      text: item,
      value: item,
    }),
  );

  return [
    {
      text: t("All"),
      value: t("All"),
    },
    ...data,
  ];
});
const selectedVariantSortedData = ref(sortedData.value[0].text);

const filteredData = computed(() => {
  if (selectedVariantSortedData.value === "All") {
    return localData.value;
  }

  return localData.value.filter(
    (item) => item.type === selectedVariantSortedData.value,
  );
});

onUnmounted(videoStore.resetState);
</script>

<style lang="scss">
.videos {
  &__wrapper {
    --min-width: 350px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
    gap: var(--grid-gap);
    grid-auto-rows: minmax(200px, 1fr);

    @media (--mobile) {
      --min-width: 300px;
    }
  }

  &__select {
    margin-bottom: 16px;

    .select-block {
      &__select-wrapper {
        min-width: 150px;
      }
    }
  }
}
</style>
