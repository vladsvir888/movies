<template>
  <div class="page error-page">
    <MoleculePageSeoData
      :lang="$t('lang')"
      :title="$t('This page could not be found')"
      :description="$t('This page could not be found')"
    />
    <div class="error-page__content">
      <AtomHeading class="error-page__title">
        {{ $t("This page could not be found") }}
      </AtomHeading>
      <p class="error-page__text">
        {{
          $t(
            "Looks like you've followed a broken link or entered a URL that doesn't exist on this site."
          )
        }}
      </p>
      <AtomButton
        class="error-page__button"
        variant="primary"
        size="large"
        @click="handleError"
      >
        {{ $t("Go Home") }}
      </AtomButton>
    </div>
  </div>
</template>

<script setup>
const handleError = () => clearError({ redirect: "/" });
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
