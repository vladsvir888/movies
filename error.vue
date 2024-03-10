<template>
  <div class="page error-page">
    <PageSeoData
      :lang="$t('lang')"
      :title="$t('error_page.seo.title')"
      :description="$t('error_page.seo.meta.description')"
    />
    <div class="error-page__content">
      <h1 class="error-page__title">{{ $t("error_page.title") }}</h1>
      <p class="error-page__text">
        {{ $t("error_page.text") }}
      </p>
      <TheButton to="/" class="error-page__button" variant="primary">
        {{ $t("error_page.back_button") }}
      </TheButton>
    </div>
  </div>
</template>

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
