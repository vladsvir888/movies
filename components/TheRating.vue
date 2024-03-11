<template>
  <div class="rating" :inert="inert">
    <template v-for="star in stars" :key="star.value">
      <input
        :id="`star${star.value}`"
        :value="star.value"
        v-model="model"
        type="radio"
        class="rating__input visually-hidden"
      />
      <label :for="`star${star.value}`" class="rating__label">
        <span class="visually-hidden"
          >{{ star.value }} {{ $t("stars", star.value) }}</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="20"
          height="20"
        >
          <path
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          />
        </svg>
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

    > svg {
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
