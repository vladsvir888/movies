<template>
  <div class="select-block">
    <label v-if="label" :for="preparedId" class="select-block__label">{{
      label
    }}</label>
    <div class="select-block__select-wrapper">
      <select :id="preparedId" v-model="model" class="select-block__select">
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
</template>

<script setup lang="ts">
type SelectOption = {
  value: string;
  text: string;
};

type SelectProps = {
  label?: string;
  options: SelectOption[];
};

const props = defineProps<SelectProps>();

const model = defineModel({
  type: String,
  required: true,
});

const uid = useId();

const preparedId = computed(() => {
  return props.label ? uid : undefined;
});
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
