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
          <SignInForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { SignInForm } from "~/src/features/auth";
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
}
</style>
