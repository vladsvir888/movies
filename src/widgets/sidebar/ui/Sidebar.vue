<template>
  <div
    ref="sidebar"
    class="sidebar"
    :class="{ expanded: isMenuVisible }"
    @keydown.esc="closeMenu"
  >
    <aside id="sidebar" class="sidebar__aside">
      <div class="sidebar__aside-wrapper">
        <nav class="sidebar__nav">
          <template v-for="link in links" :key="link.value">
            <Button
              v-if="!link.dropdown && !link.auth"
              :to="link.to"
              :title="link.value"
              class="sidebar__link"
            >
              <Icon :icon="link.icon" />
              <span class="sidebar__link-text"> {{ link.value }}</span>
            </Button>

            <Dropdown
              v-else-if="link.dropdown && !link.auth"
              toggle-class="sidebar__link"
              :toggle-title-attr="link.value"
              :items="link.dropdown.items"
              @update:selected-item="onUpdateSelectedItem"
            >
              <template #toggle>
                <Icon :icon="link.icon" />
                <span class="sidebar__link-text">{{ link.value }}</span>
              </template>
            </Dropdown>
          </template>
        </nav>
        <div class="sidebar__buttons">
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
        </div>
      </div>
      <Button
        class="sidebar__close"
        :aria-label="$t('Close')"
        @click="closeMenu"
      >
        <Icon icon="close" />
      </Button>
    </aside>
    <div class="sidebar__fallback-focus" />
  </div>
</template>

<script setup lang="ts">
import Dropdown from "~/src/shared/ui/dropdown";
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { toggleScrollbar } from "~/src/shared/lib/dom";
import { useFocusTrap, useRouteParam } from "~/src/shared/lib/use";
import { useAuthStore } from "~/src/entities/user";
import { MEDIA_TYPES } from "~/src/entities/media";
import type { MediaTypes } from "~/src/shared/config";
import type { DropdownMenuItem } from "~/src/shared/ui/dropdown";

type LinksItem = {
  to?: string;
  value: string;
  icon: MediaTypes | "home" | "filter" | "right-to-bracket";
  auth?: string;
  dropdown?: {
    items: DropdownMenuItem[];
  };
};

const sidebar = ref<HTMLDivElement | null>(null);

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const authStore = useAuthStore();
const { activate, deactivate } = useFocusTrap(sidebar, {
  fallbackFocus: ".sidebar__fallback-focus",
});
const mediaType = useRouteParam("type");

const isSearchDialogVisible = defineModel("isSearchDialogVisible", {
  type: Boolean,
  default: false,
});
const isMenuVisible = defineModel("isMenuVisible", {
  type: Boolean,
  default: false,
});

const links = computed<LinksItem[]>(() => [
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
]);

const preparedMediaType = computed(() => {
  if (mediaType.value === MEDIA_TYPES[0]) {
    return `${t("Search")} by ${t("Movies")}`;
  } else if (mediaType.value === MEDIA_TYPES[1]) {
    return `${t("Search")} by ${t("TV Shows")}`;
  }

  return undefined;
});

const onClickSearchButton = (): void => {
  isSearchDialogVisible.value = true;
  isMenuVisible.value = false;
  deactivate();
};

const closeMenu = (): void => {
  isMenuVisible.value = false;
  toggleScrollbar(false);
  deactivate();
};

const onUpdateSelectedItem = async ($event: string): Promise<void> => {
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
.sidebar {
  $this: &;

  &.expanded {
    #{$this} {
      &__aside {
        visibility: visible;
        translate: 0 0;
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

    @media (--mobile) {
      visibility: hidden;
      translate: -100% 0;
      width: 100vw;
      align-items: unset;
      justify-content: unset;
    }
  }

  &__aside-wrapper {
    @media (--mobile) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 70px;

    @media (--mobile) {
      row-gap: 50px;
    }
  }

  &__link {
    transition: color var(--transition300ms);
    outline: none;

    @media (--mobile) {
      column-gap: 12px;
      justify-content: unset;
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

      @media (--mobile) {
        display: block;
      }
    }
  }

  &__buttons {
    display: none;

    @media (--mobile) {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      align-items: flex-start;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;

    @media (--mobile) {
      display: inline-flex;
    }
  }
}
</style>
