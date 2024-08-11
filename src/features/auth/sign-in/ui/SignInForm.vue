<template>
  <div class="sign-in-block">
    <form
      ref="form"
      class="sign-in-block__form"
      :class="{ disabled: authStore.loading }"
      novalidate
      @submit.prevent="onSubmitForm"
    >
      <InputBlock
        ref="usernameInput"
        v-model="state.username"
        :placeholder="$t('Username')"
        :is-need-validation="true"
        class="sign-in-block__form-input"
        required
      />
      <InputBlock
        ref="passwordInput"
        v-model="state.password"
        :placeholder="$t('Password')"
        :is-need-validation="true"
        :validation-message="$t(passwordErrorMessage)"
        :minlength="4"
        type="password"
        class="sign-in-block__form-input"
        required
      />
      <Button
        class="sign-in-block__form-submit"
        variant="secondary"
        size="large"
        :pill="true"
      >
        {{ $t("Sign In") }}
      </Button>
    </form>
    <BaseLoader v-if="authStore.loading" class="sign-in-block__form-loader" />
  </div>
</template>

<script setup>
import InputBlock from "~/src/shared/ui/input-block";
import Button from "~/src/shared/ui/button";
import { BaseLoader } from "~/src/shared/ui/loaders";
import { useAuthStore, passwordErrorMessage } from "~/src/entities/user";

const authStore = useAuthStore();

const state = ref({
  username: "",
  password: "",
});

const form = ref(null);
const usernameInput = ref(null);
const passwordInput = ref(null);

const onSubmitForm = async () => {
  const inputs = [usernameInput.value, passwordInput.value];

  if (!form.value.checkValidity()) {
    inputs.forEach((el) => {
      if (el.input.value) {
        return;
      }

      el.setError();
    });

    return;
  }

  inputs.forEach((el) => el.resetError());

  await authStore.auth(state);

  state.value.username = "";
  state.value.password = "";
};
</script>

<style lang="scss">
.sign-in-block {
  display: grid;
  row-gap: 16px;
  width: 100%;

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    &-submit {
      align-self: flex-start;
    }

    &-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
