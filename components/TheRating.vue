<template>
  <div class="rating" :inert="inert">
    <template v-for="star in stars" :key="star.value">
      <input
        :id="`star_${uid}_${star.value}`"
        :value="star.value"
        v-model="model"
        type="radio"
        class="rating__input visually-hidden"
        v-bind="$attrs"
      />
      <label :for="`star_${uid}_${star.value}`" class="rating__label">
        <span class="visually-hidden"
          >{{ star.value }} {{ $t("star | stars", star.value) }}</span
        >
        <TheIcon icon="star" />
      </label>
    </template>
  </div>
</template>

<script setup>
defineProps({
  inert: {
    type: Boolean,
    default: true,
  },
});

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const stars = ref([
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
]);
const uid = ref(getCurrentInstance().uid);
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.rating {
  $this: &;

  display: flex;
  align-items: center;
  column-gap: 5px;

  &__input {
    &:checked + .rating__label,
    &:focus + .rating__label {
      color: var(--primary-color);
    }
  }

  &__label {
    color: #d4d4d8;
    cursor: pointer;
    transition: color var(--transition300ms);

    svg {
      fill: currentColor;
    }

    &:has(~ .rating__label:hover) {
      color: var(--primary-color);
    }

    &:has(~ .rating__input:checked) {
      color: var(--primary-color);
    }

    @include hover {
      color: var(--primary-color);
    }
  }
}
</style>
