<template>
  <component :is="heading" class="heading" :class="classObject">
    <slot />
  </component>
</template>

<script setup lang="ts">
type HeadingVariants = "underline";

type HeadingProps = {
  level?: number;
  variant?: HeadingVariants;
};

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 1,
  variant: undefined,
});

const heading = computed(() => `h${props.level}`);

const variants = ref({
  underline: "heading--underline",
} as const);

const variant = computed(() => {
  if (props.variant) {
    return variants.value[props.variant];
  }

  return undefined;
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
