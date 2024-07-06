<template>
  <Carousel
    :type="type"
    :category="category"
    :title="title"
    :items="data"
    v-slot="{ data, type }"
  >
    <Card :data="data" :type="type" />
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

const data = computed(() => {
  return mediaStore[props.type][transformCategory(props.category)];
});
</script>
