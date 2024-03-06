<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <TheButton
        v-for="link in links"
        :key="link.value"
        :to="link.to"
        class="sidebar__link"
        :aria-label="$t(`sidebar_links.${link.value}`)"
        v-tooltip="{
          value: $t(`sidebar_links.${link.value}`),
        }"
      >
        <template #left-icon>
          <TheIcon :icon="link.icon" />
        </template>
      </TheButton>
    </nav>
  </aside>
</template>

<script setup>
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
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: var(--sidebar-width);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #000;

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 100px;
  }

  &__link {
    color: #fff;
    transition: color var(--transition300ms);

    @include hover {
      color: rgb(64 193 173);
    }

    svg {
      width: 25px;
      height: 25px;
      fill: currentColor;
      pointer-events: none;
    }

    &[aria-current="page"] {
      color: rgb(64 193 173);
    }
  }
}
</style>
