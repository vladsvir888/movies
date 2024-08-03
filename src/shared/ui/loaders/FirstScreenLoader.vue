<template>
  <div class="first-screen-loader">
    <BaseLoader :is-show-accessible-text="false" />
    <p class="first-screen-loader__text">{{ $t("Loading") }}<span /></p>
  </div>
</template>

<script setup>
import BaseLoader from "./BaseLoader.vue";
</script>

<style lang="scss">
.first-screen-loader {
  position: fixed;
  inset: 0;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 12px;
  background-color: var(--palette-black);

  &__text {
    > span {
      &::before {
        content: "...";
        animation: dots 1.5s infinite;
      }
    }
  }

  @keyframes dots {
    0% {
      content: "";
    }

    30% {
      content: ".";
    }

    60% {
      content: "..";
    }

    100% {
      content: "...";
    }
  }
}
</style>
