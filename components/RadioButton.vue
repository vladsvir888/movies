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
  column-gap: 5px;

  &__input {
    margin: 0;
    accent-color: var(--primary-color);
  }
}
</style>
