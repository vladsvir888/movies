<template>
  <component
    :is="component"
    ref="button"
    :to="to ? localePath(to) : null"
    class="button"
    :class="classObject"
    :target="target"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { DefineComponent } from "vue";
import type { NuxtLinkProps } from "#app";

type ButtonVariants = "primary" | "secondary" | "underline";
type ButtonSizes = "small" | "medium" | "large";

type ButtonProps = {
  to?: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  pill?: boolean;
  target?: string;
};

const props = defineProps<ButtonProps>();

const localePath = useLocalePath();

const button = ref<HTMLButtonElement | DefineComponent<NuxtLinkProps> | null>(
  null,
);

const variants = ref({
  primary: "button--primary",
  secondary: "button--secondary",
  underline: "button--underline",
} as const);

const sizes = ref({
  small: "button--small",
  medium: "button--medium",
  large: "button--large",
} as const);

const variant = computed(() => {
  if (props.variant) {
    return variants.value[props.variant];
  }

  return undefined;
});

const size = computed(() => {
  if (props.size) {
    return sizes.value[props.size];
  }

  return undefined;
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
    transition:
      background-color var(--transition300ms),
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
