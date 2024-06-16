<template>
  <component
    :is="component"
    :to="to ? localePath(to) : null"
    class="button"
    :class="classObject"
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
    validator: (value) => {
      return ["primary", "secondary", "underline"].includes(value);
    },
  },
  size: {
    type: String,
    validator: (value) => {
      return ["small", "medium", "large"].includes(value);
    },
  },
  pill: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
  },
});

const localePath = useLocalePath();

const button = ref(null);

const variants = ref({
  primary: "button--primary",
  secondary: "button--secondary",
  underline: "button--underline",
});

const sizes = ref({
  small: "button--small",
  medium: "button--medium",
  large: "button--large",
});

const variant = computed(() => {
  return variants.value[props.variant];
});

const size = computed(() => {
  return sizes.value[props.size];
});

const classObject = computed(() => {
  return [variant.value, size.value, { "button--pill": props.pill }];
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
@import "~/src/shared/ui/styles/helpers/mixins/hover.scss";

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

  &--small {
    padding: 3px 6px;
  }

  &--medium {
    padding: 6px 12px;
  }

  &--large {
    padding: 12px 24px;
  }

  &--primary {
    background-color: var(--palette-tuna);
    color: var(--palette-white);
    transition: background-color var(--transition300ms);

    @include hover {
      background-color: var(--palette-topaz);
    }
  }

  &--secondary {
    color: var(--palette-black);
    background-color: var(--palette-white);
    transition: background-color var(--transition300ms),
      color var(--transition300ms);

    @include hover {
      color: var(--palette-white);
      background-color: var(--palette-puerto-rico);
    }
  }

  &--underline {
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

  &--pill {
    border-radius: 12px;
  }
}
</style>
