<template>
  <div class="radio-button">
    <input
      v-model="model"
      :id="id"
      :name="name"
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
  },
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const model = defineModel({
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
