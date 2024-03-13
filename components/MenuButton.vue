<template>
  <TheButton
    class="menu-button"
    :aria-expanded="isMenuExpanded"
    aria-controls="sidebar"
    @click="onMenuButtonClick"
  >
    <span
      :hidden="isMenuExpanded"
      class="menu-button__icon menu-button__icon--menu"
    >
      <svg
        stroke="currentcolor"
        stroke-width="2"
        stroke-linecap="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
        width="24"
        height="24"
      >
        <path d="M3 6h18M3 12h12M3 18h18" />
      </svg>
    </span>
    <span
      :hidden="!isMenuExpanded"
      class="menu-button__icon menu-button__icon--close"
    >
      <svg
        stroke-width="2"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
        width="24"
        height="24"
      >
        <path d="M18 6L6 18M6 6L18 18" />
      </svg>
    </span>
    {{ $t("menu_button") }}
  </TheButton>
</template>

<script setup>
const isMenuExpanded = inject("isMenuExpanded");

const onMenuButtonClick = () => {
  isMenuExpanded.value = !isMenuExpanded.value;

  if (isMenuExpanded.value) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};
</script>

<style lang="scss">
.menu-button {
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;
  display: none;
  column-gap: 5px;
  color: #fff;

  @media (width <= 600px) {
    display: flex;
  }

  &__icon {
    display: flex;
  }
}
</style>
