<template>
  <div
    class="switcher"
    role="switch"
    tabindex="0"
    :aria-checked="isChecked"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space.prevent="toggle"
  >
    <span v-if="label" class="switcher__label">
      {{ label }}
    </span>
    <span class="switcher__switch">
      <span />
    </span>
    <span v-show="isChecked" aria-hidden="true">{{ $t("On") }}</span>
    <span v-show="!isChecked" aria-hidden="true">{{ $t("Off") }}</span>
  </div>
</template>

<script setup lang="ts">
type SwitcherProps = {
  label?: string;
};

defineProps<SwitcherProps>();

const isChecked = defineModel({
  type: Boolean,
  default: false,
});

const toggle = (): boolean => (isChecked.value = !isChecked.value);
</script>

<style lang="scss">
.switcher {
  $this: &;
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  width: max-content;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--transition300ms);

  @include hover {
    background-color: var(--palette-black);
  }

  &[aria-checked="true"] {
    #{$this}__switch {
      > span {
        left: 20px;
        background-color: var(--palette-puerto-rico);
      }
    }
  }

  &__switch {
    position: relative;
    width: 40px;
    height: 22px;
    border: 2px solid var(--palette-white);
    border-radius: 12px;

    > span {
      position: absolute;
      top: 50%;
      left: 3px;
      translate: 0 -50%;
      width: 12px;
      height: 12px;
      background-color: var(--palette-white);
      border-radius: 50%;
      transition: left var(--transition300ms);
    }
  }
}
</style>
