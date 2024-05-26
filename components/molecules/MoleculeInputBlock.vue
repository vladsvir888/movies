<template>
  <div class="input-block" :class="wrapperClass">
    <div class="input-block__wrapper">
      <div
        v-if="$slots['prefix-icon']"
        class="input-block__icon input-block__icon--prefix"
      >
        <slot name="prefix-icon" />
      </div>
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="input-block__input"
        v-bind="$attrs"
      />
      <AtomButton
        v-if="clearable && model.length"
        @click="clearEntry"
        class="input-block__clear"
        :aria-label="$t('Clear entry')"
        type="button"
      >
        <AtomIcon icon="close" />
      </AtomButton>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
  },
});

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({
  required: true,
});

const clearEntry = () => (model.value = "");
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.input-block {
  $this: &;

  background-color: var(--palette-white);
  border: 1px solid #e0ded7;
  border-radius: 8px;

  &:focus-within {
    outline: 2px solid var(--palette-puerto-rico);
    border-color: transparent;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__input {
    height: 50px;
    padding: 0;
    margin: 0 10px;
    flex: 1 0 auto;
    border: none;
    font: inherit;
    color: var(--palette-black);

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-weight: 400;
      color: inherit;
    }
  }

  &__icon {
    display: flex;

    &--prefix {
      margin-left: 10px;
    }
  }

  &__clear {
    margin-right: 10px;
    transition: color var(--transition300ms);

    @include hover {
      color: var(--palette-puerto-rico);
    }
  }
}
</style>
