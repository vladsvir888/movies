<template>
  <div class="tooltip" :class="position">
    <slot />
    <div :id="id" class="tooltip__text" role="tooltip">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  placement: {
    type: String,
    default: "right",
  },
  id: {
    type: String,
  },
});

const positions = ref({
  top: "tooltip--top",
  right: "tooltip--right",
  bottom: "tooltip--bottom",
  left: "tooltip--left",
});

const position = computed(() => {
  return positions.value[props.placement];
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.tooltip {
  $this: &;

  position: relative;
  display: flex;

  @include hover {
    #{$this}__text {
      opacity: 1;
      visibility: visible;
    }
  }

  &--right {
    #{$this}__text {
      top: 50%;
      left: calc(100% + 10px);
      translate: 0 -50%;
    }
  }

  &--top {
    #{$this}__text {
      top: calc(-100% - 5px);
      left: 50%;
      translate: -50% 0;
    }
  }

  &--bottom {
    #{$this}__text {
      top: calc(100% + 10px);
      left: 50%;
      translate: -50% 0;
    }
  }

  &--left {
    #{$this}__text {
      top: 50%;
      right: calc(100% + 10px);
      translate: 0 -50%;
    }
  }

  &__text {
    position: absolute;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 4px;
    color: #000;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition300ms);
  }
}
</style>
