<template>
  <Teleport to="body">
    <Transition name="image-lightbox">
      <div
        v-show="isShow"
        v-trap="isShow"
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
        <TheButton
          class="image-lightbox__close"
          :aria-label="$t('Close')"
          @click="closeLightbox"
        >
          <TheIcon icon="close" />
        </TheButton>
        <TheButton
          class="image-lightbox__button image-lightbox__button--prev"
          :aria-label="$t('Previous')"
          :disabled="isFirstImage"
          @click="toPreviousImage"
        >
          <TheIcon icon="arrow-prev" />
        </TheButton>
        <TheButton
          class="image-lightbox__button image-lightbox__button--next"
          :aria-label="$t('Next')"
          :disabled="isLastImage"
          @click="toNextImage"
        >
          <TheIcon icon="arrow-next" />
        </TheButton>
        <div class="image-lightbox__counter">
          {{ index + 1 }} / {{ items.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
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

const isFirstImage = computed(() => {
  return index.value === 0;
});

const isLastImage = computed(() => {
  return index.value === props.items.length - 1;
});

watch(isShow, (newValue) => {
  if (newValue) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

const closeLightbox = () => {
  isShow.value = false;
  index.value = null;
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
@import "~/assets/styles/helpers/mixins/hover.scss";

.image-lightbox {
  position: fixed;
  inset: 0;
  z-index: 5;
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

  &__image {
    width: 100%;
    height: 95vh;
    object-fit: contain;
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
