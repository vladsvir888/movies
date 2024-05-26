<template>
  <div class="first-screen-block">
    <AtomLoader :is-show-accessible-text="false" />
    <p class="first-screen-block__text">{{ $t("Loading") }}<span></span></p>
  </div>
</template>

<script setup></script>

<style lang="scss">
.first-screen-block {
  position: fixed;
  inset: 0;
  z-index: 5;
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
