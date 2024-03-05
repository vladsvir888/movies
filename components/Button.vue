<template>
  <component
    :is="component"
    :to="to"
    class="button"
    :class="variant"
    :target="target"
  >
    <slot name="left-icon" />
    <span class="button__text">
      <slot />
    </span>
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

  &--primary {
    padding: 12px 24px;
    background-color: #9ca3af26;
    color: #fff;
    transition: background-color var(--transition300ms);

    @include hover {
      background-color: #9ca3af33;
    }
  }
}
</style>
