<template>
  <div class="radio-button">
    <input
      :id="id"
      v-model="model"
      :value="value"
      type="radio"
      class="radio-button__input"
    />
    <label v-if="label" :for="id" class="radio-button__label">{{
      label
    }}</label>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const model = defineModel({
  type: String,
  required: true,
});
</script>

<style lang="scss">
.radio-button {
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 4px;
  transition: background-color var(--transition300ms);

  @include hover {
    background-color: var(--palette-black);
  }

  &__input {
    margin: 8px 0 8px 8px;
    accent-color: var(--palette-puerto-rico);
  }

  &__label {
    padding: 8px;
  }

  &__input,
  &__label {
    cursor: pointer;
  }
}
</style>
