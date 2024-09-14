<template>
  <div class="page error-page">
    <PageSeoData
      :title="$t('This page could not be found')"
      :description="$t('This page could not be found')"
    />
    <div class="error-page__content">
      <Heading class="error-page__title">
        {{ error?.statusCode || 404 }}
      </Heading>
      <p class="error-page__text">
        {{ $t("This page could not be found") }}
      </p>
      <Button
        class="error-page__button"
        variant="primary"
        size="large"
        :pill="true"
        @click="() => clearError({ redirect: '/' })"
      >
        {{ $t("Go Home") }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import PageSeoData from "~/src/shared/ui/page-seo-data";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";

defineProps<{
  error?: NuxtError;
}>();
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
    row-gap: 5px;
  }

  &__text {
    opacity: 0.5;
    margin-bottom: 20px;
  }

  &__button {
    justify-self: center;
  }
}
</style>
