<template>
  <footer class="footer">
    <div class="container footer__container">
      <AtomButton to="/">
        <NuxtImg
          src="/images/logo.png"
          width="160"
          height="21"
          :alt="$t('Home')"
          loading="lazy"
        />
      </AtomButton>

      <p class="footer__data">
        {{ $t("Data provided by") }}
        <AtomButton to="https://www.themoviedb.org/" target="_blank">
          <AtomIcon icon="tmdb" class="footer__data-icon" />
        </AtomButton>
      </p>

      <AtomLanguageSwitcher />
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
