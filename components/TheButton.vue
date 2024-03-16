<template>
  <component
    :is="component"
    :to="to"
    class="button"
    :class="variant"
    :target="target"
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
  },
  target: {
    type: String,
  },
});

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

  &:disabled {
    cursor: default;
  }

  &--primary {
    padding: 12px 24px;
    background-color: #9ca3af26;
    color: #fff;
    transition: background-color var(--transition300ms);

    @include hover {
      background-color: #9ca3af33;
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
      background-color: var(--primary-color);
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
