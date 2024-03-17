<template>
  <Splide
    class="carousel"
    :options="{
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
    :autoWidth="true"
  >
    <div class="container">
      <header class="carousel__header">
        <h2 class="carousel__title">
          {{ carouselTitle }}
        </h2>

        <TheButton
          :to="`/${type}/category/${category}`"
          class="carousel__more"
          variant="decoration"
          >Explore more</TheButton
        >
      </header>

      <SplideTrack class="carousel__track">
        <SplideSlide
          v-for="item in data"
          :key="item.id"
          class="carousel__slide"
        >
          <CarouselCard :data="item" :type="type" />
        </SplideSlide>
      </SplideTrack>

      <div class="splide__arrows carousel__controls">
        <TheButton
          class="splide__arrow splide__arrow--prev carousel__button carousel__button--prev"
        >
          <span class="visually-hidden">{{ $t("previous") }}</span>
          <TheIcon icon="arrow-prev" />
        </TheButton>
        <div class="splide__pagination carousel__pagination"></div>
        <TheButton
          class="splide__arrow splide__arrow--next carousel__button carousel__button--next"
        >
          <span class="visually-hidden">{{ $t("next") }}</span>
          <TheIcon icon="arrow-next" />
        </TheButton>
      </div>
    </div>
  </Splide>
</template>

<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/core";

const { t } = useI18n();

const store = useStore();

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

useApi(`/${props.type}/${props.category}`, {
  onResponse({ response }) {
    store[props.type][transformWord(props.category)] = response._data.results;
  },
});

const data = computed(() => {
  return store[props.type][transformWord(props.category)];
});

const carouselTitle = computed(() => {
  return t(`${props.type}_${props.category}.title`);
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.carousel {
  $this: &;

  padding: 25px 0;
  overflow-x: hidden;

  &__slide {
    width: 245px !important;
  }

  &:not(.is-overflow) {
    #{$this}__controls {
      display: none;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
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

  &__track {
    overflow: visible;
  }
}
</style>
