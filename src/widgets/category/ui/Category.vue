<template>
  <Carousel
    v-slot="{ data, type: mediaType }"
    :type="type"
    :category="category"
    :title="title"
    :items="items"
  >
    <Card :data="data" :type="mediaType" />
  </Carousel>
</template>

<script setup>
import Carousel from "~/src/shared/ui/carousel";
import { useMediaStore, Card } from "~/src/entities/media";
import { useCustomFetch } from "~/src/shared/api";
import { transformCategory } from "../lib";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const mediaStore = useMediaStore();

useCustomFetch(`/${props.type}/${props.category}`, {
  onResponse({ response }) {
    mediaStore[props.type][transformCategory(props.category)] =
      response._data.results;
  },
});

const items = computed(() => {
  return mediaStore[props.type][transformCategory(props.category)];
});
</script>
