<template>
  <div class="carousel">
    <div ref="slides" class="carousel__slides">
      <div
        v-for="item in items"
        :key="item.id"
        ref="slide"
        class="carousel__slide"
      >
        <slot :data="item" />
      </div>
    </div>
    <div v-if="controls" class="carousel__controls">
      <Button
        class="carousel__button carousel__button--prev"
        :aria-label="$t('Previous')"
        @click="scroll('prev')"
      >
        <Icon icon="arrow-prev" />
      </Button>
      <Button
        class="carousel__button carousel__button--next"
        :aria-label="$t('Next')"
        @click="scroll('next')"
      >
        <Icon icon="arrow-next" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/src/shared/ui/button";
import Icon from "~/src/shared/ui/icon";
import type { Media } from "~/src/shared/config";
import { throttle } from "~/src/shared/lib/events";

type SlidesPerView = number | "auto";

type SpaceBetween = number;

type Breakpoint = {
  slidesPerView?: SlidesPerView;
  spaceBetween?: SpaceBetween;
};

type CarouselProps = {
  items: Media[];
  slidesPerView?: SlidesPerView;
  spaceBetween?: SpaceBetween;
  breakpoints?: Record<string, Breakpoint>;
  controls?: boolean;
};

type ScrollDirection = "prev" | "next";

const props = withDefaults(defineProps<CarouselProps>(), {
  items: () => [],
  slidesPerView: 7,
  spaceBetween: 10,
  breakpoints: undefined,
  controls: true,
});

const slides = ref<HTMLDivElement | null>(null);
const slide = ref<HTMLDivElement[]>([]);

const getSlideWidth = (): number | undefined => {
  if (!slide.value.length) {
    return;
  }

  return slide.value[0].offsetWidth;
};

const scroll = (direction: ScrollDirection): void => {
  if (!slides.value) {
    return;
  }

  const slideWidth = getSlideWidth();

  if (!slideWidth) {
    return;
  }

  let left = 0;
  const { scrollLeft } = slides.value;

  switch (direction) {
    case "prev":
      left = scrollLeft - slideWidth;
      break;
    case "next":
      left = scrollLeft + slideWidth;
      break;
    default:
      break;
  }

  slides.value.scroll({
    left,
    behavior: "smooth",
  });
};

const prepareSpaceBetween = (value: number): string => {
  return `${value}px`;
};

const setBreakpoint = (): void => {
  if (!props.breakpoints) {
    return;
  }

  const windowWidth = window.innerWidth;
  const points = Object.keys(props.breakpoints);
  const point = points.find((item) => Number(item) >= windowWidth);

  if (!point) {
    localSlidesPerView.value = props.slidesPerView;
    localSpaceBetween.value = prepareSpaceBetween(props.spaceBetween);
    return;
  }

  if (window.matchMedia(`(max-width: ${point}px)`).matches) {
    const breakpoint = props.breakpoints[point];
    localSlidesPerView.value = breakpoint.slidesPerView
      ? breakpoint.slidesPerView
      : props.slidesPerView;
    localSpaceBetween.value = breakpoint.spaceBetween
      ? prepareSpaceBetween(breakpoint.spaceBetween)
      : prepareSpaceBetween(props.spaceBetween);
  }
};

const localSlidesPerView = ref(props.slidesPerView);
const localSpaceBetween = ref(prepareSpaceBetween(props.spaceBetween));

const throttledSetBreakpoint = throttle(setBreakpoint);

onMounted(() => {
  if (localSlidesPerView.value === "auto") {
    return;
  }

  setBreakpoint();
  window.addEventListener("resize", throttledSetBreakpoint);
});

onUnmounted(() => {
  if (localSlidesPerView.value === "auto") {
    return;
  }

  window.removeEventListener("resize", throttledSetBreakpoint);
});
</script>

<style lang="scss">
.carousel {
  &__slides {
    display: flex;
    align-items: center;
    gap: v-bind(localSpaceBetween);
    padding-bottom: 10px;
    overflow: scroll hidden;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
  }

  &__slide {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: calc(100% / v-bind(localSlidesPerView) - v-bind(localSpaceBetween));
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

    &--prev {
      rotate: 180deg;
    }
  }
}
</style>
