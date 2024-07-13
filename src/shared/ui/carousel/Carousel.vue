<template>
  <Splide
    class="carousel"
    :options="preparedOptions"
    :has-track="false"
    :tag="tag"
    :autoWidth="true"
  >
    <div class="container">
      <header class="carousel__header">
        <Heading
          v-if="title"
          :level="2"
          variant="underline"
          class="carousel__title"
        >
          {{ $t(title) }}
        </Heading>

        <Button
          v-if="isShowMore"
          :to="`/${type}/category/${category}`"
          class="carousel__more"
          variant="underline"
        >
          {{ $t("Explore more") }}
          <Icon icon="arrow-next" />
        </Button>
      </header>

      <SplideTrack class="carousel__track">
        <SplideSlide
          v-for="item in items"
          :key="item.id"
          class="carousel__slide"
        >
          <slot :data="item" :type="type" />
        </SplideSlide>
      </SplideTrack>

      <div class="splide__arrows carousel__controls">
        <Button
          class="splide__arrow splide__arrow--prev carousel__button carousel__button--prev"
        >
          <span class="visually-hidden">{{ $t("Previous") }}</span>
          <Icon icon="arrow-prev" />
        </Button>
        <div class="splide__pagination carousel__pagination"></div>
        <Button
          class="splide__arrow splide__arrow--next carousel__button carousel__button--next"
        >
          <span class="visually-hidden">{{ $t("Next") }}</span>
          <Icon icon="arrow-next" />
        </Button>
      </div>
    </div>
  </Splide>
</template>

<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/core";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";

const { t } = useI18n();

const DEFAULT_OPTIONS = {
  focus: 0,
  omitEnd: true,
  gap: 10,
  classes: {
    page: "carousel__bullet",
  },
  i18n: {
    select: t("Select a slide to show"),
    prev: "",
    next: "",
    pageX: `${t("Go to")} %s`,
    slideLabel: `%s ${t("of")} %s`,
  },
};

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
  isShowMore: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Object,
    default: () => {},
  },
  tag: {
    type: String,
    default: "section",
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const preparedOptions = computed(() => {
  return {
    ...DEFAULT_OPTIONS,
    ...props.options,
  };
});
</script>

<style lang="scss">
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
    color: var(--palette-white);
    background-color: var(--palette-tuna);
    border-radius: 10px;
    transition: background-color var(--transition300ms);

    &:not(:disabled) {
      @include hover {
        background-color: rgb(var(--palette-black--rgb) / 80%);
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
    background-color: var(--palette-topaz);
    border: none;

    &.is-active {
      background-color: var(--palette-white);
    }
  }

  &__track {
    overflow: visible;
  }

  &__more {
    column-gap: 5px;
  }
}
</style>
