<template>
  <div class="photos">
    <section
      v-for="(imageList, imageListKey) in localData"
      :key="imageListKey"
      class="photos__section"
    >
      <Heading :level="2" class="photos__title">
        {{ transformCategory(imageListKey) }}
        <span>{{ imageList.length }} {{ $t("Images") }}</span>
      </Heading>

      <ul class="photos__list">
        <li
          v-for="(path, index) in imageList"
          :key="path"
          class="photos__list-item"
        >
          <Button
            class="photos__list-button"
            :aria-label="$t('Open gallery images')"
            @click="onClickButton(imageListKey, index)"
          >
            <LazyImage
              :src="`${config.public.apiImgUrl}w500${path}`"
              :sizes="{
                width: 400,
                height: 400,
              }"
              loading="lazy"
              class="photos__image"
            />
          </Button>
        </li>
      </ul>
    </section>

    <ImageLightbox
      v-model:index="indexActiveItem"
      v-model:is-show="isShow"
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
import ImageLightbox from "~/src/shared/ui/image-lightbox";
import LazyImage from "~/src/shared/ui/lazy-image";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import type {
  MediaImages,
  MediaImagesKeys,
  MediaImagesKeysWithoutLogos,
} from "~/src/shared/config";

const config = useRuntimeConfig();

const props = defineProps<{
  data: MediaImages;
}>();

const localData = computed(() => {
  const result: Record<MediaImagesKeysWithoutLogos, string[]> = {
    backdrops: [],
    posters: [],
  };
  let key: MediaImagesKeys;

  for (key in props.data) {
    if (key === "logos") continue;
    result[key] = props.data[key].map((item) => item.file_path);
  }

  return result;
});

const items = ref<string[]>([]);
const indexActiveItem = ref(0);
const isShow = ref(false);

const onClickButton = (
  category: MediaImagesKeysWithoutLogos,
  index: number,
): void => {
  if (category === "backdrops") {
    items.value = localData.value.backdrops;
  } else if (category === "posters") {
    items.value = localData.value.posters;
  }

  indexActiveItem.value = index;
  isShow.value = true;
};

const transformCategory = <T extends MediaImagesKeysWithoutLogos>(
  category: T,
): Capitalize<T> => {
  return (category[0].toUpperCase() + category.slice(1)) as Capitalize<T>;
};
</script>

<style lang="scss">
.photos {
  $this: &;

  display: flex;
  flex-direction: column;
  row-gap: 60px;

  @media (--mobile) {
    row-gap: 30px;
  }

  &__title {
    margin-bottom: 20px;

    > span {
      opacity: 0.6;
      font-size: 14px;
      font-weight: 400;
    }
  }

  &__list {
    --min-width: 350px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
    gap: var(--grid-gap);
    grid-auto-rows: minmax(200px, 1fr);

    @media (--mobile) {
      --min-width: 300px;
    }

    &-item {
      display: flex;
      justify-content: center;
    }

    &-button {
      &:focus-visible {
        outline: none;

        #{$this}__image {
          > .lazy-image__image {
            scale: 1.1;
          }
        }
      }
    }
  }

  &__image {
    height: 100%;
    overflow: hidden;

    @include hover {
      > .lazy-image__image {
        scale: 1.1;
      }
    }

    > .lazy-image__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: scale var(--transition1000ms);
    }
  }
}
</style>
