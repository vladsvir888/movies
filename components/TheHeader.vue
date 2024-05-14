<template>
  <header class="header">
    <div class="container header__container">
      <TheButton to="/">
        <NuxtImg
          src="/images/logo.png"
          width="160"
          height="21"
          :alt="$t('Home')"
          loading="lazy"
        />
      </TheButton>

      <div class="header__language-switcher">
        <LanguageSwitcher />
      </div>

      <TheButton
        class="header__burger"
        :aria-expanded="isMenuVisible"
        aria-controls="sidebar"
        @click="isMenuVisible = true"
      >
        <span class="header__burger-icon">
          <TheIcon icon="menu" />
        </span>
        <span class="header__burger-text">{{ $t("Menu") }}</span>
      </TheButton>
    </div>
  </header>
</template>

<script setup>
const isMenuVisible = defineModel("isMenuVisible");
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  min-height: var(--header-height);
  width: 100%;
  padding: 10px 0 10px var(--sidebar-width);
  background-color: var(--palette-black);

  @media (width <= 600px) {
    padding-left: 0;
  }

  &__container {
    display: grid;
    grid-template-columns: max-content auto max-content;
  }

  &__language-switcher {
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;

    .select-block {
      &__label {
        @media (width <= 600px) {
          display: none;
        }
      }
    }
  }

  &__burger {
    display: none;
    column-gap: 5px;
    margin-left: 10px;

    @media (width <= 600px) {
      display: flex;
    }

    &-icon {
      display: flex;
    }

    &-text {
      @media (width <= 375px) {
        display: none;
      }
    }
  }
}
</style>
