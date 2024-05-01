<template>
  <article class="carousel-card">
    <MyLazyImage
      :src="`${config.public.apiImgUrl}w400${data.poster_path}`"
      :sizes="{
        width: 400,
        height: 600,
      }"
      loading="lazy"
      class="carousel-card__img"
    />
    <div class="carousel-card__content">
      <TheHeading
        v-if="preparedTitle"
        :level="headingLevel"
        class="carousel-card__title"
      >
        <TheButton :to="`/${type}/${data.id}`" class="carousel-card__link">
          {{ preparedTitle }}
        </TheButton>
      </TheHeading>
      <div class="carousel-card__wrapper">
        <TheRating v-if="data.vote_average" v-model="ratingCount" />
        <p v-if="data.vote_average" class="carousel-card__text">
          {{ data.vote_average }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  headingLevel: {
    type: Number,
    default: 3,
  },
});

const ratingCount = ref(divideByTwoAndRound(props.data.vote_average));

const preparedTitle = getTitleOrName(props.data);
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.carousel-card {
  $this: &;

  position: relative;
  display: grid;
  height: 100%;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgb(0 0 0 / 0%);
    transition: background-color var(--transition300ms);
    content: "";
  }

  @include hover {
    &::before {
      background-color: rgb(0 0 0 / 80%);
    }

    #{$this}__content {
      opacity: 1;
      translate: 0 0;
    }
  }

  &:focus-within {
    &::before {
      background-color: rgb(0 0 0 / 80%);
    }

    #{$this}__content {
      opacity: 1;
      visibility: visible;
      translate: 0 0;
    }
  }

  &__img {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    > .lazy-image__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    padding: 10px;
    opacity: 0;
    translate: 0 2%;
    text-align: center;
    transition: opacity var(--transition300ms), translate var(--transition300ms);
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px 10px;
  }

  &__title {
    font-size: 18px;

    @media (width <= 600px) {
      font-size: 16px;
    }
  }

  &__link {
    outline: none;

    &::before {
      position: absolute;
      inset: 0;
      content: "";
    }
  }
}
</style>
