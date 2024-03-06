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
      <TheIcon icon="tmdb" class="footer__data-icon" />
    </p>
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 60px;
  margin-top: auto;

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
    column-gap: 6px;

    &-icon {
      margin-bottom: -5px;

      svg {
        width: 120px;
        height: 16px;
      }
    }
  }
}
</style>
