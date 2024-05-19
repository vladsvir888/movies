<template>
  <footer class="footer">
    <div class="container footer__container">
      <TheButton to="/">
        <NuxtImg
          src="/images/logo.png"
          width="160"
          height="21"
          :alt="$t('Home')"
          loading="lazy"
        />
      </TheButton>

      <p class="footer__data">
        {{ $t("Data provided by") }}
        <TheButton to="https://www.themoviedb.org/" target="_blank">
          <TheIcon icon="tmdb" class="footer__data-icon" />
        </TheButton>
      </p>

      <LanguageSwitcher />
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  padding: 20px 0 20px var(--sidebar-width);
  margin-top: auto;

  @media (width <= 600px) {
    padding: 20px 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 15px;
  }

  &__data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
}
</style>
