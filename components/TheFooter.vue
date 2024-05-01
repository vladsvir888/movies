<template>
  <footer class="footer">
    <div class="container footer__container">
      <p class="footer__logo">
        <NuxtImg
          src="/images/movies-sm.webp"
          width="25"
          height="25"
          alt=""
          loading="lazy"
        />
        {{ $t("Movies") }}
      </p>

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
  padding: 20px 0;
  margin-top: auto;

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  &__logo {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-weight: 700;

    &-icon {
      color: var(--palette-white);

      svg {
        width: 25px;
        height: 25px;
        fill: currentColor;
      }
    }
  }

  &__data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;

    &-icon {
      svg {
        width: 120px;
        height: 16px;
      }
    }
  }
}
</style>
