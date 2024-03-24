<template>
  <div class="photos-block">
    <section
      v-for="(categoryData, categoryName) in data"
      :key="categoryName"
      class="photos-block__section"
    >
      <h2 class="photos-block__title">
        {{ transformCategory(categoryName) }}
        <span>{{ categoryData.length }} {{ $t("images") }}</span>
      </h2>

      <ul class="photos-block__list">
        <li
          v-for="path in categoryData"
          :key="path"
          class="photos-block__list-item"
        >
          <MyLazyImage
            :src="`${config.public.apiImgUrl}w500${path}`"
            :sizes="{
              width: 400,
              height: 400,
            }"
            loading="lazy"
            class="photos-block__image"
          />
        </li>
      </ul>
    </section>
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

const transformCategory = (category) => {
  return category[0].toUpperCase() + category.slice(1);
};
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.photos-block {
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
