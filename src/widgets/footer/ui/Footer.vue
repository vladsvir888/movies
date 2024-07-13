<template>
  <footer class="footer">
    <div class="container footer__container">
      <Button to="/">
        <NuxtImg
          src="/images/logo.png"
          width="160"
          height="21"
          :alt="$t('Home')"
          loading="lazy"
        />
      </Button>

      <p class="footer__data">
        {{ $t("Data provided by") }}
        <Button to="https://www.themoviedb.org/" target="_blank">
          <Icon icon="tmdb" class="footer__data-icon" />
        </Button>
      </p>

      <LanguageSwitcher />
    </div>
  </footer>
</template>

<script setup>
import LanguageSwitcher from "~/src/entities/language";
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
</script>

<style lang="scss">
.footer {
  padding: 20px 0 20px var(--sidebar-width);
  margin-top: auto;

  @media (--mobile) {
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
