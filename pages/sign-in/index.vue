<template>
  <div class="page page-sign-in">
    <MoleculePageSeoData
      :lang="$t('lang')"
      :title="$t('Login to your account')"
      :description="$t('Login to your account')"
    />
    <div class="container">
      <div class="page-sign-in__wrapper">
        <AtomHeading class="page-sign-in__title" variant="underline">
          {{ $t("Login to your account") }}
        </AtomHeading>
        <div class="page-sign-in__form-wrapper">
          <AtomButton to="https://www.themoviedb.org/" target="_blank">
            <AtomIcon icon="tmdb" />
          </AtomButton>
          <p>
            {{ $t("Please login using your TMDB username and password.") }}
          </p>
          <form
            class="page-sign-in__form"
            :class="{ disabled: authStore.loading }"
            @submit.prevent="onSubmitForm"
          >
            <MoleculeInputBlock
              v-model="state.username"
              :placeholder="$t('Username')"
              class="page-sign-in__form-input"
              required
            />
            <MoleculeInputBlock
              v-model="state.password"
              :placeholder="$t('Password')"
              type="password"
              class="page-sign-in__form-input"
              required
            />
            <AtomButton
              class="page-sign-in__form-submit"
              variant="secondary"
              size="large"
              :pill="true"
            >
              {{ $t("Sign In") }}
            </AtomButton>
          </form>
          <AtomLoader
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
definePageMeta({
  middleware: "auth",
});

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
