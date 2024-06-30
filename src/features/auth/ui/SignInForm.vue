<template>
  <div class="sign-in-block">
    <form
      class="sign-in-block__form"
      :class="{ disabled: authStore.loading }"
      @submit.prevent="onSubmitForm"
    >
      <InputBlock
        v-model="state.username"
        :placeholder="$t('Username')"
        class="sign-in-block__form-input"
        required
      />
      <InputBlock
        v-model="state.password"
        :placeholder="$t('Password')"
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
    <p v-if="authStore.error" class="error">
      {{ authStore.error }}
    </p>
  </div>
</template>

<script setup>
import InputBlock from "~/src/shared/ui/input-block";
import { BaseLoader } from "~/src/shared/ui/loaders";
import { useAuthStore } from "../model/useAuth.js";
import Button from "~/src/shared/ui/button";

const authStore = useAuthStore();

const state = ref({
  username: "",
  password: "",
});

const onSubmitForm = async () => {
  await authStore.auth(state);

  state.value.username = "";
  state.value.password = "";
};

onMounted(authStore.resetError);
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
