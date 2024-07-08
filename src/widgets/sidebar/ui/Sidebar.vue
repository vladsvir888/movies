<template>
  <div
    ref="sidebar"
    class="sidebar"
    :class="{ expanded: isMenuVisible }"
    @keydown.esc="closeMenu"
  >
    <aside id="sidebar" class="sidebar__aside">
      <nav class="sidebar__nav">
        <template v-for="link in links" :key="link.value">
          <Button
            v-if="!link.dropdown && !link.auth"
            :to="link.to"
            :title="link.value"
            class="sidebar__link"
            v-on="link.handlers ?? {}"
          >
            <Icon :icon="link.icon" />
            <span class="sidebar__link-text"> {{ link.value }}</span>
          </Button>

          <Dropdown
            v-else-if="!link.auth"
            :selected-item="dropdownSelectedItem"
            @update:selected-item="onUpdateSelectedItem"
            toggle-class="sidebar__link"
            :toggle-title-attr="link.value"
            :items="link.dropdown.items"
          >
            <template #toggle>
              <Icon :icon="link.icon" />
              <span class="sidebar__link-text">{{ link.value }}</span>
            </template>
          </Dropdown>
        </template>

        <Button
          v-if="preparedMediaType"
          variant="primary"
          size="small"
          :pill="true"
          class="sidebar__search-button"
          @click="onClickSearchButton"
        >
          {{ preparedMediaType }}
        </Button>

        <Button
          v-if="authStore.sessionId"
          variant="primary"
          size="small"
          :pill="true"
          class="sidebar__sign-out"
          @click="authStore.logout()"
        >
          {{ $t("Sign out") }}
        </Button>
      </nav>
    </aside>
    <div class="sidebar__overlay" tabindex="-1" @click="closeMenu"></div>
  </div>
</template>

<script setup>
import Dropdown from "~/src/shared/ui/dropdown";
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { toggleScrollbar } from "~/src/shared/lib/dom";
import { useFocusTrap, useRouteParam } from "~/src/shared/lib/use";
import { useAuthStore } from "~/src/features/auth";
import { MEDIA_TYPES } from "~/src/entities/media";

const sidebar = ref(null);
const dropdownSelectedItem = ref(null);

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const authStore = useAuthStore();
const { activate, deactivate } = useFocusTrap(sidebar, {
  fallbackFocus: ".sidebar__overlay",
});
const mediaType = useRouteParam("type");

const isSearchDialogVisible = defineModel("isSearchDialogVisible");
const isMenuVisible = defineModel("isMenuVisible");

const links = computed(() => {
  return [
    {
      to: "/",
      value: t("Home"),
      icon: "home",
    },
    {
      to: "/movie",
      value: t("Movies"),
      icon: "movie",
    },
    {
      to: "/tv",
      value: t("TV Shows"),
      icon: "tv",
    },
    {
      dropdown: {
        items: [
          {
            text: t("Movies"),
            value: "movie",
          },
          {
            text: t("TV Shows"),
            value: "tv",
          },
        ],
      },
      value: t("Discover"),
      icon: "filter",
    },
    {
      auth: authStore.sessionId,
      to: "/sign-in",
      value: t("Sign In"),
      icon: "right-to-bracket",
    },
  ];
});

const preparedMediaType = computed(() => {
  if (mediaType.value === MEDIA_TYPES[0]) {
    return `${t("Search")} by ${t("Movies")}`;
  } else if (mediaType.value === MEDIA_TYPES[1]) {
    return `${t("Search")} by ${t("TV Shows")}`;
  }

  return "";
});

const onClickSearchButton = () => {
  console.log(1);
  isSearchDialogVisible.value = true;
  isMenuVisible.value = false;
  deactivate();
};

const closeMenu = () => {
  isMenuVisible.value = false;
  toggleScrollbar(false);
  deactivate();
};

const onUpdateSelectedItem = async ($event) => {
  dropdownSelectedItem.value = $event;
  await navigateTo(localePath(`/discover/${$event}`));
};

watch(() => route.path, closeMenu);

watch(isMenuVisible, (newValue) => {
  if (isSearchDialogVisible.value) {
    return;
  }

  if (newValue) {
    activate();
  } else {
    deactivate();
  }

  toggleScrollbar(newValue);
});
</script>

<style lang="scss">
@import "~/src/shared/ui/styles/helpers/mixins/hover.scss";

.sidebar {
  $this: &;

  &.expanded {
    #{$this} {
      &__aside {
        visibility: visible;
        translate: 0 0;
      }

      &__overlay {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &__aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: var(--sidebar-width);
    padding: 10px;
    background-color: var(--palette-black);
    transition: all var(--transition300ms);

    @media (width <= 600px) {
      visibility: hidden;
      translate: -100% 0;
      width: 60vw;
    }
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 3;
    background-color: rgb(var(--palette-black--rgb) / 50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition300ms);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 70px;

    @media (width <= 600px) {
      row-gap: 50px;
      text-align: center;
    }
  }

  &__link {
    transition: color var(--transition300ms);
    outline: none;

    @media (width <= 600px) {
      column-gap: 12px;
    }

    @include hover {
      color: var(--palette-puerto-rico);
    }

    svg {
      width: 25px;
      height: 25px;
      fill: currentColor;
      pointer-events: none;
    }

    &[aria-current="page"] {
      color: var(--palette-puerto-rico);
    }

    &:focus-visible {
      color: var(--palette-puerto-rico);
    }

    &-text {
      display: none;

      @media (width <= 600px) {
        display: block;
      }
    }
  }

  &__search-button,
  &__sign-out {
    display: none;

    @media (width <= 600px) {
      display: block;
    }
  }
}
</style>
