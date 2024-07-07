<template>
  <div class="page error-page">
    <PageSeoData
      :title="$t('This page could not be found')"
      :description="$t('This page could not be found')"
    />
    <div class="error-page__content">
      <Heading class="error-page__title">
        {{ $t("This page could not be found") }}
      </Heading>
      <p class="error-page__text">
        {{
          $t(
            "Looks like you've followed a broken link or entered a URL that doesn't exist on this site."
          )
        }}
      </p>
      <Button
        class="error-page__button"
        variant="primary"
        size="large"
        @click="() => clearError({ redirect: '/' })"
      >
        {{ $t("Go Home") }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
</script>

<style lang="scss">
.error-page {
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;

  &__content {
    display: grid;
    row-gap: 20px;
  }

  &__text {
    opacity: 0.5;
  }

  &__button {
    justify-self: center;
  }
}
</style>
