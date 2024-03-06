<template>
  <div class="page error-page">
    <PageSeoData
      title="This page could not be found"
      description="This page could not be found"
    />
    <div class="error-page__content">
      <h1 class="error-page__title">This page could not be found</h1>
      <p class="error-page__text">
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <TheButton
        to="/"
        class="error-page__button"
        variant="primary"
        label="Go back"
      />
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
