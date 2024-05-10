<template>
  <component
    :is="component"
    :to="localePath(to)"
    class="button"
    :class="variant"
    :target="target"
    ref="button"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
  },
  variant: {
    type: String,
    validator: (value) => ["primary", "decoration"].includes(value),
  },
  target: {
    type: String,
  },
});

const localePath = useLocalePath();

const button = ref(null);

const variants = ref({
  primary: "button--primary",
  decoration: "button--decoration",
});

const variant = computed(() => {
  return variants.value[props.variant];
});

const component = computed(() => {
  if (props.to || props.target) {
    return defineNuxtLink({});
  }

  return "button";
});

defineExpose({
  button,
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: currentColor;

  &:disabled {
    cursor: default;
  }

  &--primary {
    padding: 12px 24px;
    background-color: var(--palette-tuna);
    color: var(--palette-white);
    transition: background-color var(--transition300ms);

    @include hover {
      background-color: var(--palette-topaz);
    }
  }

  &--decoration {
    position: relative;

    &::before {
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--palette-puerto-rico);
      content: "";
      transition: width var(--transition300ms);
    }

    @include hover {
      &::before {
        width: 100%;
      }
    }
  }
}
</style>
