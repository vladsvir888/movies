<template>
  <div class="base-loader" role="alert">
    <p v-if="isShowAccessibleText" class="visually-hidden">
      {{ $t("This content is loading...") }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  isShowAccessibleText: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
.base-loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--palette-puerto-rico);
  border-top-color: transparent;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
