<template>
  <footer class="footer">
    <p class="footer__logo">
      <NuxtImg
        src="/images/movies-sm.webp"
        width="25"
        height="25"
        alt=""
        loading="lazy"
      />
      {{ $t("footer.logo") }}
    </p>

    <p class="footer__data">
      {{ $t("footer.data") }}
      <TheButton to="https://www.themoviedb.org/" target="_blank">
        <TheIcon icon="tmdb" class="footer__data-icon" />
      </TheButton>
    </p>

    <LanguageSwitcher />
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 60px;
  margin-top: auto;

  @media (width <= 600px) {
    padding: 20px;
  }

  &__logo {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-weight: 700;

    &-icon {
      color: #fff;

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
