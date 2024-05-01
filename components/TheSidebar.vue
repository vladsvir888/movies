<template>
  <div
    v-trap="isMenuExpanded"
    class="sidebar"
    :class="{ expanded: isMenuExpanded }"
    @keydown.esc="closeMenu"
  >
    <MenuButton v-model:is-menu-expanded="isMenuExpanded" />
    <div class="sidebar__wrapper" @click="closeMenu">
      <aside id="sidebar" class="sidebar__aside" @click.stop>
        <nav class="sidebar__nav">
          <TheTooltip
            v-for="(link, index) in links"
            :key="link.value"
            :id="`sidebar-item-${index}`"
            :text="link.value"
          >
            <TheButton
              :to="link.to"
              class="sidebar__link"
              :aria-labelledby="`sidebar-item-${index}`"
              v-on="link.handlers ?? {}"
            >
              <TheIcon :icon="link.icon" />
            </TheButton>
          </TheTooltip>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();

const isSearchDialogShow = inject("isSearchDialogShow");
const isDiscoverDialogShow = inject("isDiscoverDialogShow");

const links = ref([
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
        isSearchDialogShow.value = true;
        isMenuExpanded.value = false;
      },
    },
  },
  {
    value: t("Discover"),
    icon: "filter",
    handlers: {
      click: () => {
        isDiscoverDialogShow.value = true;
        isMenuExpanded.value = false;
      },
    },
  },
]);
const isMenuExpanded = ref(false);

const closeMenu = () => {
  isMenuExpanded.value = false;
  document.body.classList.remove("no-scroll");
};

watch(() => route.path, closeMenu);
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.sidebar {
  $this: &;

  &.expanded {
    #{$this} {
      &__wrapper {
        visibility: visible;
        width: 100vw;
        background-color: rgb(var(--palette-black--rgb) / 50%);
      }

      &__aside {
        translate: 0 0;
      }
    }
  }

  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    min-height: 100vh;
    transition: background-color var(--transition300ms);

    @media (width <= 600px) {
      visibility: hidden;
    }
  }

  &__aside {
    min-height: inherit;
    width: var(--sidebar-width);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: var(--palette-black);
    transition: all var(--transition300ms);

    @media (width <= 600px) {
      translate: -100% 0;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 80px;
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

      + .tooltip__text {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
