<template>
  <div
    v-trap="isMenuExpanded"
    id="sidebar"
    class="sidebar-wrapper"
    :class="{ expanded: isMenuExpanded }"
    @click="closeMenu"
    @keydown.esc="closeMenu"
  >
    <aside class="sidebar" @click.stop>
      <nav class="sidebar__nav">
        <TheTooltip
          v-for="(link, index) in links"
          :key="link.value"
          :id="`sidebarItem${index}`"
          :text="$t(`sidebar_links.${link.value}`)"
        >
          <TheButton
            :to="link.to"
            class="sidebar__link"
            :aria-labelledby="`sidebarItem${index}`"
          >
            <TheIcon :icon="link.icon" />
          </TheButton>
        </TheTooltip>
      </nav>
    </aside>
  </div>
</template>

<script setup>
const route = useRoute();

const links = ref([
  {
    to: "/",
    value: "home",
    icon: "home",
  },
  {
    to: "/movie",
    value: "movie",
    icon: "movie",
  },
  {
    to: "/tv",
    value: "tv",
    icon: "tv",
  },
  {
    to: "/search",
    value: "search",
    icon: "search",
  },
]);

const isMenuExpanded = inject("isMenuExpanded");

const closeMenu = () => {
  isMenuExpanded.value = false;
};

watch(() => route.path, closeMenu);
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.sidebar {
  $this: &;

  min-height: inherit;
  width: var(--sidebar-width);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #000;
  transition: all var(--transition300ms);

  @media (width <= 600px) {
    translate: -100% 0;
    visibility: hidden;
  }

  @at-root {
    #{$this}-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      min-height: 100vh;
      transition: background-color var(--transition300ms);

      @media (width <= 600px) {
        width: 100vw;
      }

      &.expanded {
        background-color: rgb(0 0 0 / 50%);

        #{$this} {
          visibility: visible;
          translate: 0 0;
        }
      }
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 100px;
  }

  &__link {
    color: #fff;
    transition: color var(--transition300ms);

    @include hover {
      color: var(--primary-color);
    }

    svg {
      width: 25px;
      height: 25px;
      fill: currentColor;
      pointer-events: none;
    }

    &[aria-current="page"] {
      color: var(--primary-color);
    }

    &:focus-visible + .tooltip__text {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
