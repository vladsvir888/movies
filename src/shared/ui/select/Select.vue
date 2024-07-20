<template>
  <ClientOnly>
    <div class="select-block" :class="wrapperClass">
      <label v-if="label" :for="`${id}-${uid}`" class="select-block__label">{{
        label
      }}</label>
      <div class="select-block__select-wrapper">
        <select
          v-model="model"
          :id="`${id}-${uid}`"
          :name="name"
          class="select-block__select"
          v-bind="$attrs"
        >
          <option disabled value="">{{ $t("Please select one") }}</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            class="select-block__option"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
defineProps({
  wrapperClass: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({
  required: true,
});

const uid = ref(getCurrentInstance().uid);
</script>

<style lang="scss">
.select-block {
  display: flex;
  align-items: center;
  column-gap: 10px;

  &__select-wrapper {
    display: grid;
    grid-template-areas: "select";
    align-items: center;

    &::after {
      grid-area: select;
      justify-self: end;
      width: 10px;
      height: 7px;
      margin-right: 6px;
      background-color: var(--palette-white);
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      pointer-events: none;
      content: "";
    }
  }

  &__select {
    grid-area: select;
    padding: 5px;
    background-color: var(--palette-black);
    border-radius: 8px;
    color: var(--palette-white);
    font-family: inherit;
    cursor: pointer;
    appearance: none;
    transition: border-color var(--transition300ms);

    @include hover {
      border-color: var(--palette-puerto-rico);
    }
  }
}
</style>
