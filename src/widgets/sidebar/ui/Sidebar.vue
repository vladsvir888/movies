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
            </template>
          </Dropdown>
        </template>
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
import { useFocusTrap } from "~/src/shared/lib/use";

const sidebar = ref(null);

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const authStore = useAuth();
const { activate, deactivate } = useFocusTrap(sidebar, {
  fallbackFocus: ".sidebar__overlay",
});

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
      value: t("Search"),
      icon: "search",
      handlers: {
        click: () => {
          isSearchDialogVisible.value = true;
          isMenuVisible.value = false;
          deactivate();
        },
      },
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
const dropdownSelectedItem = ref(null);

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
  }

  &__link {
    transition: color var(--transition300ms);
    outline: none;

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
  }
}
</style>
