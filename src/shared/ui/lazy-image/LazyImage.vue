<template>
  <span class="lazy-image">
    <img
      class="lazy-image__placeholder"
      src="/images/img-placeholder.png"
      alt=""
      width="50"
      height="50"
      :style="{
        opacity: isPlaceholder ? 1 : 0,
      }"
    />
    <NuxtImg
      class="lazy-image__image"
      :src="src"
      :alt="alt"
      :width="sizes?.width"
      :height="sizes?.height"
      :loading="loading"
      :style="{
        opacity: isPlaceholder ? 0 : 1,
      }"
      @load="onLoad"
    />
  </span>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  sizes: {
    type: Object,
    default: () => {},
  },
  alt: {
    type: String,
    default: null,
  },
  loading: {
    type: String,
    default: null,
  },
});

const isPlaceholder = ref(true);

const onLoad = () => {
  isPlaceholder.value = false;
};
</script>

<style lang="scss">
.lazy-image {
  $this: &;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    &:has(~ .lazy-image__image[style="opacity: 0;"]) {
      animation: opacity 1.5s linear infinite;
    }
  }

  @keyframes opacity {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
