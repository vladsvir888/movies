<template>
  <div class="page page-sign-in">
    <PageSeoData
      :title="$t('Login to your account')"
      :description="$t('Login to your account')"
    />
    <div class="container">
      <div class="page-sign-in__wrapper">
        <Heading class="page-sign-in__title" variant="underline">
          {{ $t("Login to your account") }}
        </Heading>
        <div class="page-sign-in__form-wrapper">
          <Button to="https://www.themoviedb.org/" target="_blank">
            <Icon icon="tmdb" />
          </Button>
          <p>
            {{ $t("Please login using your TMDB username and password.") }}
          </p>
          <form
            class="page-sign-in__form"
            :class="{ disabled: authStore.loading }"
            @submit.prevent="onSubmitForm"
          >
            <InputBlock
              v-model="state.username"
              :placeholder="$t('Username')"
              class="page-sign-in__form-input"
              required
            />
            <InputBlock
              v-model="state.password"
              :placeholder="$t('Password')"
              type="password"
              class="page-sign-in__form-input"
              required
            />
            <Button
              class="page-sign-in__form-submit"
              variant="secondary"
              size="large"
              :pill="true"
            >
              {{ $t("Sign In") }}
            </Button>
          </form>
          <BaseLoader
            v-if="authStore.loading"
            class="page-sign-in__form-loader"
          />
          <p v-if="authStore.error" class="error">
            {{ authStore.error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputBlock from "~/src/shared/ui/input-block";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { BaseLoader } from "~/src/shared/ui/loaders";

const authStore = useAuth();

const state = ref({
  username: "",
  password: "",
});

const onSubmitForm = async () => {
  await authStore.auth(state);

  state.value.username = "";
  state.value.password = "";
};

onMounted(() => {
  authStore.error = "";
});
</script>

<style lang="scss">
.page-sign-in {
  padding: var(--header-margin) 0 20px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
  }

  &__form-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: flex-start;
    max-width: 550px;
    width: 100%;
    padding: 20px;
    background-color: var(--palette-black);
    border: 1px solid var(--palette-topaz);
    border-radius: 8px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;

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
