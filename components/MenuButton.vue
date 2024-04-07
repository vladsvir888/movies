<template>
  <TheButton
    class="menu-button"
    :aria-expanded="isMenuExpanded"
    aria-controls="sidebar"
    @click="isMenuExpanded = !isMenuExpanded"
  >
    <span
      :hidden="isMenuExpanded"
      class="menu-button__icon menu-button__icon--menu"
    >
      <TheIcon icon="menu" />
    </span>
    <span
      :hidden="!isMenuExpanded"
      class="menu-button__icon menu-button__icon--close"
    >
      <TheIcon icon="close" />
    </span>
    {{ $t("menu_button") }}
  </TheButton>
</template>

<script setup>
const isMenuExpanded = defineModel("isMenuExpanded", {
  required: true,
  default: false,
});
</script>

<style lang="scss">
.menu-button {
  position: absolute;
  z-index: 4;
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
