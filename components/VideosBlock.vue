<template>
  <div class="videos-block">
    <VideoPlayer v-for="item in data" :key="item.id" :data="item" />
  </div>
</template>

<script setup>
const videoStore = useVideo();

defineProps({
  data: {
    type: Array,
    default: null,
  },
});

onUnmounted(videoStore.resetState);
</script>

<style lang="scss">
.videos-block {
  --min-width: 350px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
  gap: var(--grid-gap);
  grid-auto-rows: minmax(200px, 1fr);

  @media (width <= 600px) {
    --min-width: 300px;
  }
}
</style>
