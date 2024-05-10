<template>
  <div
    v-trap="isMenuExpanded"
    class="sidebar"
    :class="{ expanded: isMenuExpanded }"
    @keydown.esc="closeMenu"
  >
    <MenuButton v-model:is-menu-expanded="isMenuExpanded" />
    <aside id="sidebar" class="sidebar__aside">
      <nav class="sidebar__nav">
        <template v-for="link in links" :key="link.value">
          <TheButton
            v-if="!link.dropdown"
            :to="link.to"
            :title="link.value"
            class="sidebar__link"
            v-on="link.handlers ?? {}"
          >
            <TheIcon :icon="link.icon" />
          </TheButton>

          <TheDropdown
            v-else
            :selected-item="dropdownSelectedItem"
            @update:selected-item="onUpdateSelectedItem"
            toggle-class="sidebar__link"
            :toggle-title-attr="link.value"
            :items="link.dropdown.items"
          >
            <template #toggle>
              <TheIcon :icon="link.icon" />
            </template>
          </TheDropdown>
        </template>
      </nav>
    </aside>
    <div class="sidebar__overlay" @click="closeMenu"></div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const isSearchDialogShow = inject("isSearchDialogShow");

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
          isSearchDialogShow.value = true;
          isMenuExpanded.value = false;
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
  ];
});
const isMenuExpanded = ref(false);
const dropdownSelectedItem = ref(null);

const closeMenu = () => {
  isMenuExpanded.value = false;
  document.body.classList.remove("no-scroll");
};

const onUpdateSelectedItem = async ($event) => {
  dropdownSelectedItem.value = $event;
  await navigateTo(localePath(`/discover/${$event}`));
};

watch(() => route.path, closeMenu);
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

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
    z-index: 2;
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
    z-index: 1;
    background-color: rgb(var(--palette-black--rgb) / 50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition300ms);
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
    }
  }
}
</style>
