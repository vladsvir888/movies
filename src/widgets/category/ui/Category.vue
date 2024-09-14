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

<script setup lang="ts">
import Carousel from "~/src/shared/ui/carousel";
import { useMediaStore, Card } from "~/src/entities/media";
import { useCustomFetch } from "~/src/shared/api";
import { transformCategory } from "../lib";
import type {
  MediaTypes,
  MediaCategories,
  PageResult,
  Media,
  IResponse,
} from "~/src/shared/config";

type CategoryProps = {
  type: MediaTypes;
  category: MediaCategories;
  title: string;
};

const props = defineProps<CategoryProps>();

const mediaStore = useMediaStore();

useCustomFetch(`/${props.type}/${props.category}`, {
  onResponse({ response }: IResponse<PageResult<Media>>) {
    const responseData = response._data;

    if (!responseData) {
      return;
    }

    mediaStore[props.type][transformCategory(props.category)] =
      responseData.results;
  },
});

const items = computed(() => {
  return mediaStore[props.type][transformCategory(props.category)];
});
</script>
