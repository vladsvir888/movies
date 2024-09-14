<template>
  <div class="rating" :inert="inert">
    <template v-for="star in stars" :key="star.value">
      <input
        :id="`star-${uid}-${star.value}`"
        v-model="model"
        :value="star.value"
        type="radio"
        class="rating__input visually-hidden"
        v-bind="$attrs"
      />
      <label :for="`star-${uid}-${star.value}`" class="rating__label">
        <span class="visually-hidden"
          >{{ star.value }} {{ $t("star | stars", star.value) }}</span
        >
        <Icon icon="star" />
      </label>
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/src/shared/ui/icon";

type RatingProps = {
  inert?: boolean;
};

withDefaults(defineProps<RatingProps>(), {
  inert: true,
});

const model = defineModel({
  type: Number,
  required: true,
});

const stars = ref([
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
]);

const uid = useId(); // https://github.com/nuxt/nuxt/issues/25755
</script>

<style lang="scss">
.rating {
  $this: &;

  display: flex;
  align-items: center;
  column-gap: 5px;

  &__input {
    &:checked + .rating__label,
    &:focus + .rating__label {
      color: var(--palette-puerto-rico);
    }
  }

  &__label {
    color: var(--palette-iron);
    cursor: pointer;
    transition: color var(--transition300ms);

    svg {
      fill: currentColor;
    }

    &:has(~ .rating__label:hover) {
      color: var(--palette-puerto-rico);
    }

    &:has(~ .rating__input:checked) {
      color: var(--palette-puerto-rico);
    }

    @include hover {
      color: var(--palette-puerto-rico);
    }
  }
}
</style>
