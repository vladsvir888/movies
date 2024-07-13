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
          v-if="preparedMediaType"
          variant="primary"
          size="small"
          :pill="true"
          class="header__search-button"
          @click="isSearchDialogVisible = true"
        >
          {{ preparedMediaType }}
        </Button>

        <SignOutButton class="header__sign-out" />

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
import { useAuthStore } from "~/src/entities/user";
import { useRouteParam } from "~/src/shared/lib/use";
import { MEDIA_TYPES } from "~/src/entities/media";
import { SignOutButton } from "~/src/features/auth";

const isMenuVisible = defineModel("isMenuVisible");
const isSearchDialogVisible = defineModel("isSearchDialogVisible");

const mediaType = useRouteParam("type");
const authStore = useAuthStore();
const { t } = useI18n();

const preparedMediaType = computed(() => {
  if (mediaType.value === MEDIA_TYPES[0]) {
    return `${t("Search")} by ${t("Movies")}`;
  } else if (mediaType.value === MEDIA_TYPES[1]) {
    return `${t("Search")} by ${t("TV Shows")}`;
  }

  return "";
});
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

  @media (--mobile) {
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
      @media (--mobile) {
        width: 110px;
      }
    }
  }

  &__language-switcher {
    .select-block {
      &__label {
        @media (--tablet) {
          display: none;
        }
      }
    }
  }

  &__burger {
    display: none;
    column-gap: 5px;

    @media (--mobile) {
      display: flex;
    }

    &-icon {
      display: flex;
    }

    &-text {
      @media (--mobile) {
        display: none;
      }
    }
  }

  &__search-button,
  &__sign-out {
    @media (--mobile) {
      display: none;
    }
  }
}
</style>
