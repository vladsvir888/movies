<template>
  <ClientOnly>
    <div class="input-block" :class="wrapperClass">
      <div class="input-block__wrapper">
        <div
          v-if="$slots['prefix-icon']"
          class="input-block__icon input-block__icon--prefix"
        >
          <slot name="prefix-icon" />
        </div>
        <input
          ref="input"
          v-model="model"
          :type="type"
          :placeholder="placeholder"
          :required="required"
          :minlength="minlength"
          :aria-describedby="`input-${uid}`"
          class="input-block__input"
          v-bind="$attrs"
        />
        <Button
          v-if="clearable && model.length"
          class="input-block__clear"
          :aria-label="$t('Clear entry')"
          type="button"
          @click="clearEntry"
        >
          <Icon icon="close" />
        </Button>
      </div>
      <p
        v-if="error"
        :id="`input-${uid}`"
        class="error input-block__error"
        role="polite"
      >
        {{ error }}
      </p>
    </div>
  </ClientOnly>
</template>

<script setup>
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: null,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: null,
  },
  isNeedValidation: {
    type: Boolean,
    default: false,
  },
  validationMessage: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  minlength: {
    type: String,
    default: null,
  },
});

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({
  type: String,
  required: true,
});

const { t } = useI18n();

const uid = ref(getCurrentInstance().uid);
const input = ref(null);
const error = ref(null);

const clearEntry = () => (model.value = "");

const setError = () => {
  error.value = input.value.validity.valueMissing
    ? t("This is a required field")
    : props.validationMessage;
};

const resetError = () => {
  error.value = null;
};

const isValidInput = () => {
  return input.value.checkValidity();
};

const handleValidation = () => {
  if (!props.isNeedValidation) {
    return;
  }

  if (!isValidInput()) {
    setError();
  } else {
    resetError();
  }
};

watch(model, handleValidation);

defineExpose({
  input,
  setError,
  resetError,
});
</script>

<style lang="scss">
.input-block {
  $this: &;

  &:focus-within {
    #{$this}__wrapper {
      outline: 2px solid var(--palette-puerto-rico);
      border-color: transparent;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    background-color: var(--palette-white);
    border: 1px solid #e0ded7;
    border-radius: 8px;
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

  &__error {
    margin-top: 4px;
  }
}
</style>
