<template>
  <header class="header">
    <div class="container header__container">
      <Button to="/" class="header__logo">
        <NuxtImg
          src="/images/logo.png"
          width="160"
          height="21"
          :alt="$t('Home')"
          loading="lazy"
          class="header__logo-img"
        />
      </Button>

      <div class="header__wrapper">
        <div class="header__language-switcher">
          <LanguageSwitcher />
        </div>

        <Button
          v-if="authStore.sessionId"
          variant="primary"
          size="small"
          :pill="true"
          class="header__sign-out"
          @click="authStore.logout()"
        >
          {{ $t("Sign out") }}
        </Button>

        <Button
          class="header__burger"
          :aria-expanded="isMenuVisible"
          aria-controls="sidebar"
          @click="isMenuVisible = true"
        >
          <span class="header__burger-icon">
            <Icon icon="menu" />
          </span>
          <span class="header__burger-text">{{ $t("Menu") }}</span>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from "~/src/entities/language";
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { useAuthStore } from "~/src/features/auth";

const isMenuVisible = defineModel("isMenuVisible");

const authStore = useAuthStore();
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
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  &__logo {
    &-img {
      @media (width <= 375px) {
        width: 110px;
      }
    }
  }

  &__language-switcher {
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
