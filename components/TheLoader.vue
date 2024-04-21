<template>
  <div class="loader" role="alert">
    <p class="visually-hidden">{{ $t("This content is loading...") }}</p>
  </div>
</template>

<style lang="scss">
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  border-top-color: transparent;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
