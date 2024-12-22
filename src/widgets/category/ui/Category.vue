<template>
  <div class="category">
    <div class="container">
      <header class="category__header">
        <Heading :level="2" variant="underline" class="category__title">
          {{ $t(title) }}
        </Heading>
        <Button
          :to="`/${type}/category/${category}`"
          class="category__more"
          variant="underline"
        >
          {{ $t("Explore more") }}
          <Icon icon="arrow-next" />
        </Button>
      </header>
      <Carousel
        v-slot="{ data }"
        :items="items"
        :breakpoints="{
          '1200': {
            slidesPerView: 5,
          },
          '767': {
            slidesPerView: 3,
          },
          '480': {
            slidesPerView: 2,
          },
        }"
      >
        <Card :data="data" :type="type" />
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
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
  return mediaStore[props.type][transformCategory(props.category)]?.slice(
    0,
    10
  );
});
</script>

<style lang="scss">
.category {
  padding: 25px 0;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__more {
    column-gap: 5px;
  }
}
</style>
