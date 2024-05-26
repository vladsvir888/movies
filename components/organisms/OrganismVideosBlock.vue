<template>
  <div class="videos-block">
    <AtomSelect
      v-if="selectedVariantSortedData"
      v-model="selectedVariantSortedData"
      :options="sortedData"
      :label="$t('Sort by')"
      id="videos-sort-by-select"
      wrapper-class="videos-block__select"
    />
    <div v-if="filteredData.length" class="videos-block__wrapper">
      <MoleculeVideoPlayer
        v-for="item in filteredData"
        :key="item.id"
        :data="item"
      />
    </div>
    <p v-else class="videos-block__text">{{ $t("No videos") }}</p>
  </div>
</template>

<script setup>
const { t } = useI18n();
const videoStore = useVideo();

const props = defineProps({
  data: {
    type: Array,
    default: null,
  },
});

const sortedData = computed(() => {
  const data = [...new Set(props.data.map((item) => item.type))].map(
    (item) => ({
      text: item,
      value: item,
    })
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
    return props.data;
  }

  return props.data.filter(
    (item) => item.type === selectedVariantSortedData.value
  );
});

onUnmounted(videoStore.resetState);
</script>

<style lang="scss">
.videos-block {
  &__wrapper {
    --min-width: 350px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
    gap: var(--grid-gap);
    grid-auto-rows: minmax(200px, 1fr);

    @media (width <= 600px) {
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
