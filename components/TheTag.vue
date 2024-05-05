<template>
  <p
    class="tag"
    :class="{
      'tag--link': isLink,
    }"
  >
    <slot />
  </p>
</template>

<script setup>
defineProps({
  isLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.tag {
  padding: 6px;
  background-color: var(--palette-white);
  border-radius: 10px;
  color: var(--palette-black);

  &--link {
    padding: 0;
    transition-property: color, background-color;
    transition-duration: var(--transition300ms);
    cursor: pointer;

    > a {
      padding: 6px;
    }

    @include hover {
      background-color: var(--palette-puerto-rico);
      color: var(--palette-white);
    }
  }
}
</style>
