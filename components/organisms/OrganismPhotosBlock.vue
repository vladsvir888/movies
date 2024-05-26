<template>
  <div class="photos-block">
    <section
      v-for="(categoryData, categoryName) in data"
      :key="categoryName"
      class="photos-block__section"
    >
      <AtomHeading :level="2" class="photos-block__title">
        {{ transformCategory(categoryName) }}
        <span>{{ categoryData.length }} {{ $t("Images") }}</span>
      </AtomHeading>

      <ul class="photos-block__list">
        <li
          v-for="(path, index) in categoryData"
          :key="path"
          class="photos-block__list-item"
        >
          <AtomButton
            class="photos-block__list-button"
            :aria-label="$t('Open gallery images')"
            @click="onClickButton(categoryName, index)"
          >
            <AtomLazyImage
              :src="`${config.public.apiImgUrl}w500${path}`"
              :sizes="{
                width: 400,
                height: 400,
              }"
              loading="lazy"
              class="photos-block__image"
            />
          </AtomButton>
        </li>
      </ul>
    </section>

    <MoleculeImageLightbox
      :items="items"
      v-model:index="indexActiveItem"
      v-model:is-show="isShow"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const backdrops = ref(props.data.backdrops);
const posters = ref(props.data.posters);

const items = ref([]);
const indexActiveItem = ref(null);
const isShow = ref(false);

const onClickButton = (category, index) => {
  if (category === "backdrops") {
    items.value = backdrops.value;
  } else if (category === "posters") {
    items.value = posters.value;
  }

  indexActiveItem.value = index;
  isShow.value = true;
};

const transformCategory = (category) => {
  return category[0].toUpperCase() + category.slice(1);
};
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.photos-block {
  $this: &;

  display: flex;
  flex-direction: column;
  row-gap: 60px;

  @media (width <= 600px) {
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

    @media (width <= 600px) {
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
