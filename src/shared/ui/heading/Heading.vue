<template>
  <component :is="heading" class="heading" :class="classObject">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
  variant: {
    type: String,
    validator: (value) => ["underline"].includes(value),
  },
});

const heading = computed(() => `h${props.level}`);

const variants = ref({
  underline: "heading--underline",
});

const variant = computed(() => {
  return variants.value[props.variant];
});

const classObject = computed(() => {
  return [variant.value];
});
</script>

<style lang="scss">
.heading {
  &--underline {
    position: relative;
    padding-bottom: 8px;

    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 60px;
      height: 2px;
      background-color: var(--palette-puerto-rico);
      content: "";
    }
  }
}
</style>
