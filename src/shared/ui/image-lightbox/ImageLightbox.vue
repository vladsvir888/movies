<template>
  <Teleport to="body">
    <Transition name="image-lightbox">
      <div
        v-show="isShow"
        ref="lightbox"
        class="image-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('Gallery images')"
        @keydown.esc="closeLightbox"
        @keydown.right="toNextImage"
        @keydown.left="toPreviousImage"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="image-lightbox__overlay" @click="closeLightbox" />
        <ul class="image-lightbox__list">
          <li
            v-for="(item, i) in items"
            :key="item"
            :style="{
              opacity: index === i ? 1 : 0,
            }"
            class="image-lightbox__list-item"
          >
            <NuxtImg
              :src="`${config.public.apiImgUrl}w500/${item}`"
              class="image-lightbox__image"
              width="500"
              height="281"
              loading="lazy"
              alt=""
            />
          </li>
        </ul>
        <Button
          class="image-lightbox__close"
          :aria-label="$t('Close')"
          @click="closeLightbox"
        >
          <Icon icon="close" />
        </Button>
        <Button
          ref="prevButton"
          class="image-lightbox__button image-lightbox__button--prev"
          :aria-label="$t('Previous')"
          :disabled="isFirstImage"
          @click="toPreviousImage"
        >
          <Icon icon="arrow-prev" />
        </Button>
        <Button
          ref="nextButton"
          class="image-lightbox__button image-lightbox__button--next"
          :aria-label="$t('Next')"
          :disabled="isLastImage"
          @click="toNextImage"
        >
          <Icon icon="arrow-next" />
        </Button>
        <div class="image-lightbox__counter">
          {{ index + 1 }} / {{ items.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { toggleScrollbar } from "~/src/shared/lib/dom";
import { useFocusTrap } from "~/src/shared/lib/use";

type ImageLightboxProps = {
  items: string[];
};

const props = defineProps<ImageLightboxProps>();

const isShow = defineModel("isShow", {
  type: Boolean,
  default: false,
});

const index = defineModel("index", {
  type: Number,
  default: 0,
});

const config = useRuntimeConfig();

const lightbox = ref<HTMLDivElement | null>(null);

const prevButton = ref<InstanceType<typeof Button> | null>(null);
const nextButton = ref<InstanceType<typeof Button> | null>(null);

const { activate, deactivate } = useFocusTrap(lightbox, {
  fallbackFocus: ".image-lightbox",
});

const isFirstImage = computed(() => {
  return index.value === 0;
});

const isLastImage = computed(() => {
  return index.value === props.items.length - 1;
});

const handleFocus = async () => {
  await nextTick();

  if (isFirstImage.value) {
    nextButton.value?.button?.focus();
  } else if (isLastImage.value) {
    prevButton.value?.button?.focus();
  }
};

watch(isShow, async (newValue) => {
  if (newValue) {
    activate();
    await handleFocus();
  } else {
    deactivate();
  }

  toggleScrollbar(newValue);
});

watch(index, async () => {
  await handleFocus();
});

const toNextImage = (event: Event): void => {
  if (isLastImage.value) {
    event.preventDefault();
    return;
  }

  index.value += 1;
};

const toPreviousImage = (event: Event): void => {
  if (isFirstImage.value) {
    event.preventDefault();
    return;
  }

  index.value -= 1;
};

const startX = ref(0); // Начальная позиция нажатия мыши или тача
const deltaX = ref(0); // Смещение по X
const isDragging = ref(false);
const isClick = ref(false);

const handleMouseDown = (event: MouseEvent) => {
  startX.value = event.clientX; // Сохраняем начальную позицию мыши
  isDragging.value = true;
  isClick.value = true;
};
const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) {
    return;
  }

  deltaX.value = event.clientX - startX.value; // Вычисляем смещение

  if (Math.abs(deltaX.value) > 5) {
    // Если смещение больше 5px, считаем, что это драг
    isClick.value = false;
  }
};
const handleMouseUp = (event: MouseEvent) => {
  if (!isDragging.value) {
    return;
  }

  isDragging.value = false;

  if (deltaX.value > 50) {
    toPreviousImage(event);
  } else if (deltaX.value < -50) {
    toNextImage(event);
  }

  deltaX.value = 0;
};

const handleTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX;
  isDragging.value = true;
  isClick.value = true;
};
const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value) {
    return;
  }

  deltaX.value = event.touches[0].clientX - startX.value;

  if (Math.abs(deltaX.value) > 5) {
    // Если смещение больше 5px, считаем, что это драг
    isClick.value = false;
  }
};
const handleTouchEnd = (event: TouchEvent) => {
  if (!isDragging.value) {
    return;
  }

  isDragging.value = false;

  if (deltaX.value > 50) {
    toPreviousImage(event);
  } else if (deltaX.value < -50) {
    toNextImage(event);
  }

  deltaX.value = 0;
};

const closeLightbox = (): void => {
  if (isClick.value) {
    isShow.value = false;
    deactivate();
  }
};
</script>

<style lang="scss">
.image-lightbox {
  position: fixed;
  inset: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: grab;

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgb(var(--palette-black--rgb) / 80%);
  }

  &__list {
    &-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity var(--transition300ms);
      pointer-events: none;
    }
  }

  &__button {
    position: absolute;
    top: 50%;
    translate: 0 -50%;

    &--prev {
      left: 10px;
    }

    &--next {
      right: 10px;
    }
  }

  &__button,
  &__close {
    transition: color var(--transition300ms);

    &:disabled {
      opacity: 0.5;
    }

    @include hover {
      &:not(:disabled) {
        color: var(--palette-puerto-rico);
      }
    }

    > .icon svg {
      width: 32px;
      height: 32px;
    }

    &--prev {
      rotate: 180deg;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__counter {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity var(--transition300ms);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
