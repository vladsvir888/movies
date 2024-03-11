<template>
  <Splide
    class="carousel"
    :options="{
      perPage: 7,
      focus: 0,
      omitEnd: true,
      gap: 10,
      classes: {
        page: 'carousel__bullet',
      },
      i18n: {
        select: $t('carousel.select'),
        prev: '',
        next: '',
        pageX: `${$t('carousel.pagination')} %s`,
        slideLabel: `%s ${$t('carousel.slide')} %s`,
      },
    }"
    :has-track="false"
    :tag="'section'"
  >
    <h2 class="carousel__title">{{ $t("popular_movies.title") }}</h2>

    <SplideTrack>
      <SplideSlide v-for="item in data" :key="item.id">
        <CarouselCard :data="item" />
      </SplideSlide>
    </SplideTrack>

    <div class="splide__arrows carousel__controls">
      <TheButton
        class="splide__arrow splide__arrow--prev carousel__button carousel__button--prev"
      >
        <span class="visually-hidden">{{ $t("carousel.button_prev") }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 18"
          aria-hidden="true"
        >
          <path d="M1 1l8 8-8 8" />
        </svg>
      </TheButton>
      <div class="splide__pagination carousel__pagination"></div>
      <TheButton
        class="splide__arrow splide__arrow--next carousel__button carousel__button--next"
      >
        <span class="visually-hidden">{{ $t("carousel.button_next") }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 18"
          aria-hidden="true"
        >
          <path d="M1 1l8 8-8 8" />
        </svg>
      </TheButton>
    </div>
  </Splide>
</template>

<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/core";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.carousel {
  $this: &;

  padding: 25px 0;

  &:not(.is-overflow) {
    #{$this}__controls {
      display: none;
    }
  }

  &__title {
    margin-bottom: 20px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }

  &__button {
    width: 50px;
    height: 30px;
    color: #fff;
    background-color: #3a3b3f;
    border-radius: 10px;
    transition: background-color var(--transition300ms);

    &:not(:disabled) {
      @include hover {
        background-color: rgb(0 0 0 / 80%);
      }
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }

    &--prev {
      rotate: 180deg;
    }

    > svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      fill: none;
    }
  }

  &__pagination {
    gap: 4px;

    li {
      display: flex;
    }
  }

  &__bullet {
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #797585;
    border: none;

    &.is-active {
      background-color: #fff;
    }
  }
}
</style>
