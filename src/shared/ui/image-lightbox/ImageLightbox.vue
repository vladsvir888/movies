<template>
  <Teleport to="body">
    <Transition name="image-lightbox">
      <div
        ref="lightbox"
        v-show="isShow"
        class="image-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('Gallery images')"
        @keydown.esc="closeLightbox"
        @keydown.right="toNextImage"
        @keydown.left="toPreviousImage"
      >
        <div class="image-lightbox__overlay" @click="closeLightbox"></div>
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
          class="image-lightbox__button image-lightbox__button--prev"
          :aria-label="$t('Previous')"
          :disabled="isFirstImage"
          @click="toPreviousImage"
        >
          <Icon icon="arrow-prev" />
        </Button>
        <Button
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

<script setup>
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { toggleScrollbar } from "~/src/shared/lib/dom";
import { useFocusTrap } from "~/src/shared/lib/use";

const config = useRuntimeConfig();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const isShow = defineModel("isShow", {
  default: false,
});

const index = defineModel("index", {
  default: null,
});

const lightbox = ref(null);

const { activate, deactivate } = useFocusTrap(lightbox, {
  fallbackFocus: ".image-lightbox",
});

const isFirstImage = computed(() => {
  return index.value === 0;
});

const isLastImage = computed(() => {
  return index.value === props.items.length - 1;
});

watch(isShow, (newValue) => {
  if (newValue) {
    activate();
  } else {
    deactivate();
  }

  toggleScrollbar(newValue);
});

const closeLightbox = () => {
  isShow.value = false;
  index.value = null;
  deactivate();
};

const toNextImage = (event) => {
  if (isLastImage.value) {
    event.preventDefault();
    return;
  }

  index.value += 1;
};

const toPreviousImage = (event) => {
  if (isFirstImage.value) {
    event.preventDefault();
    return;
  }

  index.value -= 1;
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
